// AdminDashboard.tsx
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Cropper from "react-easy-crop";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  ImagePlus,
  Trash2,
  Pencil,
  Plus,
  X,
  Check,
  UploadCloud,
  Lock,
  User,
  Sun,
  Moon,
  Palette,
  DollarSign,
} from "lucide-react";
import logo from "@/assets/logo.png";

/* =========================================================
   Full single-file Admin Dashboard (dark + glass accents)
   - Integrates: About Timeline, Hero Stats, Services, Testimonials
   - Image cropping + upload to Supabase storage
   - Login / Logout
   - No sidebar; top nav + grid layout cards
   ========================================================= */

/* -------------------------
   Types
   ------------------------- */
type Milestone = {
  id?: number;
  title: string;
  description: string;
  year: string;
  image_url?: string | null;
};

type HeroStat = {
  id?: number;
  value: string;
  label: string;
};

type Testimonial = {
  id?: string | null;
  business_name: string;
  client_name?: string | null;
  message?: string | null;      // older field name you used
  feedback?: string | null;     // newer field name used in admin/display
  bio?: string | null;
  website_url?: string | null;
  rating?: number | null;       // 1-5
  image_url?: string | null;
};


type PricingPackage = {
  id?: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
};

type TeamMember = {
  id?: number;
  name: string;
  designation: string;
  bio: string;
  image_url?: string | null;
  linkedin_url?: string;
  is_high_position?: boolean;
};

type Partnership = {
  id?: number;
  name: string;
  business_name?: string;
  partner_name?: string;
  bio?: string;
  logo_url?: string | null;
  website_url?: string;
  display_order: number;
};

/* -------------------------
   Helper: create cropped File from canvas
   ------------------------- */
const getCroppedImg = async (
  imageSrc: string,
  cropPixels: { x: number; y: number; width: number; height: number }
): Promise<File | null> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropPixels.width;
      canvas.height = cropPixels.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);

      ctx.drawImage(
        image,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        0,
        0,
        cropPixels.width,
        cropPixels.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(null);
          const file = new File([blob], `cropped-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          resolve(file);
        },
        "image/jpeg",
        0.92
      );
    };
    image.onerror = () => resolve(null);
  });
};

/* -------------------------
   Main Component
   ------------------------- */
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

  /* -------------------------
     Auth
     ------------------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------------------------
     Globals: file/crop states (shared)
     ------------------------- */
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null); // URL for preview (selected or cropped)
  const [imageToCrop, setImageToCrop] = useState<string | null>(null); // raw selected file url for cropping
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  /* -------------------------
     About Timeline
     ------------------------- */
  const [aboutCardOpen, setAboutCardOpen] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(
    null
  );

  /* -------------------------
     Hero Stats
     ------------------------- */
  const [heroStats, setHeroStats] = useState<HeroStat[]>([]);
  const [heroCardOpen, setHeroCardOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<HeroStat | null>(null);

  /* -------------------------
     Services Control (local storage)
     ------------------------- */
  const [servicesCardOpen, setServicesCardOpen] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<Record<string, boolean>>(
    () => {
      try {
        const val = localStorage.getItem("serviceStatus");
        return val ? JSON.parse(val) : {};
      } catch {
        return {};
      }
    }
  );

  const toggleServiceStatus = (service: string) => {
    const updated = { ...serviceStatus, [service]: !serviceStatus[service] };
    setServiceStatus(updated);
    localStorage.setItem("serviceStatus", JSON.stringify(updated));
    toast.success(`Updated "${service}" status`);
  };

  /* -------------------------
     Testimonials
     ------------------------- */
  const [testimonialsCardOpen, setTestimonialsCardOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  /* -------------------------
     Pricing Packages
     ------------------------- */
  const [pricingCardOpen, setPricingCardOpen] = useState(false);
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [editingPricingPackage, setEditingPricingPackage] =
    useState<PricingPackage | null>(null);

  /* -------------------------
     Team Members
     ------------------------- */
  const [teamCardOpen, setTeamCardOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(
    null
  );

  /* -------------------------
     Partnerships
     ------------------------- */
  const [partnershipsCardOpen, setPartnershipsCardOpen] = useState(false);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [editingPartnership, setEditingPartnership] =
    useState<Partnership | null>(null);

  /* -------------------------
     UI - Card Management
     ------------------------- */

  /* -------------------------
     UI - Theme + Dashboard Stats quick
     ------------------------- */
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [countsLoading, setCountsLoading] = useState(false);
  const [counts, setCounts] = useState({
    milestones: 0,
    stats: 0,
    testimonials: 0,
    pricing: 0,
    team: 0,
    partnerships: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    // Apply additional styles for light mode
    if (theme === "light") {
      root.style.setProperty("--bg-primary", "#ffffff");
      root.style.setProperty("--bg-secondary", "#f9f9f9");
      root.style.setProperty("--text-primary", "#000000");
      root.style.setProperty("--text-secondary", "#666666");
      root.style.setProperty("--border-color", "#e0e0e0");
      root.style.setProperty("--accent", "#ff6b35");
    } else {
      root.style.removeProperty("--bg-primary");
      root.style.removeProperty("--bg-secondary");
      root.style.removeProperty("--text-primary");
      root.style.removeProperty("--text-secondary");
      root.style.removeProperty("--border-color");
      root.style.removeProperty("--accent");
    }
  }, [theme]);

  // Display values for counts to ensure string type
  const displayMilestones = countsLoading ? "…" : String(counts.milestones);
  const displayStats = countsLoading ? "…" : String(counts.stats);
  const displayTestimonials = countsLoading ? "…" : String(counts.testimonials);
  const displayPricing = countsLoading ? "…" : String(counts.pricing);
  const displayTeam = countsLoading ? "…" : String(counts.team);
  const displayPartnerships = countsLoading ? "…" : String(counts.partnerships);

  /* -------------------------
     Fetch Helpers
     ------------------------- */
  const fetchMilestones = async () => {
    const { data, error } = await supabase
      .from("about_timeline")
      .select("*")
      .order("id", { ascending: true });
    if (error) toast.error("Failed to load milestones");
    else setMilestones(data || []);
  };

  const fetchHeroStats = async () => {
    const { data, error } = await supabase
      .from("hero_stats")
      .select("*")
      .order("id", { ascending: true });
    if (error) toast.error("Failed to load stats");
    else setHeroStats(data || []);
  };

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) toast.error("Failed to load testimonials");
    else {
      const mappedData =
        data?.map((client: any) => ({
          id: client.id,
          business_name: client.name,
          client_name: client.name,
          message: client.description || "",
          feedback: client.description || "",
          image_url: client.logo_url,
        })) || [];
      setTestimonials(mappedData);
    }
  };

  const fetchPricingPackages = async () => {
    const { data, error } = await supabase
      .from("pricing_packages")
      .select("*")
      .order("id", { ascending: true });
    if (error) toast.error("Failed to load pricing packages");
    else setPricingPackages(data || []);
  };

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) toast.error("Failed to load team members");
    else setTeamMembers(data || []);
  };

  const fetchPartnerships = async () => {
    const { data, error } = await supabase
      .from("partnerships")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) toast.error("Failed to load partnerships");
    else setPartnerships(data || []);
  };

  const fetchCounts = async () => {
    setCountsLoading(true);
    try {
      const [
        { data: a },
        { data: b },
        { data: c },
        { data: d },
        { data: e },
        { data: f },
      ] = await Promise.all([
        supabase.from("about_timeline").select("id", { count: "exact" }),
        supabase.from("hero_stats").select("id", { count: "exact" }),
        supabase.from("clients").select("id", { count: "exact" }),
        supabase.from("pricing_packages").select("id", { count: "exact" }),
        supabase.from("team_members").select("id", { count: "exact" }),
        supabase.from("partnerships").select("id", { count: "exact" }),
      ]);
      setCounts({
        milestones: a?.length ?? 0,
        stats: b?.length ?? 0,
        testimonials: c?.length ?? 0,
        pricing: d?.length ?? 0,
        team: e?.length ?? 0,
        partnerships: f?.length ?? 0,
      });
    } catch {
      // ignore
    } finally {
      setCountsLoading(false);
    }
  };

  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(logged);
    if (logged) {
      fetchMilestones();
      fetchHeroStats();
      fetchTestimonials();
      fetchPricingPackages();
      fetchTeamMembers();
      fetchCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------------------------
     Login / Logout
     ------------------------- */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_KEY) {
        localStorage.setItem("adminLoggedIn", "true");
        setIsLoggedIn(true);
        toast.success("Welcome Admin ✨");
        fetchMilestones();
        fetchHeroStats();
        fetchTestimonials();
        fetchPricingPackages();
        fetchCounts();
      } else {
        toast.error("Incorrect password");
      }
      setLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
    toast.info("Logged out");
    navigate("/");
  };

  /* -------------------------
     File upload to Supabase storage
     ------------------------- */
  const uploadFileToStorage = async (file: File) => {
    const fileName = `about-${Date.now()}-${file.name}`;
    setUploading(true);
    const { data, error } = await supabase.storage
      .from("about-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    setUploading(false);
    if (error) {
      toast.error("Upload failed");
      return null;
    }
    const { data: publicUrl } = supabase.storage
      .from("about-images")
      .getPublicUrl(data.path);
    return publicUrl.publicUrl;
  };

  /* -------------------------
     Crop handlers
     ------------------------- */
  const onCropComplete = useCallback((_: any, cropPixels: any) => {
    setCroppedAreaPixels(cropPixels);
  }, []);

  const handleChooseFileClick = () => fileInputRef.current?.click();

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    setImageToCrop(url);
    setCroppedFile(null);
  };

  const handleDoneCropping = async () => {
    if (!imageToCrop || !croppedAreaPixels) {
      toast.error("No crop area selected");
      return setImageToCrop(null);
    }
    const scaledCrop = {
      x: Math.round(croppedAreaPixels.x),
      y: Math.round(croppedAreaPixels.y),
      width: Math.round(croppedAreaPixels.width),
      height: Math.round(croppedAreaPixels.height),
    };
    const file = await getCroppedImg(imageToCrop, scaledCrop);
    if (!file) {
      toast.error("Failed to crop");
      return setImageToCrop(null);
    }
    const previewUrl = URL.createObjectURL(file);
    setCroppedFile(file);
    setFilePreview(previewUrl);
    setImageToCrop(null);
    setZoom(1);
    toast.success("✅ Image cropped successfully");
  };

  const handleCancelCropping = () => {
    setImageToCrop(null);
    setZoom(1);
  };

  /* -------------------------
     CRUD: About Timeline submit
     ------------------------- */
  const handleMilestoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as any;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const year = form.year.value.trim();

    if (!title || !description || !year) {
      toast.error("Please fill all fields");
      return;
    }

    let image_url = editingMilestone?.image_url ?? null;
    if (croppedFile) {
      const uploadedUrl = await uploadFileToStorage(croppedFile);
      if (!uploadedUrl) return;
      image_url = uploadedUrl;
    }

    if (editingMilestone?.id) {
      const { error } = await supabase
        .from("about_timeline")
        .update({ title, description, year, image_url })
        .eq("id", editingMilestone.id);
      if (error) return toast.error("Update failed");
      toast.success("Updated successfully");
    } else {
      const { error } = await supabase
        .from("about_timeline")
        .insert([{ title, description, year, image_url }]);
      if (error) return toast.error("Create failed");
      toast.success("Milestone created");
    }

    form.reset();
    setEditingMilestone(null);
    setFilePreview(null);
    setCroppedFile(null);
    fetchMilestones();
    fetchCounts();
    setAboutCardOpen(false);
  };

  const handleDeleteMilestone = async (id?: number) => {
    if (!id || !confirm("Delete this milestone?")) return;
    const { error } = await supabase
      .from("about_timeline")
      .delete()
      .eq("id", id);
    if (error) return toast.error("Delete failed");
    toast.success("Deleted");
    fetchMilestones();
    fetchCounts();
  };

  const handleEditMilestone = (m: Milestone) => {
    setEditingMilestone(m);
    setFilePreview(m.image_url ?? null);
    setAboutCardOpen(true);
    // Scroll to top of card or focus - optional
  };

  /* -------------------------
     CRUD: Hero Stats submit
     ------------------------- */
  const handleStatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as any;
    const value = form.value.value.trim();
    const label = form.label.value.trim();
    if (!value || !label) return toast.error("Fill all fields");

    if (editingStat?.id) {
      const { error } = await supabase
        .from("hero_stats")
        .update({ value, label })
        .eq("id", editingStat.id);
      if (error) return toast.error("Update failed");
      toast.success("Updated successfully");
    } else {
      const { error } = await supabase
        .from("hero_stats")
        .insert([{ value, label }]);
      if (error) return toast.error("Create failed");
      toast.success("Stat added");
    }
    form.reset();
    setEditingStat(null);
    fetchHeroStats();
    fetchCounts();
    setHeroCardOpen(false);
  };

  const handleDeleteStat = async (id?: number) => {
    if (!id || !confirm("Delete this stat?")) return;
    const { error } = await supabase.from("hero_stats").delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    toast.success("Deleted");
    fetchHeroStats();
    fetchCounts();
  };

  const handleEditStat = (s: HeroStat) => {
    setEditingStat(s);
    setHeroCardOpen(true);
  };

  /* -------------------------
     CRUD: Testimonials submit
     ------------------------- */
  const handleTestimonialSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget as any;
    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message) return toast.error("Please fill all fields");

    let logo_url = editingTestimonial?.image_url ?? null;
    if (croppedFile) {
      const uploadedUrl = await uploadFileToStorage(croppedFile);
      if (!uploadedUrl) return;
      logo_url = uploadedUrl;
    }

    if (editingTestimonial?.id) {
      const { error } = await supabase
        .from("clients")
        .update({ name, company_name: name, description: message, logo_url })
        .eq("id", editingTestimonial.id);
      if (error) return toast.error("Update failed");
      toast.success("Client updated");
    } else {
      const { error } = await supabase
        .from("clients")
        .insert([{ name, company_name: name, description: message, logo_url }]);
      if (error) return toast.error("Create failed");
      toast.success("Client created");
    }
    form.reset();
    setEditingTestimonial(null);
    setFilePreview(null);
    setCroppedFile(null);
    setRating(null);
    fetchTestimonials();
    fetchCounts();
    setTestimonialsCardOpen(false);
  };

  const handleEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setFilePreview(t.image_url ?? null);
    setRating(t.rating ?? null);
    setTestimonialsCardOpen(true);
  };

  const handleDeleteTestimonial = async (id?: string | number | null) => {
    if (!id || !confirm("Delete this testimonial?")) return;
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", String(id));
    if (error) return toast.error("Delete failed");
    toast.success("Deleted");
    fetchTestimonials();
    fetchCounts();
  };

  /* -------------------------
     CRUD: Pricing Packages submit
     ------------------------- */
  const handlePricingPackageSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget as any;
    const name = form.name.value.trim();
    const price = form.price.value.trim();
    const description = form.description.value.trim();
    const features = form.features.value
      .split("\n")
      .map((f: string) => f.trim())
      .filter(Boolean);
    const popular = form.popular.checked;

    if (!name || !price || !description) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingPricingPackage?.id) {
      const { error } = await supabase
        .from("pricing_packages")
        .update({ name, price, description, features, popular })
        .eq("id", editingPricingPackage.id);
      if (error) return toast.error("Update failed");
      toast.success("Updated successfully");
    } else {
      const { error } = await supabase
        .from("pricing_packages")
        .insert([{ name, price, description, features, popular }]);
      if (error) return toast.error("Create failed");
      toast.success("Package created");
    }

    form.reset();
    setEditingPricingPackage(null);
    fetchPricingPackages();
    fetchCounts();
    setPricingCardOpen(false);
  };

  const handleEditPricingPackage = (p: PricingPackage) => {
    setEditingPricingPackage(p);
    setPricingCardOpen(true);
  };

  const handleDeletePricingPackage = async (id?: number) => {
    if (!id || !confirm("Delete this package?")) return;
    const { error } = await supabase
      .from("pricing_packages")
      .delete()
      .eq("id", id);
    if (error) return toast.error("Delete failed");
    toast.success("Deleted");
    fetchPricingPackages();
    fetchCounts();
  };

  /* -------------------------
     CRUD: Team Members submit
     ------------------------- */
  const handleTeamMemberSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget as any;
    const name = form.name.value.trim();
    const role = form.role.value.trim();
    const bio = form.bio.value.trim();
    const linkedin_url = form.linkedin_url.value.trim();
    const github_url = form.github_url.value.trim();
    const display_order = parseInt(form.display_order.value) || 0;

    if (!name || !role || !bio) {
      toast.error("Please fill all fields");
      return;
    }

    let image_url = editingTeamMember?.image_url ?? null;
    if (croppedFile) {
      const uploadedUrl = await uploadFileToStorage(croppedFile);
      if (!uploadedUrl) return;
      image_url = uploadedUrl;
    }

    if (editingTeamMember?.id) {
      const { error } = await supabase
        .from("team_members")
        .update({
          name,
          role,
          bio,
          image_url,
          linkedin_url,
          github_url,
          display_order,
        })
        .eq("id", editingTeamMember.id);
      if (error) return toast.error("Update failed");
      toast.success("Updated successfully");
    } else {
      const { error } = await supabase.from("team_members").insert([
        {
          name,
          role,
          bio,
          image_url,
          linkedin_url,
          github_url,
          display_order,
        },
      ]);
      if (error) return toast.error("Create failed");
      toast.success("Team member created");
    }

    form.reset();
    setEditingTeamMember(null);
    setFilePreview(null);
    setCroppedFile(null);
    fetchTeamMembers();
    fetchCounts();
    setTeamCardOpen(false);
  };

  const handleEditTeamMember = (t: TeamMember) => {
    setEditingTeamMember(t);
    setFilePreview(t.image_url ?? null);
    setTeamCardOpen(true);
  };

  const handleDeleteTeamMember = async (id?: number) => {
    if (!id || !confirm("Delete this team member?")) return;
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    toast.success("Deleted");
    fetchTeamMembers();
    fetchCounts();
  };

  /* -------------------------
     CRUD: Partnerships submit
     ------------------------- */
  const handlePartnershipSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget as any;
    const name = form.name.value.trim();
    const website_url = form.website_url.value.trim();
    const display_order = parseInt(form.display_order.value) || 0;

    if (!name || !website_url) {
      toast.error("Please fill all fields");
      return;
    }

    let logo_url = editingPartnership?.logo_url ?? null;
    if (croppedFile) {
      const uploadedUrl = await uploadFileToStorage(croppedFile);
      if (!uploadedUrl) return;
      logo_url = uploadedUrl;
    }

    if (editingPartnership?.id) {
      const { error } = await supabase
        .from("partnerships")
        .update({ name, logo_url, website_url, display_order })
        .eq("id", editingPartnership.id);
      if (error) return toast.error("Update failed");
      toast.success("Updated successfully");
    } else {
      const { error } = await supabase
        .from("partnerships")
        .insert([{ name, logo_url, website_url, display_order }]);
      if (error) return toast.error("Create failed");
      toast.success("Partnership created");
    }

    form.reset();
    setEditingPartnership(null);
    setFilePreview(null);
    setCroppedFile(null);
    fetchPartnerships();
    fetchCounts();
    setPartnershipsCardOpen(false);
  };

  const handleEditPartnership = (p: Partnership) => {
    setEditingPartnership(p);
    setFilePreview(p.logo_url ?? null);
    setPartnershipsCardOpen(true);
  };

  const handleDeletePartnership = async (id?: number) => {
    if (!id || !confirm("Delete this partnership?")) return;
    const { error } = await supabase.from("partnerships").delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    toast.success("Deleted");
    fetchPartnerships();
    fetchCounts();
  };

  /* -------------------------
     Small helpers
     ------------------------- */
  const clearFileSelection = () => {
    setFilePreview(null);
    setCroppedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* -------------------------
     UI Layout
     ------------------------- */
  return (
    <div
      className={`min-h-screen font-sans ${
        theme === "dark"
          ? "bg-gradient-to-b from-black via-[#070606] to-[#030303] text-white"
          : "bg-gradient-to-b from-white via-gray-50 to-gray-100 text-black"
      }`}
    >
      {/* Topbar */}
      <header
        className={`sticky top-0 z-30 backdrop-blur-md ${
          theme === "dark"
            ? "bg-black/40 border-b border-white/5"
            : "bg-white/40 border-b border-gray-300"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="logo" className="h-11 w-11 rounded-lg" />
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
                Digital Ascent — Admin
              </h1>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Control Panel • {theme === "dark" ? "Dark" : "Light"} Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Lock
                  className={`h-4 w-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Admin Locked
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <div>Signed in as</div>
                  <div
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Administrator
                  </div>
                </div>
                <Button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`${
                    theme === "dark"
                      ? "bg-black/30 border border-white/6 text-gray-200"
                      : "bg-white/30 border border-gray-300 text-gray-700"
                  }`}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                <Input
                  type="text"
                  placeholder="Search dashboard..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-48 ${
                    theme === "dark"
                      ? "bg-black/30 border border-white/6 text-white placeholder-gray-400"
                      : "bg-white/30 border border-gray-300 text-black placeholder-gray-600"
                  }`}
                />
                <Button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* If not logged in -> show centered login box */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-md mx-auto ${
              theme === "dark"
                ? "bg-black/50 border border-white/6"
                : "bg-white/50 border border-gray-300"
            } rounded-2xl p-8 shadow-2xl`}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="logo" className="h-12 w-12 rounded-lg" />
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Admin Login
                </h2>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Restricted area — authorized only
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${
                  theme === "dark"
                    ? "bg-black/40 border border-white/6 text-white"
                    : "bg-white/40 border border-gray-300 text-black"
                }`}
              />
              <div className="flex items-center justify-between gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold flex-1"
                >
                  {loading ? "Checking..." : "Unlock Console"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Dashboard */}
        {isLoggedIn && (
          <>
            {/* Quick stats row */}
            <section className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
              <div className="rounded-2xl bg-black/40 border border-white/6 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-300">Milestones</p>
                    <div className="text-2xl font-bold text-orange-300">
                      {displayMilestones}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg">
                    <User className="h-6 w-6 text-gray-200" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Manage your about timeline entries
                </p>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/6 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-300">Hero Stats</p>
                    <div className="text-2xl font-bold text-orange-300">
                      {displayStats}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg">
                    <Check className="h-6 w-6 text-gray-200" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Numbers displayed on homepage hero
                </p>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/6 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-300">Testimonials</p>
                    <div className="text-2xl font-bold text-orange-300">
                      {displayTestimonials}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg">
                    <UploadCloud className="h-6 w-6 text-gray-200" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Client logos and messages
                </p>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/6 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-300">Pricing Packages</p>
                    <div className="text-2xl font-bold text-orange-300">
                      {displayPricing}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg">
                    <DollarSign className="h-6 w-6 text-gray-200" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Manage pricing plans
                </p>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/6 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-300">Team Members</p>
                    <div className="text-2xl font-bold text-orange-300">
                      {displayTeam}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg">
                    <User className="h-6 w-6 text-gray-200" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Manage team profiles
                </p>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/6 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-300">Partnerships</p>
                    <div className="text-2xl font-bold text-orange-300">
                      {displayPartnerships}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg">
                    <Palette className="h-6 w-6 text-gray-200" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Manage partnership logos
                </p>
              </div>
            </section>

            {/* Main grid of cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* About Timeline card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-black/45 border border-white/6 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-300">
                      Timeline
                    </h3>
                    <p className="text-xs text-gray-400">
                      Create and manage milestones
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setEditingMilestone(null);
                        clearFileSelection();
                        setAboutCardOpen((s) => !s);
                      }}
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                    >
                      <Plus className="" />
                    </Button>
                    <button
                      onClick={() => setAboutCardOpen((s) => !s)}
                      aria-label="Toggle"
                      className="p-2 rounded-md bg-black/30 border border-white/6"
                    >
                      {aboutCardOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {aboutCardOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-5"
                    >
                      <form
                        onSubmit={handleMilestoneSubmit}
                        className="grid md:grid-cols-3 gap-4"
                      >
                        <div className="md:col-span-2 space-y-3">
                          <Input
                            name="title"
                            placeholder="Title"
                            defaultValue={editingMilestone?.title ?? ""}
                            className="bg-black/30 border border-white/6 text-white"
                          />
                          <textarea
                            name="description"
                            placeholder="Description"
                            defaultValue={editingMilestone?.description ?? ""}
                            className="w-full rounded-md p-3 bg-black/30 border border-white/6 text-white min-h-[96px]"
                          />
                          <Input
                            name="year"
                            placeholder="Year"
                            defaultValue={editingMilestone?.year ?? ""}
                            className="bg-black/30 border border-white/6 text-white"
                          />
                        </div>

                        <div className="flex flex-col items-center gap-3">
                          <div className="w-40 h-40 rounded-xl overflow-hidden border border-white/6 bg-black/20 flex items-center justify-center">
                            {filePreview ? (
                              <img
                                src={filePreview}
                                alt="preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-400 flex flex-col items-center gap-2">
                                <ImagePlus />
                                <span className="text-xs">No image</span>
                              </div>
                            )}
                          </div>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelected}
                            className="hidden"
                          />

                          <div className="flex gap-2">
                            <Button
                              onClick={handleChooseFileClick}
                              type="button"
                              className="bg-black/30 border border-white/6 text-gray-200"
                            >
                              Choose
                            </Button>
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                              disabled={uploading}
                            >
                              {editingMilestone ? "Update" : "Create"}
                            </Button>
                          </div>

                          {filePreview && (
                            <div className="flex gap-2 mt-2">
                              <Button
                                onClick={() => {
                                  clearFileSelection();
                                }}
                                className="bg-gradient-to-r from-red-500 to-dark bg-red-700-400 border border-white/6 text-white font-semibold"
                              >
                                Remove
                              </Button>
                              <Button
                                onClick={() => {
                                  setImageToCrop(filePreview);
                                }}
                                className="bg-black/30 border border-white/6 text-white font-semibold"
                              >
                                Crop
                              </Button>
                            </div>
                          )}
                        </div>
                      </form>

                      {/* list */}
                      <div className="mt-6 grid md:grid-cols-2 gap-4">
                        {(() => {
                          const filteredMilestones = milestones.filter(
                            (m) =>
                              !searchQuery ||
                              m.title
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              m.description
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              m.year
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                          );
                          return filteredMilestones.length === 0 ? (
                            <div className="col-span-full text-center text-gray-400 italic py-8">
                              {milestones.length === 0
                                ? "No milestones yet"
                                : "No milestones match your search"}
                            </div>
                          ) : (
                            filteredMilestones.map((m) => (
                              <motion.article
                                key={m.id}
                                whileHover={{ translateY: -6 }}
                                transition={{ type: "spring", stiffness: 140 }}
                                className="rounded-xl bg-black/30 border border-white/6 p-4 flex items-center gap-4"
                              >
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/20 border border-white/6">
                                  {m.image_url ? (
                                    <img
                                      src={m.image_url}
                                      alt={m.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                      {m.year}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-orange-300">
                                    {m.title}
                                  </h3>
                                  <p className="text-sm text-gray-300">
                                    {m.description}
                                  </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <Button
                                    onClick={() => handleEditMilestone(m)}
                                    className="bg-black/30 border border-white/6 text-gray-200"
                                  >
                                    <Pencil />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteMilestone(m.id)}
                                    className="bg-red-600 text-white"
                                  >
                                    <Trash2 />
                                  </Button>
                                </div>
                              </motion.article>
                            ))
                          );
                        })()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Hero Stats card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-black/45 border border-white/6 p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-orange-300">
                      Hero Stats
                    </h4>
                    <p className="text-xs text-gray-400">
                      Numbers shown on homepage hero
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setEditingStat(null);
                        setHeroCardOpen((s) => !s);
                      }}
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                    >
                      <Plus />
                    </Button>
                    <button
                      onClick={() => setHeroCardOpen((s) => !s)}
                      className="p-2 rounded-md bg-black/30 border border-white/6"
                    >
                      {heroCardOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {heroCardOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4"
                    >
                      <form
                        onSubmit={handleStatSubmit}
                        className="flex flex-col gap-3 mb-4"
                      >
                        <div className="flex gap-2">
                          <Input
                            name="value"
                            placeholder="Value (e.g. 500+)"
                            defaultValue={editingStat?.value ?? ""}
                            className="bg-black/30 border border-white/6 text-white"
                          />
                          <Input
                            name="label"
                            placeholder="Label (e.g. Projects Delivered)"
                            defaultValue={editingStat?.label ?? ""}
                            className="bg-black/30 border border-white/6 text-white"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                          >
                            {editingStat ? "Update" : "Add"}
                          </Button>
                        </div>
                      </form>

                      <div className="grid gap-3">
                        {(() => {
                          const filteredStats = heroStats.filter(
                            (s) =>
                              !searchQuery ||
                              s.value
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              s.label
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                          );
                          return filteredStats.length === 0 ? (
                            <div className="text-center text-gray-400 italic py-4">
                              {heroStats.length === 0
                                ? "No stats added"
                                : "No stats match your search"}
                            </div>
                          ) : (
                            filteredStats.map((stat) => (
                              <div
                                key={stat.id}
                                className="flex items-center justify-between bg-black/30 p-3 rounded-lg border border-white/6"
                              >
                                <div>
                                  <div className="text-lg font-semibold text-orange-300">
                                    {stat.value}
                                  </div>
                                  <div className="text-sm text-gray-300">
                                    {stat.label}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEditStat(stat)}
                                    className="bg-black/30 border border-white/6 text-gray-200"
                                  >
                                    <Pencil />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteStat(stat.id)}
                                    className="bg-red-600 text-white"
                                  >
                                    <Trash2 />
                                  </Button>
                                </div>
                              </div>
                            ))
                          );
                        })()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Services Control */}
              <motion.div className="rounded-2xl bg-black/45 border border-white/6 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-orange-300">
                      Services Control
                    </h4>
                    <p className="text-xs text-gray-400">
                      Set "Coming Soon" for each service
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setServicesCardOpen((s) => !s)}
                      className="p-2 rounded-md bg-black/30 border border-white/6"
                    >
                      {servicesCardOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {servicesCardOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 grid gap-3"
                    >
                      {(() => {
                        const services = [
                          "Web Development",
                          "UI/UX Design",
                          "Digital Strategy",
                          "SEO & Marketing",
                          "Mobile Solutions",
                          "Cloud & DevOps",
                        ];
                        const filteredServices = services.filter(
                          (s) =>
                            !searchQuery ||
                            s.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        return filteredServices.length === 0 ? (
                          <div className="text-center text-gray-400 italic py-4">
                            No services match your search
                          </div>
                        ) : (
                          filteredServices.map((service) => {
                            const isComingSoon =
                              serviceStatus[service] || false;
                            return (
                              <div
                                key={service}
                                className="flex items-center justify-between bg-black/30 p-3 rounded-lg border border-white/6"
                              >
                                <div>
                                  <div className="font-semibold text-orange-300">
                                    {service}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {isComingSoon
                                      ? "Currently Coming Soon"
                                      : "Active"}
                                  </div>
                                </div>
                                <Button
                                  onClick={() => toggleServiceStatus(service)}
                                  className={`${
                                    isComingSoon
                                      ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                                      : "bg-gradient-to-r from-orange-500 to-yellow-400 text-black"
                                  } font-semibold`}
                                >
                                  {isComingSoon
                                    ? "Deactivate"
                                    : "Set Coming Soon"}
                                </Button>
                              </div>
                            );
                          })
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ========================= TESTIMONIALS CARD (UPDATED) ========================= */}
              <motion.div className="rounded-2xl bg-black/45 border border-white/6 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-orange-300">
                      Testimonials
                    </h4>
                    <p className="text-xs text-gray-400">
                      Client feedback & ratings
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setEditingTestimonial(null);
                        clearFileSelection();
                        setTestimonialsCardOpen((s) => !s);
                      }}
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                    >
                      <Plus />
                    </Button>

                    <button
                      onClick={() => setTestimonialsCardOpen((s) => !s)}
                      className="p-2 rounded-md bg-black/30 border border-white/6"
                    >
                      {testimonialsCardOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {testimonialsCardOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-5"
                    >
                      {/* FORM */}
                      <form
                        onSubmit={handleTestimonialSubmit}
                        className="grid md:grid-cols-3 gap-4"
                      >
                        {/* LEFT */}
                        <div className="md:col-span-2 space-y-3">
                          {/* Business Name */}
                          <Input
                            name="business_name"
                            placeholder="Business Name"
                            defaultValue={
                              editingTestimonial?.business_name ?? ""
                            }
                            className="bg-black/30 border border-white/6 text-white"
                          />

                          {/* Client Name */}
                          <Input
                            name="client_name"
                            placeholder="Client Name"
                            defaultValue={editingTestimonial?.client_name ?? ""}
                            className="bg-black/30 border border-white/6 text-white"
                          />

                          {/* Bio */}
                          <textarea
                            name="bio"
                            placeholder="Bio (optional)"
                            defaultValue={editingTestimonial?.bio ?? ""}
                            className="w-full rounded-md p-3 bg-black/30 border border-white/6 text-white min-h-[80px]"
                          />

                          {/* Website / Social Link */}
                          <Input
                            name="website_url"
                            placeholder="Website or Social Media Link (optional)"
                            defaultValue={editingTestimonial?.website_url ?? ""}
                            className="bg-black/30 border border-white/6 text-white"
                          />

                          {/* RATING - CLICKABLE STARS */}
                          <div className="mt-2">
                            <label className="text-gray-300 text-sm mb-1 block">
                              Rating (optional)
                            </label>

                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  onClick={() => setRating(star)}
                                  className={`cursor-pointer text-2xl ${
                                    (rating ||
                                      editingTestimonial?.rating ||
                                      0) >= star
                                      ? "text-yellow-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>

                            {/* Hidden input to store numeric value */}
                            <input
                              type="hidden"
                              name="rating"
                              value={rating || editingTestimonial?.rating || 0}
                            />
                          </div>

                          {/* FEEDBACK */}
                          <textarea
                            name="feedback"
                            placeholder="Feedback (optional)"
                            defaultValue={editingTestimonial?.feedback ?? ""}
                            className="w-full rounded-md p-3 bg-black/30 border border-white/6 text-white min-h-[100px]"
                          />
                        </div>

                        {/* RIGHT SIDE: IMAGE + BUTTONS */}
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-40 h-40 rounded-xl overflow-hidden border border-white/6 bg-black/20 flex items-center justify-center">
                            {filePreview ? (
                              <img
                                src={filePreview}
                                alt="preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-400 flex flex-col items-center gap-2">
                                <ImagePlus />
                                <span className="text-xs">No image</span>
                              </div>
                            )}
                          </div>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelected}
                            className="hidden"
                          />

                          <div className="flex gap-2">
                            <Button
                              onClick={handleChooseFileClick}
                              type="button"
                              className="bg-black/30 border border-white/6 text-gray-200"
                            >
                              Choose
                            </Button>
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                              disabled={uploading}
                            >
                              {editingTestimonial ? "Update" : "Create"}
                            </Button>
                          </div>

                          {filePreview && (
                            <div className="flex gap-2 mt-2">
                              <Button
                                onClick={clearFileSelection}
                                className="bg-gradient-to-r from-red-500 to-red-700 border border-white/6 text-white"
                              >
                                Remove
                              </Button>
                              <Button
                                onClick={() => setImageToCrop(filePreview)}
                                className="bg-black/30 border border-white/6 text-white"
                              >
                                Crop
                              </Button>
                            </div>
                          )}
                        </div>
                      </form>

                      {/* LIST */}
                      <div className="mt-6 grid md:grid-cols-2 gap-4">
                        {testimonials.length === 0 ? (
                          <div className="col-span-full text-center text-gray-400 italic py-8">
                            No testimonials yet
                          </div>
                        ) : (
                          testimonials.map((t) => (
                            <motion.article
                              key={t.id}
                              whileHover={{ translateY: -6 }}
                              transition={{ type: "spring", stiffness: 140 }}
                              className="rounded-xl bg-black/30 border border-white/6 p-4 flex items-center gap-4"
                            >
                              <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/20 border border-white/6">
                                {t.image_url ? (
                                  <img
                                    src={t.image_url}
                                    alt={t.client_name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full text-gray-400">
                                    {t.client_name?.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>

                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-orange-300">
                                  {t.client_name}
                                </h3>

                                <p className="text-sm text-gray-300">
                                  {t.business_name}
                                </p>

                                {t.rating > 0 && (
                                  <p className="text-yellow-400 mt-1">
                                    {"★".repeat(t.rating)}{" "}
                                    <span className="text-gray-500">
                                      {"☆".repeat(5 - t.rating)}
                                    </span>
                                  </p>
                                )}

                                {t.feedback && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {t.feedback}
                                  </p>
                                )}
                              </div>

                              <div className="flex flex-col gap-2">
                                <Button
                                  onClick={() => handleEditTestimonial(t)}
                                  className="bg-black/30 border border-white/6 text-gray-200"
                                >
                                  <Pencil />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteTestimonial(t.id)}
                                  className="bg-red-600 text-white"
                                >
                                  <Trash2 />
                                </Button>
                              </div>
                            </motion.article>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Pricing Packages card */}
              <motion.div className="rounded-2xl bg-black/45 border border-white/6 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-orange-300">
                      Pricing Packages
                    </h4>
                    <p className="text-xs text-gray-400">
                      Manage pricing plans
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setEditingPricingPackage(null);
                        setPricingCardOpen((s) => !s);
                      }}
                      className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                    >
                      <Plus />
                    </Button>
                    <button
                      onClick={() => setPricingCardOpen((s) => !s)}
                      className="p-2 rounded-md bg-black/30 border border-white/6"
                    >
                      {pricingCardOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {pricingCardOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4"
                    >
                      <form
                        onSubmit={handlePricingPackageSubmit}
                        className="flex flex-col gap-3 mb-4"
                      >
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            name="name"
                            placeholder="Package Name"
                            defaultValue={editingPricingPackage?.name ?? ""}
                            className="bg-black/30 border border-white/6 text-white"
                          />
                          <Input
                            name="price"
                            placeholder="Price (e.g. $99/month)"
                            defaultValue={editingPricingPackage?.price ?? ""}
                            className="bg-black/30 border border-white/6 text-white"
                          />
                        </div>
                        <textarea
                          name="description"
                          placeholder="Description"
                          defaultValue={
                            editingPricingPackage?.description ?? ""
                          }
                          className="w-full rounded-md p-3 bg-black/30 border border-white/6 text-white min-h-[80px]"
                        />
                        <textarea
                          name="features"
                          placeholder="Features (one per line)"
                          defaultValue={
                            editingPricingPackage?.features?.join("\n") ?? ""
                          }
                          className="w-full rounded-md p-3 bg-black/30 border border-white/6 text-white min-h-[80px]"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="popular"
                            defaultChecked={
                              editingPricingPackage?.popular ?? false
                            }
                            className="accent-orange-400"
                          />
                          <label className="text-sm text-gray-300">
                            Mark as Popular
                          </label>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                          >
                            {editingPricingPackage ? "Update" : "Create"}
                          </Button>
                        </div>
                      </form>

                      <div className="grid gap-3">
                        {(() => {
                          const filteredPackages = pricingPackages.filter(
                            (p) =>
                              !searchQuery ||
                              p.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              p.description
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              p.price
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                          );
                          return filteredPackages.length === 0 ? (
                            <div className="text-center text-gray-400 italic py-4">
                              {pricingPackages.length === 0
                                ? "No packages added"
                                : "No packages match your search"}
                            </div>
                          ) : (
                            <>
                              {filteredPackages.map((pkg) => (
                                <div
                                  key={pkg.id}
                                  className="flex items-center justify-between bg-black/30 p-3 rounded-lg border border-white/6"
                                >
                                  <div>
                                    <div className="text-lg font-semibold text-orange-300">
                                      {pkg.name} - {pkg.price}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                      {pkg.description}
                                    </div>
                                    {pkg.popular && (
                                      <div className="text-xs text-yellow-400 font-semibold">
                                        Popular
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={() =>
                                        handleEditPricingPackage(pkg)
                                      }
                                      className="bg-black/30 border border-white/6 text-gray-200"
                                    >
                                      <Pencil />
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleDeletePricingPackage(pkg.id)
                                      }
                                      className="bg-red-600 text-white"
                                    >
                                      <Trash2 />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </>
                          );
                        })()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </section>

            {/* Team Management Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-orange-300 mb-6">
                Team Management
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ========================= TEAM CARD ========================= */}
                <motion.div className="rounded-2xl bg-black/45 border border-white/6 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-orange-300">
                        Team Members
                      </h4>
                      <p className="text-xs text-gray-400">
                        Manage team profiles
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          setEditingTeamMember(null);
                          clearFileSelection();
                          setTeamCardOpen((s) => !s);
                        }}
                        className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                      >
                        <Plus />
                      </Button>

                      <button
                        onClick={() => setTeamCardOpen((s) => !s)}
                        className="p-2 rounded-md bg-black/30 border border-white/6"
                      >
                        {teamCardOpen ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {teamCardOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-5"
                      >
                        {/* FORM */}
                        <form
                          onSubmit={handleTeamMemberSubmit}
                          className="grid md:grid-cols-3 gap-4"
                        >
                          <div className="md:col-span-2 space-y-3">
                            <Input
                              name="name"
                              placeholder="Name"
                              defaultValue={editingTeamMember?.name ?? ""}
                              className="bg-black/30 border border-white/6 text-white"
                            />

                            <Input
                              name="designation"
                              placeholder="Designation"
                              defaultValue={
                                editingTeamMember?.designation ?? ""
                              }
                              className="bg-black/30 border border-white/6 text-white"
                            />

                            <textarea
                              name="bio"
                              placeholder="Bio"
                              defaultValue={editingTeamMember?.bio ?? ""}
                              className="w-full rounded-md p-3 bg-black/30 border border-white/6 text-white min-h-[96px]"
                            />

                            <Input
                              name="linkedin_url"
                              placeholder="LinkedIn URL (optional)"
                              defaultValue={
                                editingTeamMember?.linkedin_url ?? ""
                              }
                              className="bg-black/30 border border-white/6 text-white"
                            />

                            {/* Leadership Role */}
                            <label className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                              <input
                                type="checkbox"
                                name="is_high_position"
                                defaultChecked={
                                  editingTeamMember?.is_high_position || false
                                }
                              />
                              Mark as Leadership Role
                            </label>
                          </div>

                          {/* IMAGE + ACTIONS */}
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-40 h-40 rounded-xl overflow-hidden border border-white/6 bg-black/20 flex items-center justify-center">
                              {filePreview ? (
                                <img
                                  src={filePreview}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-gray-400 flex flex-col items-center gap-2">
                                  <ImagePlus />
                                  <span className="text-xs">No image</span>
                                </div>
                              )}
                            </div>

                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileSelected}
                              className="hidden"
                            />

                            <div className="flex gap-2">
                              <Button
                                onClick={handleChooseFileClick}
                                type="button"
                                className="bg-black/30 border border-white/6 text-gray-200"
                              >
                                Choose
                              </Button>

                              <Button
                                type="submit"
                                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                                disabled={uploading}
                              >
                                {editingTeamMember ? "Update" : "Create"}
                              </Button>
                            </div>

                            {filePreview && (
                              <div className="flex gap-2 mt-2">
                                <Button
                                  onClick={clearFileSelection}
                                  className="bg-gradient-to-r from-red-500 to-red-700 border border-white/6 text-white"
                                >
                                  Remove
                                </Button>

                                <Button
                                  onClick={() => setImageToCrop(filePreview)}
                                  className="bg-black/30 border border-white/6 text-white"
                                >
                                  Crop
                                </Button>
                              </div>
                            )}
                          </div>
                        </form>

                        {/* LIST */}
                        <div className="mt-6 grid md:grid-cols-2 gap-4">
                          {teamMembers.length === 0 ? (
                            <div className="col-span-full text-center text-gray-400 italic py-8">
                              No team members yet
                            </div>
                          ) : (
                            teamMembers.map((t) => (
                              <motion.article
                                key={t.id}
                                whileHover={{ translateY: -6 }}
                                transition={{ type: "spring", stiffness: 140 }}
                                className="rounded-xl bg-black/30 border border-white/6 p-4 flex items-center gap-4"
                              >
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/20 border border-white/6">
                                  {t.image_url ? (
                                    <img
                                      src={t.image_url}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                      {t.name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-orange-300">
                                    {t.name}
                                  </h3>
                                  <p className="text-sm text-gray-300">
                                    {t.designation}
                                  </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <Button
                                    onClick={() => handleEditTeamMember(t)}
                                    className="bg-black/30 border border-white/6 text-gray-200"
                                  >
                                    <Pencil />
                                  </Button>

                                  <Button
                                    onClick={() => handleDeleteTeamMember(t.id)}
                                    className="bg-red-600 text-white"
                                  >
                                    <Trash2 />
                                  </Button>
                                </div>
                              </motion.article>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* ========================= PARTNERSHIPS CARD (UPDATED FIELDS) ========================= */}
                <motion.div className="rounded-2xl bg-black/45 border border-white/6 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-orange-300">
                        Partnerships
                      </h4>
                      <p className="text-xs text-gray-400">
                        Manage partnership profiles
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          setEditingPartnership(null);
                          clearFileSelection();
                          setPartnershipsCardOpen((s) => !s);
                        }}
                        className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                      >
                        <Plus />
                      </Button>

                      <button
                        onClick={() => setPartnershipsCardOpen((s) => !s)}
                        className="p-2 rounded-md bg-black/30 border border-white/6"
                      >
                        {partnershipsCardOpen ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {partnershipsCardOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-5"
                      >
                        {/* FORM */}
                        <form
                          onSubmit={handlePartnershipSubmit}
                          className="grid md:grid-cols-3 gap-4"
                        >
                          <div className="md:col-span-2 space-y-3">
                            {/* BUSINESS NAME */}
                            <Input
                              name="business_name"
                              placeholder="Business Name"
                              defaultValue={
                                editingPartnership?.business_name ?? ""
                              }
                              className="bg-black/30 border border-white/6 text-white"
                            />

                            {/* PARTNER NAME */}
                            <Input
                              name="partner_name"
                              placeholder="Partner Name"
                              defaultValue={
                                editingPartnership?.partner_name ?? ""
                              }
                              className="bg-black/30 border border-white/6 text-white"
                            />

                            {/* BIO (OPTIONAL) */}
                            <textarea
                              name="bio"
                              placeholder="Bio (optional)"
                              defaultValue={editingPartnership?.bio ?? ""}
                              className="w-full rounded-md p-3 bg-black/30 border border-white/6 text-white min-h-[96px]"
                            />

                            {/* WEBSITE / SOCIAL LINK */}
                            <Input
                              name="website_url"
                              placeholder="Website or Social Media Link (optional)"
                              defaultValue={
                                editingPartnership?.website_url ?? ""
                              }
                              className="bg-black/30 border border-white/6 text-white"
                            />
                          </div>

                          {/* IMAGE + ACTIONS */}
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-40 h-40 rounded-xl overflow-hidden border border-white/6 bg-black/20 flex items-center justify-center">
                              {filePreview ? (
                                <img
                                  src={filePreview}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-gray-400 flex flex-col items-center gap-2">
                                  <ImagePlus />
                                  <span className="text-xs">No image</span>
                                </div>
                              )}
                            </div>

                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileSelected}
                              className="hidden"
                            />

                            <div className="flex gap-2">
                              <Button
                                onClick={handleChooseFileClick}
                                type="button"
                                className="bg-black/30 border border-white/6 text-gray-200"
                              >
                                Choose
                              </Button>

                              <Button
                                type="submit"
                                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                                disabled={uploading}
                              >
                                {editingPartnership ? "Update" : "Create"}
                              </Button>
                            </div>

                            {filePreview && (
                              <div className="flex gap-2 mt-2">
                                <Button
                                  onClick={clearFileSelection}
                                  className="bg-gradient-to-r from-red-500 to-red-700 border border-white/6 text-white"
                                >
                                  Remove
                                </Button>

                                <Button
                                  onClick={() => setImageToCrop(filePreview)}
                                  className="bg-black/30 border border-white/6 text-white"
                                >
                                  Crop
                                </Button>
                              </div>
                            )}
                          </div>
                        </form>

                        {/* LIST */}
                        <div className="mt-6 grid md:grid-cols-2 gap-4">
                          {partnerships.length === 0 ? (
                            <div className="col-span-full text-center text-gray-400 italic py-8">
                              No partnerships yet
                            </div>
                          ) : (
                            partnerships.map((p) => (
                              <motion.article
                                key={p.id}
                                whileHover={{ translateY: -6 }}
                                transition={{ type: "spring", stiffness: 140 }}
                                className="rounded-xl bg-black/30 border border-white/6 p-4 flex items-center gap-4"
                              >
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/20 border border-white/6">
                                  {p.logo_url ? (
                                    <img
                                      src={p.logo_url}
                                      alt={p.business_name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                      {p.business_name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-orange-300">
                                    {p.business_name}
                                  </h3>

                                  <p className="text-sm text-gray-300">
                                    {p.partner_name}
                                  </p>

                                  {p.website_url && (
                                    <p className="text-xs text-gray-400 mt-1">
                                      {p.website_url}
                                    </p>
                                  )}
                                </div>

                                <div className="flex flex-col gap-2">
                                  <Button
                                    onClick={() => handleEditPartnership(p)}
                                    className="bg-black/30 border border-white/6 text-gray-200"
                                  >
                                    <Pencil />
                                  </Button>

                                  <Button
                                    onClick={() =>
                                      handleDeletePartnership(p.id)
                                    }
                                    className="bg-red-600 text-white"
                                  >
                                    <Trash2 />
                                  </Button>
                                </div>
                              </motion.article>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Crop Modal */}
      <AnimatePresence>
        {imageToCrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          >
            <div className="relative w-full max-w-3xl h-[78vh] bg-black/70 rounded-2xl p-4 border border-white/6">
              <div className="relative w-full h-[84%] bg-black">
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={String(zoom)}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-44 accent-orange-400"
                  />
                  <span className="text-sm text-gray-300">
                    Zoom: {zoom.toFixed(1)}x
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleCancelCropping}
                    className="bg-black/30 border border-white/6 text-gray-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDoneCropping}
                    className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
                  >
                    Done
                  </Button>
                </div>
              </div>

              <button
                onClick={() => setImageToCrop(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/30 border border-white/6"
              >
                <X />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

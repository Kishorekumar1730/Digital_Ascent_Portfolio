// SectionWith3D.tsx
import { motion, HTMLMotionProps } from "framer-motion";

interface SectionWith3DProps extends Omit<HTMLMotionProps<"section">, "ref"> {
  children?: React.ReactNode;
}

const SectionWith3D: React.FC<SectionWith3DProps> = ({ children, ...props }) => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 40 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="relative"
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default SectionWith3D;

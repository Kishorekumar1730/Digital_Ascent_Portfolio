import { Code2, Palette, Rocket, BarChart3, Smartphone, Cloud } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies for optimal performance and scalability.',
      features: ['React & Next.js', 'Full-stack Solutions', 'API Integration', 'Progressive Web Apps'],
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Stunning, user-centric designs that captivate audiences and deliver exceptional user experiences.',
      features: ['User Research', 'Wireframing', 'Visual Design', 'Prototyping'],
    },
    {
      icon: Rocket,
      title: 'Digital Strategy',
      description: 'Comprehensive digital strategies that align with your business goals and drive measurable results.',
      features: ['Market Analysis', 'Brand Positioning', 'Growth Planning', 'KPI Tracking'],
    },
    {
      icon: BarChart3,
      title: 'SEO & Marketing',
      description: 'Data-driven marketing campaigns that boost visibility, engagement, and conversions.',
      features: ['SEO Optimization', 'Content Marketing', 'Social Media', 'Analytics'],
    },
    {
      icon: Smartphone,
      title: 'Mobile Solutions',
      description: 'Native and cross-platform mobile applications that deliver seamless experiences on any device.',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Robust cloud infrastructure and DevOps practices for reliable, scalable, and secure applications.',
      features: ['AWS & Azure', 'CI/CD Pipelines', 'Container Orchestration', 'Monitoring'],
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to elevate your business and 
            create lasting impact in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-hover rounded-xl p-8 group transition-all duration-300 hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-gradient transition-all">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
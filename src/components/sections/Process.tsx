import { Lightbulb, FileSearch, Palette, Code, TestTube, Rocket } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: 'Discovery & Strategy',
      description: 'We start by understanding your business goals, target audience, and project requirements through in-depth consultation.',
      duration: '1-2 weeks',
    },
    {
      icon: FileSearch,
      title: 'Research & Planning',
      description: 'Comprehensive market research and competitive analysis to inform our strategic approach and project roadmap.',
      duration: '1 week',
    },
    {
      icon: Palette,
      title: 'Design & Prototyping',
      description: 'Creating wireframes, mockups, and interactive prototypes that bring your vision to life with stunning visuals.',
      duration: '2-3 weeks',
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Building your solution with clean, scalable code and cutting-edge technologies for optimal performance.',
      duration: '4-8 weeks',
    },
    {
      icon: TestTube,
      title: 'Testing & QA',
      description: 'Rigorous testing across devices and browsers to ensure flawless functionality and user experience.',
      duration: '1-2 weeks',
    },
    {
      icon: Rocket,
      title: 'Launch & Support',
      description: 'Smooth deployment and ongoing support to ensure your digital solution continues to excel and evolve.',
      duration: 'Ongoing',
    },
  ];

  return (
    <section id="process" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results every time
          </p>
        </div>

        <div className="relative">
          {/* Process Flow Line - Desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="glass-hover rounded-xl p-6 h-full group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground glow-border z-10">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-gradient transition-all">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>

                  {/* Duration Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-8 md:p-12 mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Let's discuss how our proven process can bring your vision to life
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass-hover px-8 py-3 rounded-lg font-heading font-bold text-primary border border-primary/50 hover:bg-primary/10 transition-all"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;
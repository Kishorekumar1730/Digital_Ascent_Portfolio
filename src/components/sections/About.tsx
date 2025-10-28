import { Rocket, Target, Users, Award } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with a vision to revolutionize digital experiences' },
    { year: '2019', title: 'First Major Client', description: 'Landed enterprise partnership with Fortune 500 company' },
    { year: '2021', title: 'Team Expansion', description: 'Grew to 50+ talented professionals across the globe' },
    { year: '2023', title: 'Industry Recognition', description: 'Won Best Digital Agency award at Tech Summit' },
    { year: '2024', title: 'Innovation Lab', description: 'Launched R&D division for emerging technologies' },
  ];

  const values = [
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'We push boundaries and embrace cutting-edge technologies',
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'Every project is measured by tangible business impact',
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'We work alongside you as an extension of your team',
    },
    {
      icon: Award,
      title: 'Excellence Always',
      description: 'Quality and attention to detail in everything we deliver',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            About <span className="text-gradient">Digital Ascent</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just another agency. We're your strategic partner in digital transformation,
            committed to elevating your brand to unprecedented heights.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="glass rounded-2xl p-8 md:p-12 mb-16 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-gradient">Our Mission</h3>
          <p className="text-lg leading-relaxed">
            To empower businesses with innovative digital solutions that drive growth, 
            enhance user experiences, and create lasting impact in the digital landscape. 
            We believe in the power of technology to transform ideas into extraordinary realities.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-12 text-center">Our Journey</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            
            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-4 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass rounded-xl p-6 inline-block hover:scale-105 transition-transform">
                      <h4 className="text-xl font-heading font-bold text-primary mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Year Badge */}
                  <div className="glass rounded-full w-20 h-20 flex items-center justify-center font-heading font-bold text-primary glow-border z-10">
                    {milestone.year}
                  </div>
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-12 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-hover rounded-xl p-6 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-heading font-bold mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
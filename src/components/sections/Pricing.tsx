import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const packages = [
    {
      name: 'Starter',
      price: '$2,999',
      description: 'Perfect for small businesses and startups',
      features: ['5-Page Website', 'Responsive Design', 'Basic SEO', '1 Month Support', 'Contact Form'],
    },
    {
      name: 'Professional',
      price: '$7,999',
      description: 'Ideal for growing businesses',
      features: ['10-Page Website', 'Custom Design', 'Advanced SEO', 'CMS Integration', '3 Months Support', 'E-commerce Ready'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale digital solutions',
      features: ['Unlimited Pages', 'Full Custom Development', 'Enterprise SEO', 'Dedicated Team', '12 Months Support', 'Priority Service'],
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Pricing <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with no hidden fees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`glass-hover rounded-xl p-8 relative ${pkg.popular ? 'border-2 border-primary' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h3>
              <div className="text-4xl font-heading font-bold text-gradient mb-2">{pkg.price}</div>
              <p className="text-muted-foreground mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={pkg.popular ? 'w-full bg-primary hover:bg-primary/90' : 'w-full glass-hover border-primary/50'}
                variant={pkg.popular ? 'default' : 'outline'}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
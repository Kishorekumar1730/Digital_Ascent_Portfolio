import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechVision Inc.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'Digital Ascent transformed our online presence completely. Their team\'s expertise and dedication resulted in a 300% increase in conversions.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Founder, StartupHub',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'Working with Digital Ascent was a game-changer. They understood our vision and delivered beyond expectations with incredible attention to detail.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, Global Brands',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'The level of professionalism and creativity is unmatched. Our new website has received countless compliments from clients and partners.',
      rating: 5,
    },
    {
      name: 'David Park',
      role: 'CTO, FinanceFlow',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      content: 'Digital Ascent\'s technical expertise and strategic approach helped us scale our platform seamlessly. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Lisa Thompson',
      role: 'Owner, Boutique Retail',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
      content: 'From concept to launch, every step was smooth and professional. Our e-commerce site is now our biggest revenue driver.',
      rating: 5,
    },
    {
      name: 'James Wilson',
      role: 'VP Product, InnovateCorp',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      content: 'The team at Digital Ascent doesn\'t just build websites, they build experiences. Our user engagement has skyrocketed.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear what our clients have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-hover rounded-xl p-6 relative group hover:-translate-y-2 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/50"
                />
                <div className="ml-4">
                  <h4 className="font-heading font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>

              <p className="text-muted-foreground relative z-10">
                "{testimonial.content}"
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
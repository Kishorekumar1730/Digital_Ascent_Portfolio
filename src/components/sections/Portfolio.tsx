import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Portfolio = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="portfolio" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Client <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the exceptional digital solutions we've delivered for our valued clients
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass rounded-xl p-6 h-64 animate-pulse" />
            ))}
          </div>
        ) : clients && clients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client) => (
              <Card
                key={client.id}
                className="glass-hover rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="p-6">
                  {/* Logo */}
                  {client.logo_url ? (
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
                      <img
                        src={client.logo_url}
                        alt={`${client.name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-32 mb-4 rounded-lg bg-muted/20 flex items-center justify-center">
                      <Building2 className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                  )}

                  {/* Client Info */}
                  <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-gradient transition-all">
                    {client.name}
                  </h3>
                  
                  <p className="text-sm text-primary/80 mb-3 font-medium">
                    {client.company_name}
                  </p>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {client.description}
                  </p>

                  {/* Website Link */}
                  {client.website_url && (
                    <a
                      href={client.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center glass rounded-xl p-12 max-w-md mx-auto">
            <Building2 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              No clients to display yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
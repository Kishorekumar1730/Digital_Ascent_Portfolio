import { Play } from 'lucide-react';
import { useState } from 'react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            See Us <span className="text-gradient">In Action</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how we transform ideas into extraordinary digital experiences
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative glass rounded-2xl overflow-hidden group">
            {/* Video Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-background via-muted to-background relative">
              {!isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center group-hover:scale-110 transition-all duration-300 glow-border"
                  >
                    <Play className="h-10 w-10 text-primary-foreground ml-1" fill="currentColor" />
                  </button>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Digital Ascent Showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse delay-150" />
              <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-primary animate-pulse delay-300" />
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse delay-500" />
            </div>
          </div>

          {/* Video Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { value: '2M+', label: 'Views Worldwide' },
              { value: '4.9/5', label: 'Client Rating' },
              { value: '100%', label: 'Project Success' },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-lg p-6 text-center">
                <div className="text-3xl font-heading font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
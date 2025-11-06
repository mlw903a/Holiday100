import { useState, useEffect } from "react";
import { Gift, Sparkles, Heart, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: number;
  type: "holiday" | "charity";
  content: React.ReactElement;
}

export default function RotatingBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const banners: Banner[] = [
    {
      id: 1,
      type: "holiday",
      content: (
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border/50">
          <div className="container py-12 md:py-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-10 h-10 text-primary" />
              <Sparkles className="w-8 h-8 text-accent animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Google Holiday 100
            </h1>
            <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl mx-auto">
              Discover 2025's most searched holiday gifts with real-time trend indicators
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      type: "charity",
      content: (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-blue-950/20 border-b border-border/50">
          <div className="container py-12 md:py-16">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Section - Always on top */}
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Heart className="w-10 h-10 text-red-500" />
                <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center md:text-left">
                  Why This Gift Matters More
                </h2>
              </div>

              {/* Two Column Layout on Desktop, Stacked on Mobile */}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Image Section - Shows second on mobile, first on desktop */}
                <div className="order-1">
                  <img
                    src="/backpack.png"
                    alt="Durable backpack for refugee children"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>

                {/* Content Section - Shows first on mobile (after header), second on desktop */}
                <div className="order-2 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">
                    Strong Enough for the Journey
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Children fleeing conflict zones need more than just any backpack. They need gear that can withstand harsh conditions, hold precious belongings, and last through an uncertain journey.
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-2xl">💪</span>
                      <span className="text-foreground">Crafted for function and strength.</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-2xl">🌧️</span>
                      <span className="text-foreground">Weatherproof materials</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-2xl">🎒</span>
                      <span className="text-foreground">Child-sized for comfort</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-2xl">🌊</span>
                      <span className="text-foreground">Ocean Bound Plastics</span>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-6 space-y-3 border border-border/30">
                    <h4 className="text-xl font-bold text-foreground">
                      Small Gift. Massive Impact.
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Every <span className="font-bold text-primary">$25 donation</span> provides a child with dignity, stability, and hope during one of life's most difficult journeys. Through Partners.ngo, we're delivering 500 backpacks directly to refugee children.
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>✓ One ultra-durable backpack</p>
                      <p>✓ Direct delivery to a child in need</p>
                      <p>✓ Environmental impact (rescued Ocean Bound Plastic)</p>
                    </div>
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold"
                      size="lg"
                      onClick={() => window.open('https://www.paypal.com/ncp/payment/CLFFCAHE2G288', '_blank')}
                    >
                      Donate $25 Today
                    </Button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Auto-rotate every 8 seconds (only when not paused and not hovered)
  useEffect(() => {
    if (isPaused || isHovered) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [banners.length, isPaused, isHovered]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Banner Content */}
      <div className="transition-all duration-500 ease-in-out">
        {banners[currentBanner].content}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={prevBanner}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Pause/Play Button */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={togglePause}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>

        {/* Dots */}
        <div className="flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentBanner
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={nextBanner}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Pause Indicator */}
      {(isPaused || isHovered) && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-muted-foreground border border-border/50">
            {isHovered ? "Paused (hovering)" : "Paused"}
          </div>
        </div>
      )}
    </div>
  );
}

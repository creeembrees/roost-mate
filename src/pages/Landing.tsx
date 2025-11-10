import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Home, Shield, ArrowRight, Star } from "lucide-react";

const Landing = () => {
  const testimonials = [
    {
      name: "Priya Mishra",
      role: "Executive Director",
      text: "I was nervous about moving to a new city, but through CoHabit I found supportive flatmates who quickly became my closest friends. It's more than co-living—it's co-growing.",
      rating: 5,
    },
    {
      name: "Riya Sharma",
      role: "Content Creator",
      text: "CoHabit didn't just give me a place to stay—it gave me a friend I now can't imagine life without. Living here feels like home in the truest sense.",
      rating: 5,
    },
    {
      name: "Neha Kumari",
      role: "Engineer",
      text: "The spaces are comfortable, but the real magic is the people. CoHabit connected me with like-minded girls, and we've built memories that will last a lifetime.",
      rating: 5,
    },
    {
      name: "Priya Mishra",
      role: "Lawyer",
      text: "I joined for convenience, but stayed for the community. CoHabit makes sharing a space so much more fun, safe, and meaningful.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Where Shared Spaces{" "}
                <span className="bg-gradient-ocean bg-clip-text text-transparent">
                  Build
                </span>{" "}
                Lasting Bonds
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with like-minded roommates who share your values and lifestyle. 
                Build friendships that last beyond your lease.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/survey">
                  <Button size="lg" className="bg-gradient-ocean hover:opacity-90">
                    Try Now
                  </Button>
                </Link>
                <Link to="/survey">
                  <Button size="lg" variant="outline">
                    Take Survey
                  </Button>
                </Link>
              </div>

              {/* Feature Icons */}
              <div className="flex gap-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-ocean" />
                </div>
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-teal" />
                </div>
                <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center">
                  <Home className="h-6 w-6 text-purple" />
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative rounded-3xl overflow-hidden shadow-glow">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=1000&fit=crop"
                  alt="Modern apartment building"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-6 right-6 bg-white rounded-2xl p-4 shadow-card animate-float">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-ocean" />
                      <div className="w-8 h-8 rounded-full bg-gradient-sunset" />
                      <div className="w-8 h-8 rounded-full bg-purple" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">100+ Reviews</p>
                      <p className="text-xs text-muted-foreground">I loved the experience.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small preview cards */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 space-y-4">
                <Card className="w-24 h-24 rounded-2xl overflow-hidden shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop"
                    alt="Room preview"
                    className="w-full h-full object-cover"
                  />
                </Card>
                <Card className="w-24 h-24 rounded-2xl overflow-hidden shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=200&h=200&fit=crop"
                    alt="Room preview"
                    className="w-full h-full object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-slide-in-left">
              <div className="grid grid-cols-2 gap-4">
                <Card className="rounded-3xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=400&fit=crop"
                    alt="Cozy living space"
                    className="w-full h-full object-cover"
                  />
                </Card>
                <Card className="rounded-3xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop"
                    alt="Modern house"
                    className="w-full h-full object-cover"
                  />
                </Card>
                <Card className="rounded-3xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=400&fit=crop"
                    alt="Beautiful entrance"
                    className="w-full h-full object-cover"
                  />
                </Card>
                <Card className="rounded-3xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop"
                    alt="Minimalist interior"
                    className="w-full h-full object-cover"
                  />
                </Card>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-block">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="hsl(188 85% 43%)" strokeWidth="2" />
                  <path
                    d="M12 6v6l4 2"
                    stroke="hsl(188 85% 43%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                We're not just providing spaces,
                <br />
                we're building friendships.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your feedback matters to us. With your input, CoHabit can create spaces that don't
                just provide a roof, but foster friendships and meaningful connections. Help us
                build a place you'll truly love.
              </p>
              <Button className="bg-navy hover:bg-navy-light">
                Login in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From Strangers to Neighbors,
              <br />
              From Neighbors to Friends.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              CoHabit is more than just a roommate matching service—it's about building genuine
              connections. By bringing people from different walks of life under one roof, we've
              built communities that thrive on trust, support, and togetherness. Every shared moment
              adds to the bond, making living an experience worth cherishing.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-navy hover:bg-navy-light">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="link" className="text-ocean">
                watch videos →
              </Button>
            </div>
          </div>

          {/* Community Visual */}
          <div className="relative max-w-4xl mx-auto h-96 animate-scale-in">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              {/* Orbiting circles */}
              <circle cx="400" cy="200" r="150" stroke="hsl(214 32% 91%)" strokeWidth="1" fill="none" />
              <circle cx="400" cy="200" r="100" stroke="hsl(214 32% 91%)" strokeWidth="1" fill="none" />
              <circle cx="400" cy="200" r="50" stroke="hsl(214 32% 91%)" strokeWidth="1" fill="none" />
              
              {/* Profile circles - distributed around */}
              <g className="animate-float" style={{ animationDelay: "0s" }}>
                <circle cx="400" cy="50" r="25" fill="hsl(188 85% 43%)" />
              </g>
              <g className="animate-float" style={{ animationDelay: "0.5s" }}>
                <circle cx="550" cy="100" r="20" fill="hsl(280 70% 60%)" />
              </g>
              <g className="animate-float" style={{ animationDelay: "1s" }}>
                <circle cx="650" cy="200" r="25" fill="hsl(186 100% 37%)" />
              </g>
              <g className="animate-float" style={{ animationDelay: "1.5s" }}>
                <circle cx="550" cy="300" r="20" fill="hsl(330 80% 65%)" />
              </g>
              <g className="animate-float" style={{ animationDelay: "2s" }}>
                <circle cx="400" cy="350" r="25" fill="hsl(188 85% 43%)" />
              </g>
              <g className="animate-float" style={{ animationDelay: "2.5s" }}>
                <circle cx="250" cy="300" r="20" fill="hsl(280 70% 60%)" />
              </g>
              <g className="animate-float" style={{ animationDelay: "3s" }}>
                <circle cx="150" cy="200" r="25" fill="hsl(186 100% 37%)" />
              </g>
              <g className="animate-float" style={{ animationDelay: "3.5s" }}>
                <circle cx="250" cy="100" r="20" fill="hsl(330 80% 65%)" />
              </g>
              
              {/* Center element */}
              <circle cx="400" cy="200" r="40" fill="url(#centerGradient)" />
              <text x="400" y="210" textAnchor="middle" fontSize="24" fill="white">👥</text>
              
              <defs>
                <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(188 85% 43%)" />
                  <stop offset="100%" stopColor="hsl(186 100% 37%)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-testimonial">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Real <span className="font-bold">Experiences</span>, Real{" "}
              <span className="font-bold">Friendships</span>
            </h2>
            <p className="text-muted-foreground">—Hear from Our Community.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">From {testimonial.role}</p>
                  <p className="text-sm leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-10 h-10 rounded-full bg-gradient-ocean" />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;

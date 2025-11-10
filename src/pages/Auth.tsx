import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate authentication
    if (isLogin) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.success("Account created! Welcome to CoHabit!");
      navigate("/survey");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-purple relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-ocean/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Form */}
          <div className="animate-fade-in">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
                  fill="white"
                />
              </svg>
              <span className="text-xl font-bold text-white">CoHabit</span>
            </Link>

            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20">
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Login / Sign up" : "Create Account"}
              </h1>
              <p className="text-gray-300 mb-6">
                {isLogin
                  ? "Welcome back! Sign in to continue"
                  : "Join our community of roommates"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email ID
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-ocean hover:opacity-90 text-white"
                  size="lg"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
            </Card>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden md:flex items-center justify-center animate-scale-in">
            <div className="relative">
              {/* AI Bot Illustration */}
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean to-teal rounded-full opacity-20 blur-2xl animate-pulse" />
                <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
                  {/* Bot head */}
                  <rect
                    x="50"
                    y="40"
                    width="100"
                    height="80"
                    rx="20"
                    fill="white"
                    className="drop-shadow-lg"
                  />
                  {/* Eyes */}
                  <circle cx="80" cy="70" r="8" fill="hsl(188 85% 43%)" className="animate-pulse" />
                  <circle cx="120" cy="70" r="8" fill="hsl(188 85% 43%)" className="animate-pulse" />
                  {/* Smile */}
                  <path
                    d="M 75 95 Q 100 105 125 95"
                    stroke="hsl(188 85% 43%)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Antenna */}
                  <line x1="100" y1="40" x2="100" y2="20" stroke="white" strokeWidth="3" />
                  <circle cx="100" cy="15" r="5" fill="hsl(188 85% 43%)" className="animate-pulse" />
                  {/* Body */}
                  <rect
                    x="60"
                    y="120"
                    width="80"
                    height="60"
                    rx="15"
                    fill="white"
                    className="drop-shadow-lg"
                  />
                  {/* Arms */}
                  <rect x="35" y="130" width="20" height="40" rx="10" fill="white" />
                  <rect x="145" y="130" width="20" height="40" rx="10" fill="white" />
                </svg>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-block bg-teal/20 px-4 py-2 rounded-full mb-4">
                  <span className="text-white text-sm font-medium">Personal AI</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Meet Roomie</h3>
                <p className="text-gray-300">Your own AI assistant</p>
              </div>

              {/* Floating chat bubbles */}
              <div className="absolute -right-10 top-20 bg-ocean/20 backdrop-blur-sm rounded-2xl p-3 animate-float">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-ocean animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-ocean animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-ocean animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

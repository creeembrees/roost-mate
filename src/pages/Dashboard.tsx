import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, MapPin, DollarSign, Star } from "lucide-react";

// Mock data - will be replaced with real data from Supabase
const mockMatches = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 24,
    city: "New York",
    matchScore: 95,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    tags: ["Clean", "Early Bird", "Pet Lover"],
    budget: "$800-1200",
  },
  {
    id: 2,
    name: "Emily Chen",
    age: 23,
    city: "New York",
    matchScore: 89,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    tags: ["Organized", "Night Owl", "Social"],
    budget: "$900-1400",
  },
  {
    id: 3,
    name: "Jessica Martinez",
    age: 25,
    city: "New York",
    matchScore: 87,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    tags: ["Quiet", "Moderate", "Studious"],
    budget: "$700-1000",
  },
  {
    id: 4,
    name: "Ashley Williams",
    age: 22,
    city: "New York",
    matchScore: 84,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashley",
    tags: ["Flexible", "Active", "Friendly"],
    budget: "$850-1300",
  },
  {
    id: 5,
    name: "Amanda Brown",
    age: 26,
    city: "New York",
    matchScore: 81,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    tags: ["Tidy", "Balanced", "Homebody"],
    budget: "$750-1100",
  },
  {
    id: 6,
    name: "Lauren Davis",
    age: 24,
    city: "New York",
    matchScore: 78,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lauren",
    tags: ["Clean", "Social", "Foodie"],
    budget: "$900-1500",
  },
];

const Dashboard = () => {
  const [sortBy, setSortBy] = useState<"score" | "newest" | "age">("score");

  const sortedMatches = [...mockMatches].sort((a, b) => {
    if (sortBy === "score") return b.matchScore - a.matchScore;
    if (sortBy === "age") return a.age - b.age;
    return 0; // newest - will use created_at when we have real data
  });

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-blue-500";
    if (score >= 70) return "text-yellow-500";
    return "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Navigation />

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Your Roommate Matches
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on your compatibility survey responses
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex flex-wrap gap-4 justify-center mb-8 animate-fade-in-up">
            <Button
              variant={sortBy === "score" ? "default" : "outline"}
              onClick={() => setSortBy("score")}
              className="transition-all"
            >
              <Star className="w-4 h-4 mr-2" />
              Highest Match
            </Button>
            <Button
              variant={sortBy === "newest" ? "default" : "outline"}
              onClick={() => setSortBy("newest")}
              className="transition-all"
            >
              Newest Users
            </Button>
            <Button
              variant={sortBy === "age" ? "default" : "outline"}
              onClick={() => setSortBy("age")}
              className="transition-all"
            >
              Age Nearby
            </Button>
          </div>

          {/* Matches Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMatches.map((match, index) => (
              <Card
                key={match.id}
                className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 space-y-4">
                  {/* Avatar & Match Score */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={match.avatar}
                        alt={match.name}
                        className="w-16 h-16 rounded-full border-2 border-primary/20"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{match.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {match.age} years old
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`text-3xl font-bold ${getMatchColor(match.matchScore)}`}>
                        {match.matchScore}%
                      </div>
                      <p className="text-xs text-muted-foreground">Match</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {match.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-accent/20 hover:bg-accent/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{match.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{match.budget}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State (hidden when we have matches) */}
          {sortedMatches.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-xl text-muted-foreground mb-4">
                No matches found yet
              </p>
              <Button onClick={() => window.location.href = "/survey"}>
                Take the Survey
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

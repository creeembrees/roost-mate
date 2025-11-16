import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, MapPin, DollarSign, Star } from "lucide-react";
import { calculateCompatibilityScore, generateMatchTags, type SurveyAnswers } from "@/lib/compatibility";

// Mock current user's survey answers (will come from auth when backend is connected)
const currentUserAnswers: SurveyAnswers = {
  cleanliness_level: 5,
  introvert_extrovert: 3,
  sleep_schedule: 2,
  noise_tolerance: 3,
  food_preference: 4,
  smoking_habits: 1,
  pets_preference: 5,
  guest_comfort: 3,
  study_habits: 4,
  budget_flexibility: 3,
};

// Mock data - will be replaced with real users from database
const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 24,
    city: "New York",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    budget: "$800-1200",
    surveyAnswers: {
      cleanliness_level: 5,
      introvert_extrovert: 3,
      sleep_schedule: 2,
      noise_tolerance: 3,
      food_preference: 4,
      smoking_habits: 1,
      pets_preference: 5,
      guest_comfort: 2,
      study_habits: 4,
      budget_flexibility: 3,
    },
  },
  {
    id: 2,
    name: "Emily Chen",
    age: 23,
    city: "New York",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    budget: "$900-1400",
    surveyAnswers: {
      cleanliness_level: 4,
      introvert_extrovert: 4,
      sleep_schedule: 4,
      noise_tolerance: 4,
      food_preference: 3,
      smoking_habits: 2,
      pets_preference: 3,
      guest_comfort: 4,
      study_habits: 3,
      budget_flexibility: 4,
    },
  },
  {
    id: 3,
    name: "Jessica Martinez",
    age: 25,
    city: "New York",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    budget: "$700-1000",
    surveyAnswers: {
      cleanliness_level: 4,
      introvert_extrovert: 2,
      sleep_schedule: 3,
      noise_tolerance: 2,
      food_preference: 4,
      smoking_habits: 1,
      pets_preference: 3,
      guest_comfort: 2,
      study_habits: 5,
      budget_flexibility: 2,
    },
  },
  {
    id: 4,
    name: "Ashley Williams",
    age: 22,
    city: "New York",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashley",
    budget: "$850-1300",
    surveyAnswers: {
      cleanliness_level: 3,
      introvert_extrovert: 4,
      sleep_schedule: 3,
      noise_tolerance: 4,
      food_preference: 5,
      smoking_habits: 3,
      pets_preference: 4,
      guest_comfort: 4,
      study_habits: 3,
      budget_flexibility: 4,
    },
  },
  {
    id: 5,
    name: "Amanda Brown",
    age: 26,
    city: "New York",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    budget: "$750-1100",
    surveyAnswers: {
      cleanliness_level: 4,
      introvert_extrovert: 3,
      sleep_schedule: 2,
      noise_tolerance: 3,
      food_preference: 3,
      smoking_habits: 1,
      pets_preference: 2,
      guest_comfort: 2,
      study_habits: 3,
      budget_flexibility: 3,
    },
  },
  {
    id: 6,
    name: "Lauren Davis",
    age: 24,
    city: "New York",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lauren",
    budget: "$900-1500",
    surveyAnswers: {
      cleanliness_level: 5,
      introvert_extrovert: 4,
      sleep_schedule: 3,
      noise_tolerance: 3,
      food_preference: 2,
      smoking_habits: 1,
      pets_preference: 4,
      guest_comfort: 4,
      study_habits: 2,
      budget_flexibility: 4,
    },
  },
];

const Dashboard = () => {
  const [sortBy, setSortBy] = useState<"score" | "newest" | "age">("score");
  const [matches, setMatches] = useState<Array<{
    id: number;
    name: string;
    age: number;
    city: string;
    matchScore: number;
    avatar: string;
    tags: string[];
    budget: string;
  }>>([]);

  // Calculate compatibility scores for all users
  useEffect(() => {
    const calculatedMatches = mockUsers.map(user => ({
      id: user.id,
      name: user.name,
      age: user.age,
      city: user.city,
      avatar: user.avatar,
      budget: user.budget,
      matchScore: calculateCompatibilityScore(currentUserAnswers, user.surveyAnswers),
      tags: generateMatchTags(user.surveyAnswers),
    }));
    setMatches(calculatedMatches);
  }, []);

  const sortedMatches = [...matches].sort((a, b) => {
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
          {matches.length === 0 ? (
            <Card className="p-12 text-center animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4">No compatible users found</h3>
              <p className="text-muted-foreground mb-6">
                Be the first! Other users will see you as a match once they complete the survey.
              </p>
            </Card>
          ) : (
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
                          <p className="text-sm text-muted-foreground">{match.age} years</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getMatchColor(match.matchScore)}`}>
                          {match.matchScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">Match</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {match.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Location & Budget */}
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

                    {/* CTA Button */}
                    <Button className="w-full group" variant="default">
                      <Heart className="w-4 h-4 mr-2 group-hover:fill-current transition-all" />
                      View Profile
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

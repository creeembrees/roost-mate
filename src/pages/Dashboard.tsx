import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, MapPin, Star, Loader2 } from "lucide-react";
import { calculateCompatibilityScore, generateMatchTags, type SurveyAnswers } from "@/lib/compatibility";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface UserMatch {
  id: string;
  name: string;
  age: number;
  city: string;
  matchScore: number;
  avatar: string;
  tags: string[];
  bio: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"score" | "newest" | "age">("score");
  const [matches, setMatches] = useState<UserMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserAnswers, setCurrentUserAnswers] = useState<SurveyAnswers | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Initialize authentication
    const initAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setCurrentUser(user);
      await fetchMatches();
    };

    initAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/auth");
        } else if (session) {
          setCurrentUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }
      
      const user = session.user;

      // Get current user's survey answers
      const { data: userSurvey, error: surveyError } = await supabase
        .from("survey_answers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (surveyError) throw surveyError;

      if (!userSurvey) {
        toast({
          title: "Complete your survey",
          description: "Please complete the survey to see matches.",
        });
        navigate("/survey");
        return;
      }

      setCurrentUserAnswers({
        cleanliness_level: userSurvey.cleanliness_level,
        introvert_extrovert: userSurvey.introvert_extrovert,
        sleep_schedule: userSurvey.sleep_schedule,
        noise_tolerance: userSurvey.noise_tolerance,
        food_preference: userSurvey.food_preference,
        smoking_habits: userSurvey.smoking_habits,
        pets_preference: userSurvey.pets_preference,
        guest_comfort: userSurvey.guest_comfort,
        study_habits: userSurvey.study_habits,
        budget_flexibility: userSurvey.budget_flexibility,
      });

      // Fetch all other users who have completed both profile and survey
      const { data: otherUsers, error: usersError } = await supabase
        .from("profiles")
        .select(`
          *,
          survey_answers (*)
        `)
        .neq("id", user.id);

      if (usersError) throw usersError;

      // Filter out users without survey answers and calculate compatibility
      const calculatedMatches: UserMatch[] = (otherUsers || [])
        .filter((profile: any) => profile.survey_answers && profile.survey_answers.length > 0)
        .map((profile: any) => {
          const surveyAnswers: any = profile.survey_answers[0];
          const answers: SurveyAnswers = {
            cleanliness_level: surveyAnswers.cleanliness_level,
            introvert_extrovert: surveyAnswers.introvert_extrovert,
            sleep_schedule: surveyAnswers.sleep_schedule,
            noise_tolerance: surveyAnswers.noise_tolerance,
            food_preference: surveyAnswers.food_preference,
            smoking_habits: surveyAnswers.smoking_habits,
            pets_preference: surveyAnswers.pets_preference,
            guest_comfort: surveyAnswers.guest_comfort,
            study_habits: surveyAnswers.study_habits,
            budget_flexibility: surveyAnswers.budget_flexibility,
          };

          return {
            id: profile.id,
            name: profile.full_name || "Anonymous",
            age: profile.age || 0,
            city: profile.city,
            avatar: profile.profile_photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`,
            bio: profile.bio,
            matchScore: calculateCompatibilityScore(
              {
                cleanliness_level: userSurvey.cleanliness_level,
                introvert_extrovert: userSurvey.introvert_extrovert,
                sleep_schedule: userSurvey.sleep_schedule,
                noise_tolerance: userSurvey.noise_tolerance,
                food_preference: userSurvey.food_preference,
                smoking_habits: userSurvey.smoking_habits,
                pets_preference: userSurvey.pets_preference,
                guest_comfort: userSurvey.guest_comfort,
                study_habits: userSurvey.study_habits,
                budget_flexibility: userSurvey.budget_flexibility,
              },
              answers
            ),
            tags: generateMatchTags(answers),
          };
        });

      setMatches(calculatedMatches);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sortedMatches = [...matches].sort((a, b) => {
    if (sortBy === "score") return b.matchScore - a.matchScore;
    if (sortBy === "age") return a.age - b.age;
    return 0; // newest - would use created_at if available
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

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : matches.length === 0 ? (
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

                    {/* Location & Bio */}
                    <div className="space-y-2 pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{match.city}</span>
                      </div>
                      {match.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{match.bio}</p>
                      )}
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

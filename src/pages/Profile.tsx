import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    college_workplace: "",
    city: "",
    bio: "",
  });

  useEffect(() => {
    const initAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      checkExistingProfile();
    };
    
    initAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkExistingProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        age: profile.age?.toString() || "",
        gender: profile.gender || "",
        college_workplace: profile.college_workplace || "",
        city: profile.city || "",
        bio: profile.bio || "",
      });
      setProfilePhotoUrl(profile.profile_photo_url || "");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name || !formData.age || !formData.gender || !formData.city) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: formData.full_name,
        age: parseInt(formData.age),
        gender: formData.gender,
        college_workplace: formData.college_workplace || null,
        city: formData.city,
        bio: formData.bio || null,
        profile_photo_url: profilePhotoUrl || null,
      });

      if (error) throw error;

      toast({
        title: "Profile saved!",
        description: "Redirecting to survey...",
      });

      setTimeout(() => navigate("/survey"), 1500);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Navigation />

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Create Your Profile
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about yourself to find your perfect roommate match
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profilePhotoUrl} />
                  <AvatarFallback>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <Label htmlFor="profile_photo">Profile Photo URL (Optional)</Label>
                  <Input
                    id="profile_photo"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={profilePhotoUrl}
                    onChange={(e) => setProfilePhotoUrl(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              {/* Age & Gender */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    required
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Input
                    id="gender"
                    name="gender"
                    type="text"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* College/Workplace */}
              <div>
                <Label htmlFor="college_workplace">College / Workplace (Optional)</Label>
                <Input
                  id="college_workplace"
                  name="college_workplace"
                  type="text"
                  value={formData.college_workplace}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              {/* City */}
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">Short Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  placeholder="Tell us a bit about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Saving..." : "Continue to Survey"}
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

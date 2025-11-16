import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Survey = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cleanliness_level: "",
    introvert_extrovert: "",
    sleep_schedule: "",
    noise_tolerance: "",
    food_preference: "",
    smoking_habits: "",
    pets_preference: "",
    guest_comfort: "",
    study_habits: "",
    budget_flexibility: "",
  });

  const questions = [
    {
      id: "cleanliness_level",
      label: "Cleanliness Level",
      description: "How important is cleanliness to you?",
      options: [
        { value: "1", label: "Very Messy" },
        { value: "2", label: "Somewhat Messy" },
        { value: "3", label: "Moderate" },
        { value: "4", label: "Somewhat Clean" },
        { value: "5", label: "Very Clean" },
      ],
    },
    {
      id: "introvert_extrovert",
      label: "Introvert - Extrovert",
      description: "How social are you?",
      options: [
        { value: "1", label: "Very Introverted" },
        { value: "2", label: "Somewhat Introverted" },
        { value: "3", label: "Balanced" },
        { value: "4", label: "Somewhat Extroverted" },
        { value: "5", label: "Very Extroverted" },
      ],
    },
    {
      id: "sleep_schedule",
      label: "Sleep Schedule",
      description: "When do you typically sleep?",
      options: [
        { value: "1", label: "Very Early (8-10 PM)" },
        { value: "2", label: "Early (10-12 AM)" },
        { value: "3", label: "Moderate (12-2 AM)" },
        { value: "4", label: "Late (2-4 AM)" },
        { value: "5", label: "Very Late (After 4 AM)" },
      ],
    },
    {
      id: "noise_tolerance",
      label: "Noise Tolerance",
      description: "How much noise can you handle?",
      options: [
        { value: "1", label: "Very Low" },
        { value: "2", label: "Low" },
        { value: "3", label: "Moderate" },
        { value: "4", label: "High" },
        { value: "5", label: "Very High" },
      ],
    },
    {
      id: "food_preference",
      label: "Food Preference",
      description: "What are your dietary preferences?",
      options: [
        { value: "1", label: "Strictly Vegan" },
        { value: "2", label: "Vegetarian" },
        { value: "3", label: "Flexible" },
        { value: "4", label: "Omnivore" },
        { value: "5", label: "No Restrictions" },
      ],
    },
    {
      id: "smoking_habits",
      label: "Smoking Habits",
      description: "What's your stance on smoking?",
      options: [
        { value: "1", label: "Strongly Against" },
        { value: "2", label: "Prefer No Smoking" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Occasional Smoker" },
        { value: "5", label: "Regular Smoker" },
      ],
    },
    {
      id: "pets_preference",
      label: "Pets Preference",
      description: "How do you feel about pets?",
      options: [
        { value: "1", label: "No Pets" },
        { value: "2", label: "Prefer No Pets" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Like Pets" },
        { value: "5", label: "Love Pets" },
      ],
    },
    {
      id: "guest_comfort",
      label: "Guest Comfort",
      description: "How often do you have guests over?",
      options: [
        { value: "1", label: "Never" },
        { value: "2", label: "Rarely" },
        { value: "3", label: "Sometimes" },
        { value: "4", label: "Often" },
        { value: "5", label: "Very Often" },
      ],
    },
    {
      id: "study_habits",
      label: "Study Habits",
      description: "How do you prefer to study/work?",
      options: [
        { value: "1", label: "Total Silence" },
        { value: "2", label: "Quiet" },
        { value: "3", label: "Background Noise OK" },
        { value: "4", label: "Music/Sounds Preferred" },
        { value: "5", label: "Can Focus Anywhere" },
      ],
    },
    {
      id: "budget_flexibility",
      label: "Budget Flexibility",
      description: "How flexible is your budget?",
      options: [
        { value: "1", label: "Very Tight" },
        { value: "2", label: "Tight" },
        { value: "3", label: "Moderate" },
        { value: "4", label: "Flexible" },
        { value: "5", label: "Very Flexible" },
      ],
    },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every((value) => value !== "");
    if (!allFieldsFilled) {
      toast({
        title: "Incomplete survey",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const surveyData = {
        user_id: user.id,
        cleanliness_level: parseInt(formData.cleanliness_level),
        introvert_extrovert: parseInt(formData.introvert_extrovert),
        sleep_schedule: parseInt(formData.sleep_schedule),
        noise_tolerance: parseInt(formData.noise_tolerance),
        food_preference: parseInt(formData.food_preference),
        smoking_habits: parseInt(formData.smoking_habits),
        pets_preference: parseInt(formData.pets_preference),
        guest_comfort: parseInt(formData.guest_comfort),
        study_habits: parseInt(formData.study_habits),
        budget_flexibility: parseInt(formData.budget_flexibility),
      };

      const { error } = await supabase.from("survey_answers").upsert(surveyData);

      if (error) throw error;

      toast({
        title: "Survey completed!",
        description: "Finding your perfect roommate matches...",
      });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Roommate Compatibility Survey
            </h1>
            <p className="text-lg text-muted-foreground">
              Help us find your perfect match by answering these questions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((question, index) => (
              <Card
                key={question.id}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div>
                    <Label className="text-lg font-semibold text-foreground">
                      {question.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {question.description}
                    </p>
                  </div>

                  <RadioGroup
                    value={formData[question.id as keyof typeof formData]}
                    onValueChange={(value) => handleChange(question.id, value)}
                    className="space-y-3"
                  >
                    {question.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors"
                      >
                        <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                        <Label
                          htmlFor={`${question.id}-${option.value}`}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </Card>
            ))}

            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                size="lg"
                className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                Find My Matches
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Survey;

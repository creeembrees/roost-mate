-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  age INTEGER,
  gender TEXT,
  college_workplace TEXT,
  city TEXT NOT NULL,
  bio TEXT,
  profile_photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create survey_answers table
CREATE TABLE public.survey_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  cleanliness_level INTEGER NOT NULL CHECK (cleanliness_level BETWEEN 1 AND 5),
  introvert_extrovert INTEGER NOT NULL CHECK (introvert_extrovert BETWEEN 1 AND 5),
  sleep_schedule INTEGER NOT NULL CHECK (sleep_schedule BETWEEN 1 AND 5),
  noise_tolerance INTEGER NOT NULL CHECK (noise_tolerance BETWEEN 1 AND 5),
  food_preference INTEGER NOT NULL CHECK (food_preference BETWEEN 1 AND 5),
  smoking_habits INTEGER NOT NULL CHECK (smoking_habits BETWEEN 1 AND 5),
  pets_preference INTEGER NOT NULL CHECK (pets_preference BETWEEN 1 AND 5),
  guest_comfort INTEGER NOT NULL CHECK (guest_comfort BETWEEN 1 AND 5),
  study_habits INTEGER NOT NULL CHECK (study_habits BETWEEN 1 AND 5),
  budget_flexibility INTEGER NOT NULL CHECK (budget_flexibility BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
-- Users can view all profiles (needed for matching)
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- RLS Policies for survey_answers
-- Users can view all survey answers (needed for compatibility scoring)
CREATE POLICY "Survey answers are viewable by everyone" 
ON public.survey_answers 
FOR SELECT 
USING (true);

-- Users can insert their own survey answers
CREATE POLICY "Users can insert their own survey answers" 
ON public.survey_answers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own survey answers
CREATE POLICY "Users can update their own survey answers" 
ON public.survey_answers 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_survey_answers_updated_at
BEFORE UPDATE ON public.survey_answers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
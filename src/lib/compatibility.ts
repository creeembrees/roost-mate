// Compatibility scoring system for roommate matching

export interface SurveyAnswers {
  cleanliness_level: number;
  introvert_extrovert: number;
  sleep_schedule: number;
  noise_tolerance: number;
  food_preference: number;
  smoking_habits: number;
  pets_preference: number;
  guest_comfort: number;
  study_habits: number;
  budget_flexibility: number;
}

// Weightage for each field (must sum to 100%)
export const FIELD_WEIGHTS = {
  cleanliness_level: 0.15,
  introvert_extrovert: 0.10,
  sleep_schedule: 0.10,
  noise_tolerance: 0.10,
  food_preference: 0.10,
  smoking_habits: 0.08,
  pets_preference: 0.10,
  guest_comfort: 0.07,
  study_habits: 0.10,
  budget_flexibility: 0.10,
} as const;

/**
 * Calculate cosine similarity between two vectors
 * @param a First vector
 * @param b Second vector
 * @returns Similarity score (0-1)
 */
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

/**
 * Convert survey answers to vector
 * @param answers Survey answers
 * @returns Vector of answer values
 */
function answersToVector(answers: SurveyAnswers): number[] {
  return [
    answers.cleanliness_level,
    answers.introvert_extrovert,
    answers.sleep_schedule,
    answers.noise_tolerance,
    answers.food_preference,
    answers.smoking_habits,
    answers.pets_preference,
    answers.guest_comfort,
    answers.study_habits,
    answers.budget_flexibility,
  ];
}

/**
 * Calculate compatibility score between two users using cosine similarity
 * @param user1Answers First user's survey answers
 * @param user2Answers Second user's survey answers
 * @returns Compatibility score (0-100)
 */
export function calculateCompatibilityScore(
  user1Answers: SurveyAnswers,
  user2Answers: SurveyAnswers
): number {
  const vector1 = answersToVector(user1Answers);
  const vector2 = answersToVector(user2Answers);
  
  const similarity = cosineSimilarity(vector1, vector2);
  return Math.round(similarity * 100);
}

/**
 * Generate match summary tags based on survey answers
 * @param answers User's survey answers
 * @returns Array of descriptive tags
 */
export function generateMatchTags(answers: SurveyAnswers): string[] {
  const tags: string[] = [];

  // Cleanliness
  if (answers.cleanliness_level >= 4) tags.push("Clean");
  else if (answers.cleanliness_level <= 2) tags.push("Relaxed");

  // Sleep schedule
  if (answers.sleep_schedule <= 2) tags.push("Early Bird");
  else if (answers.sleep_schedule >= 4) tags.push("Night Owl");

  // Social
  if (answers.introvert_extrovert >= 4) tags.push("Social");
  else if (answers.introvert_extrovert <= 2) tags.push("Quiet");

  // Pets
  if (answers.pets_preference >= 4) tags.push("Pet Lover");
  else if (answers.pets_preference === 1) tags.push("No Pets");

  // Study habits
  if (answers.study_habits >= 4) tags.push("Studious");

  // Guest comfort
  if (answers.guest_comfort >= 4) tags.push("Welcoming");
  else if (answers.guest_comfort <= 2) tags.push("Homebody");

  return tags.slice(0, 3); // Return top 3 tags
}

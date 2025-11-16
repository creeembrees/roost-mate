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
 * Calculate similarity between two values on a 1-5 scale
 * @param value1 First user's answer (1-5)
 * @param value2 Second user's answer (1-5)
 * @returns Similarity percentage (0-1)
 */
function calculateFieldSimilarity(value1: number, value2: number): number {
  const difference = Math.abs(value1 - value2);
  return (5 - difference) / 5;
}

/**
 * Calculate compatibility score between two users
 * @param user1Answers First user's survey answers
 * @param user2Answers Second user's survey answers
 * @returns Compatibility score (0-100)
 */
export function calculateCompatibilityScore(
  user1Answers: SurveyAnswers,
  user2Answers: SurveyAnswers
): number {
  let totalScore = 0;

  // Calculate weighted similarity for each field
  (Object.keys(FIELD_WEIGHTS) as Array<keyof SurveyAnswers>).forEach((field) => {
    const similarity = calculateFieldSimilarity(
      user1Answers[field],
      user2Answers[field]
    );
    const weightedSimilarity = similarity * FIELD_WEIGHTS[field];
    totalScore += weightedSimilarity;
  });

  // Convert to 0-100 scale
  return Math.round(totalScore * 100);
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

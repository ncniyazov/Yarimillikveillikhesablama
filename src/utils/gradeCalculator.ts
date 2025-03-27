/**
 * Calculates the grade based on the given score
 * @param score The score value between 0 and 100
 * @returns The grade (2, 3, 4, or 5)
 */
export const calculateGrade = (score: number): number => {
  if (score < 30) return 2;
  if (score < 60) return 3;
  if (score < 80) return 4;
  return 5;
};

/**
 * Validates input to ensure it's a number between 1 and 100
 * @param value The input value
 * @returns A valid number between 1 and 100, or empty string
 */
export const validateInput = (value: string): string => {
  if (value === '') return '';
  
  const numValue = parseInt(value, 10);
  if (isNaN(numValue)) return '';
  if (numValue < 1) return '1';
  
  return numValue.toString();
};

/**
 * Calculates the semester score based on KSQ grades (40%) and BSQ grade (60%)
 * @param ksqValues Array of KSQ values
 * @param bsqValue BSQ value
 * @returns Object with calculated values
 */
export const calculateSemesterScore = (
  ksqValues: (number | undefined)[],
  bsqValue: number | undefined
): { 
  totalScore: number; 
  grade: number; 
  ksqPercentage: number; 
  bsqPercentage: number;
} => {
  // Filter out undefined values and convert to numbers
  const validKsqValues = ksqValues
    .filter((val): val is number => val !== undefined && !isNaN(val));
  
  // Calculate average of KSQ values if there are any
  const ksqAverage = validKsqValues.length > 0
    ? validKsqValues.reduce((sum, val) => sum + val, 0) / validKsqValues.length
    : 0;
  
  // Calculate 40% of KSQ average
  const ksqPercentage = ksqAverage * 0.4;
  
  // Calculate 60% of BSQ if it exists
  const bsqPercentage = bsqValue !== undefined ? bsqValue * 0.6 : 0;
  
  // Calculate total score
  const totalScore = ksqPercentage + bsqPercentage;
  
  // Calculate grade
  const grade = calculateGrade(totalScore);
  
  return {
    totalScore: parseFloat(totalScore.toFixed(1)),
    grade,
    ksqPercentage: parseFloat(ksqPercentage.toFixed(1)),
    bsqPercentage: parseFloat(bsqPercentage.toFixed(1))
  };
}; 
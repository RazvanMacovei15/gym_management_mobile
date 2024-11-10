export interface HabitDTO {
  id: number;
  habitName: string;
  description: string;
  occurrence: string;
  type: string;
  currentStreak: number;
  bestStreak: number;
  dayOfBestStreak: string;
  totalCount: number;
  targetCount: number;
  dateCreated: string;
  dateUpdated: string;
}

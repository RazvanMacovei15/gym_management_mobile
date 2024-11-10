import { HabitDTO } from "./HabitDTO";

export interface DailyLogDTO {
  id: number;
  date: string;
  habitDTO: HabitDTO;
  isCompleted: boolean;
  isPreviousDayCompleted: boolean;
}

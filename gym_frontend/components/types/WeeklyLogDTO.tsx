import { HabitDTO } from "./HabitDTO";

export interface WeeklyLogDTO {
  weeklyLogDTOid: number;
  habitDTO: HabitDTO;
  yearWeek: number;
  weekStartDay: string;
  weekEndDay: string;
  currentWeekCount: number;
  isCompleted: boolean;
  isPreviousWeekCompleted: boolean;
}

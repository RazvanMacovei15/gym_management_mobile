import { UserDTO } from "./UserDTO";

export interface TaskRequestDTO {
  taskDTO: TaskDTO;
  users: UserDTO[];
  gyms: GymDTO[];
}

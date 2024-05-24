import { Task } from './TaskType';

export interface TaskResponse {
  data: Task[];
  total: number;
  current: number;
  pages: number;
  status: string;
}

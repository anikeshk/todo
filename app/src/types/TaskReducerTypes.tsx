import { Task } from './TaskType';

export type TaskState = Task[];

export interface FetchTasksAction {
  type: 'FETCH_TASKS';
  payload: Task[];
}

export interface AddTaskAction {
  type: 'ADD_TASK';
  payload: Task;
}

export interface UpdateTaskAction {
  type: 'UPDATE_TASK';
  payload: Task;
}

export interface DeleteTaskAction {
  type: 'DELETE_TASK';
  payload: string;
}

export type TaskAction = FetchTasksAction | AddTaskAction | UpdateTaskAction | DeleteTaskAction;

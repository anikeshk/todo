import { Task } from '../types/TaskType';
import { Auth } from '../types/AuthContextType';
import { TaskRequest } from '../types/TaskAPIType';

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export const fetchTasks = async (auth: Auth): Promise<Task[]> => {
  const response = await fetch(API_URL, {
    headers: { Authorization: 'Basic ' + btoa(`${auth?.username}:${auth?.password}`) },
  });
  const data = await response.json();
  console.log('from fetchTaks: ' + data);
  return data.data;
};

export const addTask = async (task: TaskRequest, auth: Auth): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${auth?.username}:${auth?.password}`),
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data.data;
};

export const updateTask = async (task: TaskRequest, id: string, auth: Auth): Promise<Task> => {
  let { content, completed } = task;
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${auth?.username}:${auth?.password}`),
    },
    body: JSON.stringify({ content, completed }),
  });
  const data = await response.json();
  return data.data;
};

export const deleteTask = async (id: string, auth: Auth): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Basic ' + btoa(`${auth?.username}:${auth?.password}`),
    },
  });
};

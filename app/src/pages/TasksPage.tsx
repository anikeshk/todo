import { useEffect, useReducer } from 'react';

import TaskReducer from '../reducers/TaskReducer';
import { fetchTasks, addTask, updateTask, deleteTask } from '../data/TaskStore';
import { useAuth } from '../context/AuthProvider';
import { Task } from '../types/TaskType';
import { TaskRequest } from '../types/TaskAPIType';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';

const TasksPage = () => {
  const { auth } = useAuth();
  const [state, dispatch] = useReducer(TaskReducer, []);

  // getting called twice
  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks(auth!);
      dispatch({ type: 'FETCH_TASKS', payload: tasks });
    };
    loadTasks();
  }, []);

  const addTaskAction = async (content: string) => {
    const newTask: TaskRequest = {
      content,
    };
    const addedTask = await addTask(newTask, auth!); // ???
    dispatch({ type: 'ADD_TASK', payload: addedTask });
  };

  const toggleTaskAction = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    const result = await updateTask(updatedTask, task.id, auth!);
    dispatch({ type: 'UPDATE_TASK', payload: result });
  };

  const updateTaskAction = async (task: Task) => {
    const result = await updateTask(task, task.id, auth!);
    dispatch({ type: 'UPDATE_TASK', payload: result });
  };

  const deleteTaskAction = async (id: string) => {
    await deleteTask(id, auth!);
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <div>
      <AddTask addTaskAction={addTaskAction} />
      <div>
        <TaskList
          tasks={state}
          onToggleTask={toggleTaskAction}
          onUpdateTask={updateTaskAction}
          onDeleteTask={deleteTaskAction}
        />
      </div>
    </div>
  );
};

export default TasksPage;

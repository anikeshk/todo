import { useState } from 'react';

import { Task } from '../types/TaskType';

const TaskList = ({
  tasks,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
}: {
  tasks: Task[];
  onToggleTask: Function;
  onUpdateTask: Function;
  onDeleteTask: Function;
}) => {
  return (
    <div className="mx-auto p-6 bg-white rounded-lg">
      <ul className="divide-y divide-gray-300">
        {tasks.map((task) => (
          <li key={task.id} className="py-3">
            <TaskItem
              task={task}
              onToggle={onToggleTask}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const TaskItem = ({
  task,
  onToggle,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onToggle: Function;
  onUpdate: Function;
  onDelete: Function;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center justify-between py-3">
      <label className="flex items-center space-x-2 w-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="mr-2 cursor-pointer w-6 h-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        {isEditing ? (
          <input
            type="text"
            value={task.content}
            onChange={(e) => onUpdate({ ...task, content: e.target.value })}
            className="border border-gray-300 rounded-lg px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          />
        ) : (
          <span className="flex-1">{task.content}</span>
        )}
      </label>
      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={() => setIsEditing(false)}
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg focus:outline-none"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="border border-black-500 text-black-500 hover:bg-green-500 hover:text-white px-2 py-1 rounded-lg focus:outline-none"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="border border-black-500 text-black-500 hover:bg-red-500 hover:text-white px-2 py-1 rounded-lg focus:outline-none"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;

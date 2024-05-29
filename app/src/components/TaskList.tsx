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
    <div>
      <h2>Open Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
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
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          type="text"
          value={task.content}
          onChange={(e) => {
            onUpdate({ ...task, content: e.target.value });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.content}
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => {
          onToggle(task);
        }}
      />
      {taskContent}
    </label>
  );
};

export default TaskList;

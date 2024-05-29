import { useState } from 'react';

const AddTask = ({ addTaskAction }: { addTaskAction: Function }) => {
  const [content, setContent] = useState('');
  return (
    <>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add task"
      />
      <button
        onClick={() => {
          setContent('');
          addTaskAction(content);
        }}
      >
        Add Task
      </button>
    </>
  );
};

export default AddTask;

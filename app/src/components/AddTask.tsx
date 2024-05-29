import { useState } from 'react';

const AddTask = ({ addTaskAction }: { addTaskAction: Function }) => {
  const [content, setContent] = useState('');
  return (
    <div className="mx-auto p-6 bg-white rounded-lg">
      <div className="flex items-center">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add task"
          className="flex-1 py-2 px-3 border rounded-l-lg focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={() => {
            addTaskAction(content);
            setContent('');
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddTask;

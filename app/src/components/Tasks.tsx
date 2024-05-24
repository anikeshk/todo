import { useState, useEffect } from 'react';

import { useAuth } from '../context/AuthenticationProvider';

import { TaskResponse } from '../types/TaskResponseType';

const Tasks = () => {
  const { isAuthenticated, auth } = useAuth();

  // better default for TaskResponse
  const [tasks, setTasks] = useState<TaskResponse>({
    data: [],
    total: 0,
    current: 0,
    pages: 0,
    status: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const headers = {
          Authorization: 'Basic ' + btoa(`${auth?.username}:${auth?.password}`),
          'Access-Control-Allow-Origin': '*',
        };
        const response = await fetch('/api/tasks', { headers });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <section>
      {isAuthenticated ? (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {tasks.data.map((task) => (
                <div key={task.id}>
                  <p>{task.name}</p>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <h2>Not authenticated</h2>
      )}
    </section>
  );
};

export default Tasks;

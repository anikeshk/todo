import TasksPage from './TasksPage';
import Default from '../components/Default';

import { useAuth } from '../context/AuthProvider';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex justify-center py-12 bg-gray-100">
      <div className="w-full max-w-2xl min-h-content p-6 bg-white rounded-lg shadow-md">
        {isAuthenticated ? (
          <>
            <TasksPage />
          </>
        ) : (
          <Default />
        )}
      </div>
    </div>
  );
};

export default HomePage;

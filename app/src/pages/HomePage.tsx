import TasksPage from './TasksPage';
import Default from '../components/Default';

import { useAuth } from '../context/AuthProvider';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section>
      {isAuthenticated ? (
        <>
          <TasksPage />
        </>
      ) : (
        <Default />
      )}
    </section>
  );
};

export default HomePage;

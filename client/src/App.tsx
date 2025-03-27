import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;

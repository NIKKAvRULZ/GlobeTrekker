import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
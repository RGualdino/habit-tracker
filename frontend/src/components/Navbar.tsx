import { useNavigate } from 'react-router-dom';
import { removeToken } from '../auth/token';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-lg font-bold text-gray-900 hover:text-gray-700"
        >
          Habit Tracker
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
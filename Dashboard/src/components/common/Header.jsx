import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Financy Dashboard</div>
      
      <button 
        onClick={handleLogout}
        className="text-sm font-medium text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}
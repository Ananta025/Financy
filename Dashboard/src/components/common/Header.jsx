export default function Header() {
  const handleLogout = () => {
    // No auth - just navigate to frontend
    console.log('Logout clicked');
    const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';
    window.location.href = `${FRONTEND_URL}/login`;
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
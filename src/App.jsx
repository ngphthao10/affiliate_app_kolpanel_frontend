import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import InfluencerLogin from './components/InfluencerLogin';
import Commission from './pages/Commission'
import './App.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

// Dashboard page component
const Dashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm text-gray-500 mb-1">Total Revenue</h3>
        <p className="text-2xl font-bold">$2,150.00</p>
        <p className="text-xs text-green-500">+5% from last month</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm text-gray-500 mb-1">Total Orders</h3>
        <p className="text-2xl font-bold">248</p>
        <p className="text-xs text-green-500">+12% from last month</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm text-gray-500 mb-1">New Customers</h3>
        <p className="text-2xl font-bold">35</p>
        <p className="text-xs text-red-500">-3% from last month</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm text-gray-500 mb-1">Conversion Rate</h3>
        <p className="text-2xl font-bold">3.2%</p>
        <p className="text-xs text-green-500">+0.5% from last month</p>
      </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
      <h3 className="font-medium mb-4">Recent Activity</h3>
      <p className="text-gray-500">No recent activity to display</p>
    </div>
  </div>
);

// Report page component
const Report = () => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold mb-4">Reports</h2>
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
      <h3 className="font-medium mb-4">Performance Reports</h3>
      <p className="text-gray-500">Reports data will be displayed here</p>
    </div>
  </div>
);

// Payment page component
const Payment = () => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold mb-4">Payment Management</h2>
    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
      <h3 className="font-medium mb-4">Payment History</h3>
      <p className="text-gray-500">Payment data will be displayed here</p>
    </div>
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [currentView, setCurrentView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (data) => {
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <InfluencerLogin onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        user={user}
        onLogout={handleLogout}
        currentView={currentView}
        onNavigate={handleNavigate}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'commission' && <Commission />}
          {currentView === 'report' && <Report />}
          {currentView === 'payment' && <Payment />}
        </main>
      </div>
    </div>
  );
};

export default App;
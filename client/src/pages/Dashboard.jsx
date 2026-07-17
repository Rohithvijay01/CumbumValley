import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Welcome, {userInfo?.name}!</h2>
        <p className="text-gray-600">You are logged in as a <span className="font-bold text-primary-600">{userInfo?.role}</span>.</p>
        
        {userInfo?.role === 'Farmer' && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Farmer Controls</h3>
            <p className="text-sm text-gray-500">Manage your products and view orders here (Coming soon).</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

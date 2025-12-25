export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-600 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example summary cards */}
        <div className="p-6 bg-white rounded-xl shadow">Total Events: 12</div>
        <div className="p-6 bg-white rounded-xl shadow">Total Orders: 35</div>
        <div className="p-6 bg-white rounded-xl shadow">Users: 20</div>
      </div>
    </div>
  );
}

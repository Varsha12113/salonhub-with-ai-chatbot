import React, { useEffect  } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { fetchOrders, setSearch, setFilter } from '../../redux/Slice/orderSlice';

export default function AdminOrders() {
 
const dispatch = useDispatch();

const { filteredOrders = [], stats = {}, status, error, search = '', filter = 'All' } = useSelector(state => state.orders || {});

const uniqueStatuses = Array.from(new Set(filteredOrders.map(order => order.status)))
    .sort()
    .map(status => ({ value: status, label: status }));

  useEffect(() => {
    if (status === 'idle' || status === 'failed') { // Only fetch when needed
      dispatch(fetchOrders());
    }
  }, [dispatch, status]); // ✅ status prevents infinite loop


 // 🔍 DEBUG - Remove after confirming it works
  console.log('🔍 Backend Statuses:', uniqueStatuses);
  console.log('🔍 All Orders:', filteredOrders.length);


 // 🔹 Loading state
  if (status === 'loading') {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">Loading orders...</div>
        </div>
      </div>
    );
  }

  // 🔹 Error state
  if (status === 'failed') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-xl font-semibold text-red-600 mb-2">Failed to load orders</div>
          <div className="text-gray-500 mb-4">{error}</div>
          <button 
            onClick={() => dispatch(fetchOrders())}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="space-y-6">
      {/* Header with DYNAMIC Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
          
          {/* Search */}
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by customer..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="outline-none text-sm text-gray-600"
            />
          </div>
           <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Filter size={18} className="text-gray-400 mr-2" />
            <select
              value={filter}
              onChange={(e) => {
                dispatch(setSearch('')); // Clear search when filtering
                dispatch(setFilter(e.target.value));
              }}
              className="outline-none text-sm text-gray-600 bg-transparent"
            >
              <option value="All">All ({filteredOrders.length})</option>
              {uniqueStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ===== Orders Table ===== */}
      <div className="bg-white p-5 rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Price (₹)</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No matching orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.service}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">{order.time}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">₹{order.price}</td>
             <td className="px-4 py-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : order.status === "Declined" || order.status === "Rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3 text-gray-500">
                      <Eye size={18} className="cursor-pointer hover:text-pink-600" title="View Details" />
                      <Edit size={18} className="cursor-pointer hover:text-yellow-600" title="Edit Order" />
                      <Trash2 size={18} className="cursor-pointer hover:text-red-600" title="Delete Order" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Summary Section - ✅ Fixed: use stats from Redux */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total_orders || filteredOrders.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {filteredOrders.filter(o => o.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h3 className="text-gray-500 text-sm font-medium">Confirmed</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {filteredOrders.filter(o => o.status.includes('Pending') || o.status.includes('Confirmed')).length}
          </p>
        </div>
      </div>
    </div>
  );
  
}

// store/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpGet ,httpPatch ,httpDelete} from '../../config/httphandler'; // Update path

// 🔹 Async Thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const [ordersResponse, statsResponse] = await Promise.all([
        httpGet('/api/booking/history/'),
        httpGet('/api/booking/admin/orders/stats/')
      ]);
      
      return { orders: ordersResponse, stats: statsResponse };
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch orders');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await httpPatch(`/api/booking/admin/orders/${orderId}/status/`, { status });
      return { orderId, status, data: response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to update status');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await httpDelete(`/api/booking/admin/orders/${orderId}/`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to delete order');
    }
  }
);

// 🔹 Transform API data to component format
const transformOrderData = (apiOrder) => ({
  id: `ORD${String(apiOrder.id).padStart(3, '0')}`,
  customer: apiOrder.username,
  service: apiOrder.services.map(s => s.service_name).join(', '),
  date: new Date(apiOrder.slot_info.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }),
  time: `${apiOrder.slot_info.start.slice(0, 5)} - ${apiOrder.slot_info.end.slice(0, 5)}`,
  price: parseFloat(apiOrder.grand_total),
  status: apiOrder.status.charAt(0).toUpperCase() + apiOrder.status.slice(1),
  rawData: apiOrder // Keep original for detailed views
});

// 🔹 Initial State
const initialState = {
  orders: [],
  filteredOrders: [],
  stats: {
    total_orders: 0,
    completed_orders: 0,
    pending_orders: 0
  },
  search: '',
  filter: 'All',
  status: 'idle', // idle | loading | succeeded | failed
  error: null
};

// 🔹 Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.filteredOrders = state.orders.filter(order => 
        order.customer.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      const matchesSearch = state.search 
        ? order => order.customer.toLowerCase().includes(state.search.toLowerCase())
        : () => true;
      
      state.filteredOrders = state.orders.filter(order => {
        const matchesStatus = action.payload === 'All' ? true : order.status === action.payload;
        return matchesSearch(order) && matchesStatus;
      });
    },
    clearFilters: (state) => {
      state.search = '';
      state.filter = 'All';
      state.filteredOrders = state.orders;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.orders.map(transformOrderData);
        state.filteredOrders = action.payload.orders.map(transformOrderData);
        state.stats = action.payload.stats;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const orderIndex = state.orders.findIndex(order => order.id === `ORD${action.payload.orderId}`);
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = action.payload.status;
          // Update stats
          Object.keys(state.stats).forEach(key => {
            if (key.includes('orders')) state.stats[key] = 0; // Will be refreshed
          });
        }
      })
      // Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.id !== `ORD${action.payload}`);
        state.filteredOrders = state.filteredOrders.filter(order => order.id !== `ORD${action.payload}`);
        // Update stats
        Object.keys(state.stats).forEach(key => {
          if (key.includes('orders')) state.stats[key] = 0; // Will be refreshed
        });
      });
  }
});

// 🔹 Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectFilteredOrders = (state) => state.orders.filteredOrders;
export const selectStats = (state) => state.orders.stats;
export const selectStatus = (state) => state.orders.status;
export const selectError = (state) => state.orders.error;

// 🔹 Actions
export const { setSearch, setFilter, clearFilters } = orderSlice.actions;

export default orderSlice.reducer;

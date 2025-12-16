// redux/Slice/DashboardSlice.js - FULL UPDATE
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpGet } from '../../config/httphandler';

export const fetchDashboardStats = createAsyncThunk('dashboard/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const response = await httpGet('/api/booking/admin/sales/stats/');
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || 'Failed to fetch stats');
  }
});

export const fetchRecentBookings = createAsyncThunk('dashboard/fetchBookings', async (_, { rejectWithValue }) => {
  try {
    const response = await httpGet('/api/booking/history/');
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || 'Failed to fetch bookings');
  }
});

export const fetchCustomers = createAsyncThunk('dashboard/fetchCustomers', async (_, { rejectWithValue }) => {
  try {
    const response = await httpGet('/api/auth/admin/customers/dashboard/');
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || 'Failed to fetch customers');
  }
});

export const fetchChartData = createAsyncThunk('dashboard/fetchChartData', async (_, { rejectWithValue }) => {
  try {
    const response = await httpGet('/api/booking/admin/customers/trend/');
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || 'Failed to fetch chart data');
  }
});

const transformBookingData = (apiBooking) => ({
  id: apiBooking.id,
  customer: apiBooking.username,
  service: apiBooking.services.map(s => s.service_name).join(', '),
  date: new Date(apiBooking.slot_info.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  time: `${apiBooking.slot_info.start.slice(0, 5)} - ${apiBooking.slot_info.end.slice(0, 5)}`,
  price: parseFloat(apiBooking.grand_total),
  status: apiBooking.status.charAt(0).toUpperCase() + apiBooking.status.slice(1),
  rawData: apiBooking
});

const initialState = {
  stats: { sales: 0, revenue: 0, expenses: 0 },
  recentBookings: [],
  customers: [],
  chartData: { labels: [], data: [] }, // ✅ Dynamic chart
  status: 'idle',
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchRecentBookings.fulfilled, (state, action) => {
        state.recentBookings = action.payload
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3)
          .map(transformBookingData);
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customers = action.payload.customers;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.chartData = {
          labels: action.payload.labels,
          data: action.payload.data
        };
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default dashboardSlice.reducer;

// analyticsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpGet } from '../../config/httphandler'; // <-- adjust path to your file above

// 🔹 Summary (top cards)
export const fetchAnalyticsSummary = createAsyncThunk(
  'analytics/fetchSummary',
  async () => {
    const data = await httpGet('/api/booking/admin/analytics/summary/');
    return data;
  }
);

// 🔹 Monthly revenue (line chart)
export const fetchMonthlyRevenue = createAsyncThunk(
  'analytics/fetchMonthlyRevenue',
  async () => {
    const data = await httpGet('/api/booking/admin/analytics/monthly-revenue/');
    return data;
  }
);

// 🔹 Service distribution (pie chart)
export const fetchServiceDistribution = createAsyncThunk(
  'analytics/fetchServiceDistribution',
  async () => {
    const data = await httpGet('/api/booking/admin/analytics/service-distribution/');
    return data;
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    summary: {
      total_revenue: 0,
      appointments: 0,
      new_customers: 0,
    },
    revenueData: { labels: [], data: [] },
    serviceData: { labels: [], data: [] },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // summary
      .addCase(fetchAnalyticsSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchAnalyticsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // monthly revenue
      .addCase(fetchMonthlyRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueData = action.payload;
      })
      .addCase(fetchMonthlyRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // service distribution
      .addCase(fetchServiceDistribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceData = action.payload;
      })
      .addCase(fetchServiceDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default analyticsSlice.reducer;

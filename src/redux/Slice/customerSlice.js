// redux/Slice/customerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpGet } from '../../config/httphandler';

// 🔹 Async Thunk
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet('/api/auth/admin/customers/dashboard/');
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch customers');
    }
  }
);

// 🔹 Transform API data (handle null last_visit)
const transformCustomerData = (apiCustomer) => ({
  id: apiCustomer.customer_id,
  name: apiCustomer.name,
  email: apiCustomer.email,
  phone: apiCustomer.phone || 'N/A',
  totalBookings: apiCustomer.total_bookings,
  lastVisit: apiCustomer.last_visit ? new Date(apiCustomer.last_visit).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  }) : 'Never',
  loyalty: apiCustomer.loyalty,
  userId: apiCustomer.user_id
});

// 🔹 Initial State
const initialState = {
  customers: [],
  filteredCustomers: [],
  summary: {
    total_customers: 0,
    gold_members: 0,
    silver_members: 0
  },
  search: '',
  filter: 'All',
  status: 'idle',
  error: null
};

// 🔹 Slice
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.filteredCustomers = state.customers.filter(customer => 
        customer.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        customer.email.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.filteredCustomers = state.customers.filter(customer => {
        const matchesSearch = state.search === '' || 
          customer.name.toLowerCase().includes(state.search.toLowerCase()) ||
          customer.email.toLowerCase().includes(state.search.toLowerCase());
        const matchesLoyalty = action.payload === 'All' ? true : customer.loyalty === action.payload;
        return matchesSearch && matchesLoyalty;
      });
    },
    clearFilters: (state) => {
      state.search = '';
      state.filter = 'All';
      state.filteredCustomers = state.customers;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload.customers.map(transformCustomerData);
        state.filteredCustomers = action.payload.customers.map(transformCustomerData);
        state.summary = action.payload.summary;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// 🔹 Selectors
export const selectCustomers = (state) => state.customers.customers;
export const selectFilteredCustomers = (state) => state.customers.filteredCustomers;
export const selectSummary = (state) => state.customers.summary;
export const selectStatus = (state) => state.customers.status;
export const selectError = (state) => state.customers.error;

// 🔹 Actions
export const { setSearch, setFilter, clearFilters } = customerSlice.actions;

export default customerSlice.reducer;

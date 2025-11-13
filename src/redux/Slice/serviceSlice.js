// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getData, createData } from "../../config/httphandler";

// /* ============================
//    🔹 Fetch All Services
// ============================ */
// export const fetchServices = createAsyncThunk("services/fetchAll", async (_, { rejectWithValue }) => {
//   try {
//     const response = await getData("service");
//     console.log("Fetched Services (raw):", response);
//     // Normalize common shapes: [] or { data: [] } or { results: [] }
//     if (Array.isArray(response)) return response;
//     if (response && Array.isArray(response.data)) return response.data;
//     if (response && Array.isArray(response.results)) return response.results;
//     // try to find first array in object
//     if (response && typeof response === 'object') {
//       const arr = Object.values(response).find((v) => Array.isArray(v));
//       if (arr) return arr;
//     }
//     // fallback: return empty array
//     return [];
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// });

// /* ============================
//    🔹 Add a New Service
// ============================ */
// export const addService = createAsyncThunk("services/add", async (serviceData, { rejectWithValue }) => {
//   try {
//     const response = await createData("service", serviceData);
//     return response;
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// });

// /* ============================
//    🔹 Slice Definition
// ============================ */
// const serviceSlice = createSlice({
//   name: "services",
//   initialState: {
//     items: [],        // list of all services
//     loading: false,
//     error: null,
//     success: false,   // for POST success state
//   },
//   reducers: {
//     clearStatus: (state) => {
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ---- Fetch Services ----
//       .addCase(fetchServices.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.loading = false;
//         console.log("✅ Service data received:", action.payload);
//         state.items = action.payload;
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ---- Add Service ----
//       .addCase(addService.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//       })
//       .addCase(addService.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.items.push(action.payload); // add new service to list
//       })
//       .addCase(addService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearStatus } = serviceSlice.actions;
// export default serviceSlice.reducer;


// src/redux/Slice/serviceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Base URL
const BASE_URL = "http://127.0.0.1:8000/api/catalog/admin/createall/";

// ✅ Get all services
export const fetchServices = createAsyncThunk("services/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to fetch services");
  }
});

// ✅ Add new service
export const addService = createAsyncThunk("services/add", async (serviceData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(BASE_URL, serviceData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to add service");
  }
});

// ✅ Update service
export const updateService = createAsyncThunk("services/update", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${BASE_URL}${id}/`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to update service");
  }
});

// ✅ Delete service
export const deleteService = createAsyncThunk("services/delete", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL}${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Failed to delete service");
  }
});

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default serviceSlice.reducer;

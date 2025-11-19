import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/httphandler"; // axios instance

// ==========================
// ⭐ MAIN SERVICES
// ==========================

// GET all main services
export const fetchMainServices = createAsyncThunk(
  "services/fetchMainServices",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/services/admin/main/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// CREATE main service - needs genderId
export const createMainService = createAsyncThunk(
  "services/createMainService",
  async ({ genderId, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/services/admin/gender/${genderId}/main/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE main service
export const updateMainService = createAsyncThunk(
  "services/updateMainService",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/services/admin/main/${id}/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE main service
export const deleteMainService = createAsyncThunk(
  "services/deleteMainService",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/services/admin/main/${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================
// ⭐ CHILD SERVICES
// ==========================

// GET all children under a main service
export const fetchChildServices = createAsyncThunk(
  "services/fetchChildServices",
  async (mainId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/services/admin/main/${mainId}/child/`);
      return { mainId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// CREATE child
export const createChildService = createAsyncThunk(
  "services/createChildService",
  async ({ mainId, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await api.post(
        `/api/services/admin/main/${mainId}/child/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return { mainId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE child
export const updateChildService = createAsyncThunk(
  "services/updateChildService",
  async ({ mainId, childId, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await api.put(
        `/api/services/admin/main/${mainId}/child/${childId}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return { mainId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE child
export const deleteChildService = createAsyncThunk(
  "services/deleteChildService",
  async ({ mainId, childId }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/services/admin/main/${mainId}/child/${childId}/`);
      return { mainId, childId };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================
// ⭐ SLICE INITIAL STATE
// ==========================

const initialState = {
  main: [],
  child: {}, // child[mainId] = array of child services
  loading: false,
  error: null,
};

// ==========================
// ⭐ SLICE DEFINITION
// ==========================

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // MAIN services
      .addCase(fetchMainServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainServices.fulfilled, (state, action) => {
        state.loading = false;
        state.main = action.payload;
      })
      .addCase(fetchMainServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE main
      .addCase(createMainService.fulfilled, (state, action) => {
        state.main.push(action.payload);
      })

      // UPDATE main
      .addCase(updateMainService.fulfilled, (state, action) => {
        state.main = state.main.map((m) =>
          m.id === action.payload.id ? action.payload : m
        );
      })

      // DELETE main
      .addCase(deleteMainService.fulfilled, (state, action) => {
        state.main = state.main.filter((m) => m.id !== action.payload);
        delete state.child[action.payload];
      })

      // CHILD services
      .addCase(fetchChildServices.fulfilled, (state, action) => {
        state.child[action.payload.mainId] = action.payload.data;
      })

      // CREATE child
      .addCase(createChildService.fulfilled, (state, action) => {
        const { mainId, data } = action.payload;
        if (!state.child[mainId]) state.child[mainId] = [];
        state.child[mainId].push(data);
      })

      // UPDATE child
      .addCase(updateChildService.fulfilled, (state, action) => {
        const { mainId, data } = action.payload;
        state.child[mainId] = state.child[mainId].map((c) =>
          c.id === data.id ? data : c
        );
      })

      // DELETE child
      .addCase(deleteChildService.fulfilled, (state, action) => {
        const { mainId, childId } = action.payload;
        state.child[mainId] = state.child[mainId].filter((c) => c.id !== childId);
      });
  },
});

export default serviceSlice.reducer;

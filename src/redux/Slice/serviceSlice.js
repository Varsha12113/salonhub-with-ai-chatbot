import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/httphandler";

// =================================================
// MAIN SERVICES
// =================================================

// 1️⃣ Fetch all main services
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

export const createMainService = createAsyncThunk(
  "services/createMainService",
  async ({ genderId, data }, { rejectWithValue }) => {
    try {
      const payload = {
        ...data,
        gender: genderId,
        
      };

      console.log("SENDING MAIN SERVICE:", payload);

      const res = await api.post(
        `/api/services/admin/gender/${genderId}/main/`,
        payload
      );

      return res.data;
    } catch (err) {
      console.log("MAIN SERVICE ERROR:", err.response?.data);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// 3️⃣ Update a main service
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

// 4️⃣ Delete a main service
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

// =================================================
// CHILD SERVICES
// =================================================

// 5️⃣ Fetch children for a main service
export const fetchChildServices = createAsyncThunk(
  "services/fetchChildServices",
  async (mainId, thunkAPI) => {
    try {
      const res = await api.get(`/api/services/user/main/${mainId}/child/`);
            console.log("API child services response:", mainId, res.data); // 👈 here
      return { mainId, data: res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 6️⃣ Create child service (multipart/form-data)
export const createChildService = createAsyncThunk(
  "services/createChildService",
  async ({ mainId, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("main_services", mainId);

      Object.entries(data).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await api.post(
        `/api/services/admin/main/${mainId}/child/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return { mainId, data: res.data };
    } catch (err) {
  console.error("CREATE CHILD ERROR:", err.response?.status, err.response?.data);
  return rejectWithValue(err.response?.data || err.message);
}
  }
);

// 7️⃣ Update a child service — fix header
export const updateChildService = createAsyncThunk(
  "services/updateChildService",
  async ({ mainId, childId, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await api.patch(    // ← patch not put
        `/api/services/admin/main/${mainId}/child/${childId}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }  // ← required for image
      );

      return { mainId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// // 8️⃣ Delete a child service
// export const deleteChildService = createAsyncThunk(
//   "services/deleteChildService",
//   async ({ mainId, childId }, { rejectWithValue }) => {
//     try {
//       await api.delete(`/api/services/admin/main/${mainId}/child/${childId}/`);
//       return { mainId, childId };
//     } catch (err) {
//       // 🔴 IMPORTANT: return a serializable error payload
//       const payload =
//         err?.response?.data ||
//         err?.message ||
//         "Failed to delete child service";
//       return rejectWithValue(payload);
//     }
//   }
// );

export const deleteChildService = createAsyncThunk(
  "services/deleteChildService",
  async ({ mainId, childId }, { rejectWithValue }) => {
    try {
      const res = await api.delete(
        `/api/services/admin/main/${mainId}/child/${childId}/`
      );
      console.log("DELETE OK:", res);
      return { mainId, childId };
    } catch (err) {
      console.log("DELETE ERROR raw:", err.response?.status, err.response?.data);
      const payload =
        err?.response?.data ||
        err?.message ||
        "Failed to delete child service";
      return rejectWithValue(payload);
    }
  }
);



// =================================================
// SLICE
// =================================================

const initialState = {
  main: [],
  mainServices: {},
  child: {}, // child[mainId] = []
  loading: false,
  error: null,
  status: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearServiceStatus: (state) => {
      state.status = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================================
      // MAIN SERVICES
      // ================================
      .addCase(fetchMainServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMainServices.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;

        // If thunk returned { genderId, services } (user-facing fetch), store by gender
        if (payload && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "genderId")) {
          const { genderId, services, data } = payload;
          state.mainServices = state.mainServices || {};
          state.mainServices[genderId] = services ?? data ?? [];
        } else {
          // Fallback: payload is the full main list (admin fetch)
          state.main = payload;
        }
      })
      .addCase(fetchMainServices.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(createMainService.fulfilled, (state, action) => {
        state.main.push(action.payload);
        state.status = "Main service created successfully";
      })

      .addCase(updateMainService.fulfilled, (state, action) => {
        state.main = state.main.map((m) =>
          m.id === action.payload.id ? action.payload : m
        );
        state.status = "Main service updated successfully";
      })

      .addCase(deleteMainService.fulfilled, (state, action) => {
        state.main = state.main.filter((m) => m.id !== action.payload);
        delete state.child[action.payload];
        state.status = "Main service deleted successfully";
      })

      // ================================
      // CHILD SERVICES
      // ================================
      .addCase(fetchChildServices.fulfilled, (state, action) => {
        state.child[action.payload.mainId] = action.payload.data;
      })

      .addCase(createChildService.fulfilled, (state, action) => {
        const { mainId, data } = action.payload;
        if (!state.child[mainId]) state.child[mainId] = [];
        state.child[mainId].push(data);
        state.status = "Child service created";
      })

      .addCase(updateChildService.fulfilled, (state, action) => {
        const { mainId, data } = action.payload;
        state.child[mainId] = state.child[mainId].map((item) =>
          item.id === data.id ? data : item
        );
        state.status = "Child service updated";
      })

      .addCase(deleteChildService.fulfilled, (state, action) => {
        const { mainId, childId } = action.payload;
        state.child[mainId] = state.child[mainId].filter(
          (c) => c.id !== childId
        );
        state.status = "Child service deleted";
      });
  },
});

export const { clearServiceStatus } = serviceSlice.actions;
export default serviceSlice.reducer;


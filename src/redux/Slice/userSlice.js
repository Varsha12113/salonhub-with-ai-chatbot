// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../config/httphandler";

// // ======================================================================
// // 📌 GET GENDERS  —  GET /user/genders/
// // ======================================================================
// export const fetchGenders = createAsyncThunk(
//   "userServices/fetchGenders",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("/api/services/user/genders/");
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // ======================================================================
// // 📌 GET MAIN SERVICES BY GENDER — GET /user/main/?gender_id=2
// // ======================================================================
// export const fetchMainServices = createAsyncThunk(
//   "userServices/fetchMainServices",
//   async (genderId) => {
//     const res = await api.get(`/api/services/user/main/?gender_id=${genderId}`);
//     return { genderId, data: res.data };
//   }
// );


// // ======================================================================
// // 📌 GET CHILD SERVICES UNDER MAIN — GET /user/main/<id>/child/
// // ======================================================================
// export const fetchChildServices = createAsyncThunk(
//   "userServices/fetchChildServices",
//   async (mainServiceId, thunkAPI) => {
//     try {
//       const res = await api.get(`/api/services/user/main/${mainServiceId}/child/`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // ======================================================================
// // 📌 GET SINGLE CHILD SERVICE DETAILS — GET /user/child/<id>/
// // ======================================================================
// export const fetchSingleChildService = createAsyncThunk(
//   "userServices/fetchSingleChildService",
//   async (childId, thunkAPI) => {
//     try {
//       const res = await api.get(`/services/user/child/${childId}/`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // ======================================================================
// // 📌 SLICE
// // ======================================================================

// const userServiceSlice = createSlice({
//   name: "userServices",
//   initialState: {
//     genders: [],
//     mainServices: [],
//     childServices: [],
//     singleChild: null,

//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       // =============================================================
//       // 🔹 GENDERS
//       // =============================================================
//       .addCase(fetchGenders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchGenders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.genders = action.payload;
//       })
//       .addCase(fetchGenders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // =============================================================
//       // 🔹 MAIN SERVICES
//       // =============================================================
//       .addCase(fetchMainServices.pending, (state) => {
//         state.loading = true;
//       })
//        .addCase(fetchMainServices.fulfilled, (state, action) => {
//       const { genderId, data } = action.payload;
//       state.mainServices[genderId] = data; // <-- SAVE BY GENDER ID
//     })
//       .addCase(fetchMainServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // =============================================================
//       // 🔹 CHILD SERVICES (BY MAIN)
//       // =============================================================
//       .addCase(fetchChildServices.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchChildServices.fulfilled, (state, action) => {
//         state.loading = false;
//         state.childServices = action.payload;
//       })
//       .addCase(fetchChildServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // =============================================================
//       // 🔹 SINGLE CHILD SERVICE DETAILS
//       // =============================================================
//       .addCase(fetchSingleChildService.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchSingleChildService.fulfilled, (state, action) => {
//         state.loading = false;
//         state.singleChild = action.payload;
//       })
//       .addCase(fetchSingleChildService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default userServiceSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/httphandler";

// ======================================================================
// 📌 GET GENDER LIST
// ======================================================================
export const fetchGenders = createAsyncThunk(
  "userServices/fetchGenders",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/services/user/genders/");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================================================================
// 📌 GET MAIN SERVICES BY GENDER
// ======================================================================
export const fetchMainServices = createAsyncThunk(
  "userServices/fetchMainServices",
  async (genderId, thunkAPI) => {
    try {
      const res = await api.get(`/api/services/user/main/?gender_id=${genderId}`);
      return { genderId, data: res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================================================================
// 📌 GET CHILD SERVICES UNDER MAIN
// ======================================================================
export const fetchChildServices = createAsyncThunk(
  "userServices/fetchChildServices",
  async (mainServiceId, thunkAPI) => {
    try {
      const res = await api.get(`/api/services/user/main/${mainServiceId}/child/`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================================================================
// 📌 GET SINGLE CHILD SERVICE
// ======================================================================
export const fetchSingleChildService = createAsyncThunk(
  "userServices/fetchSingleChildService",
  async (childId, thunkAPI) => {
    try {
      const res = await api.get(`/api/services/user/child/${childId}/`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ======================================================================
// 📌 SLICE
// ======================================================================

const userServiceSlice = createSlice({
  name: "userServices",
  initialState: {
    genders: [],
    mainServices: {},      // <---- FIXED
    childServices: [],
    singleChild: null,

    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // =============================================================
      // 🔹 GENDERS
      // =============================================================
      .addCase(fetchGenders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.loading = false;
        state.genders = action.payload;
      })
      .addCase(fetchGenders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================================================
      // 🔹 MAIN SERVICES
      // =============================================================
      .addCase(fetchMainServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMainServices.fulfilled, (state, action) => {
        state.loading = false;                         // <--- FIXED
        const { genderId, data } = action.payload;
        state.mainServices[genderId] = data;           // <--- stored correctly
      })
      .addCase(fetchMainServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================================================
      // 🔹 CHILD SERVICES
      // =============================================================
      .addCase(fetchChildServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChildServices.fulfilled, (state, action) => {
        state.loading = false;
        state.childServices = action.payload;
      })
      .addCase(fetchChildServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================================================
      // 🔹 SINGLE CHILD
      // =============================================================
      .addCase(fetchSingleChildService.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleChildService.fulfilled, (state, action) => {
        state.loading = false;
        state.singleChild = action.payload;
      })
      .addCase(fetchSingleChildService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userServiceSlice.reducer;

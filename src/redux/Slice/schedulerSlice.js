import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/httphandler"; 

// ======================================================================
// 📌 SLOT MASTER — CREATE (POST)
// ======================================================================
export const createSlotMaster = createAsyncThunk(
  "scheduler/createSlotMaster",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/scheduler/slotmasters/", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

// ======================================================================
// 📌 SLOT MASTER — GET ALL (GET)
// ======================================================================
export const getSlotMasters = createAsyncThunk(
  "scheduler/getSlotMasters",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/scheduler/slotmasters/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Unable to fetch slot masters");
    }
  }
);

// ======================================================================
// 📌 WORKING DAYS — GET (GET)
// ======================================================================
export const getWorkingDays = createAsyncThunk(
  "scheduler/getWorkingDays",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/scheduler/workingdays/");
      return res.data; // should return list of 7 items
    } catch (err) {
      return rejectWithValue(err.response?.data || "Unable to fetch working days");
    }
  }
);

// ======================================================================
// 📌 WORKING DAYS — UPDATE (PATCH)
// ======================================================================
export const updateWorkingDay = createAsyncThunk(
  "scheduler/updateWorkingDay",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/api/scheduler/workingdays/${id}/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// CREATE Working Day
// ===============================
export const createWorkingDay = createAsyncThunk(
  "scheduler/createWorkingDay",
  async ({ weekday, is_working }, { rejectWithValue }) => {
    try {
      const res = await api.post("api/scheduler/workingdays/", {
        weekday,
        is_working,
      });
      return res.data; // return the created day object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// =====================================================
//1️⃣ GET Holidays
// =====================================================
export const getHolidays = createAsyncThunk(
  "holidays/getHolidays",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/scheduler/holidays/");
      return res.data.results || res.data;  // <-- Always return array
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load holidays");
    }
  }
);

// =====================================================
// 2️⃣ ADD Holiday (date → holiday_date, description → reason)
// =====================================================
export const addHoliday = createAsyncThunk(
  "holidays/addHoliday",
  async (payload, { rejectWithValue }) => {
    try {
      const newPayload = {
        holiday_date: payload.date,      // MAPPING
        reason: payload.description,     // MAPPING
      };

      const res = await api.post("/api/scheduler/holidays/", newPayload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create holiday");
    }
  }
);


// =====================================================
// 3️⃣ DELETE Holiday
// =====================================================
export const deleteHoliday = createAsyncThunk(
  "holidays/deleteHoliday",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/scheduler/holidays/${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete holiday");
    }
  }
);

// Fetch available dates (returns { available_dates: [...] })
export const fetchAvailableDates = createAsyncThunk(
  "dailySlots/fetchAvailableDates",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/scheduler/available-dates/");
      // safe-read
      return res.data?.available_dates ?? [];
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load available dates");
    }
  }
);

export const fetchSlotsByDate = createAsyncThunk(
  "dailySlots/fetchSlotsByDate",
  async (date, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/scheduler/slots/", { params: { date } });
      const slots = res.data?.results ?? []; // ✅ always array
      return { date, slots };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load slots");
    }
  }
);




// ======================================================================
// 📌 MAIN SLICE (ALL in ONE FILE)
// ======================================================================
const schedulerSlice = createSlice({
  name: "scheduler",
  initialState: {
    slotMasters: [],
    workingDays: [],
    holidays: [],
    availableDates: [],
     slotsByDate: [], 
    selectedDate: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ============================================================
      // SLOT MASTER — CREATE
      // ============================================================
      .addCase(createSlotMaster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSlotMaster.fulfilled, (state, action) => {
        state.loading = false;
        state.slotMasters.push(action.payload);
      })
      .addCase(createSlotMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ============================================================
      // SLOT MASTER — GET ALL
      // ============================================================
      .addCase(getSlotMasters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSlotMasters.fulfilled, (state, action) => {
        state.loading = false;
        state.slotMasters = action.payload?.results ?? [];
      })
      .addCase(getSlotMasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ============================================================
      // WORKING DAYS — GET
      // ============================================================
     .addCase(getWorkingDays.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkingDays.fulfilled, (state, action) => {
                state.loading = false;
                  const data = action.payload;
                state.workingDays = Array.isArray(data)
                  ? data
                  : Array.isArray(data.results)
                  ? data.results
                  : [];
              })
      .addCase(getWorkingDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE DAY ------------------------------------
      .addCase(updateWorkingDay.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.workingDays.findIndex((d) => d.id === updated.id);
        if (index !== -1) {
          state.workingDays[index] = updated; // Replace updated day
        }
      })

      .addCase(updateWorkingDay.rejected, (state, action) => {
        state.error = action.payload;
      })

      // CREATE Working Day
      builder.addCase(createWorkingDay.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(createWorkingDay.fulfilled, (state, action) => {
        state.loading = false;
        state.workingDays.push(action.payload); // add the new day to the state
      })
      builder.addCase(createWorkingDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
  })

// GET ------------------------------------
      .addCase(getHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHolidays.fulfilled, (state, action) => {
  state.loading = false;
  state.holidays = action.payload.results || action.payload || [];// Accept both paginated & non-paginated
})
      .addCase(getHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD ------------------------------------
      .addCase(addHoliday.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHoliday.fulfilled, (state, action) => {
        state.loading = false;
        state.holidays.push(action.payload);
      })
      .addCase(addHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE ------------------------------------
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        state.holidays = state.holidays.filter(
          (h) => h.id !== action.payload
        );
      })

      // ===============================
// AVAILABLE DATES
// ===============================
.addCase(fetchAvailableDates.pending, (state) => {
  state.loading = true;
})
.addCase(fetchAvailableDates.fulfilled, (state, action) => {
  state.loading = false;
  state.availableDates = action.payload; // array of dates
})
.addCase(fetchAvailableDates.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


// ===============================
// SLOTS BY DATE
// ===============================
.addCase(fetchSlotsByDate.pending, (state) => {
  state.loading = true;
})

.addCase(fetchSlotsByDate.fulfilled, (state, action) => {
  state.loading = false;
  state.selectedDate = action.payload.date;
  state.slotsByDate = action.payload.slots; // list of slots
})
.addCase(fetchSlotsByDate.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});


 
export default schedulerSlice.reducer;

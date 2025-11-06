import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../config/httphandler";

// ✅ Fetch gender list
export const fetchGenders = createAsyncThunk(
  "gender/fetchGenders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getData("gender");
      // Normalize common response shapes
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.data)) return res.data;
      if (res && Array.isArray(res.results)) return res.results;
      if (res && typeof res === 'object') {
        const arr = Object.values(res).find((v) => Array.isArray(v));
        if (arr) return arr;
      }
      return [];
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//  ✅ Add a new gender
// export const addGender = createAsyncThunk(
//   "gender/addGender",
//   async (newGender, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/gender/", { gender: newGender });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

const genderSlice = createSlice({
  name: "gender",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchGenders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // .addCase(addGender.fulfilled, (state, action) => {
      //   state.list.push(action.payload);
      // });
  },
});

export default genderSlice.reducer;

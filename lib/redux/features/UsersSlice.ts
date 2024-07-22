import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
    id?: string;
    name?: string;
    email?: string;
  // Add other user properties as needed
}

// Define the initial state using that type
const initialState: UserState= {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state = action.payload;
    },
    clearUser(state) {
      state = {};
    },
  },
});

// Export the action creators
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;


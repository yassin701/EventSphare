import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("cart"));
    return {
      items: Array.isArray(data?.items) ? data.items : [],
      isOpen: data?.isOpen ?? false,
    };
  } catch {
    return {
      items: [],
      isOpen: false,
    };
  }
};

const initialState = loadCartFromStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        existing.quantity += 1; 
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    openCart: (state) => { state.isOpen = true; },
    closeCart: (state) => { state.isOpen = false; },
    toggleCart: (state) => { state.isOpen = !state.isOpen; },
  }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, openCart, closeCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;

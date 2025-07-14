import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Carrito inicial vacío
  },
  reducers: {
    // Agrega un producto al carrito
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Elimina un producto del carrito según su nombre
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // Actualiza la cantidad de un producto específico
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Exportar acciones para usarlas en otros componentes
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Exportar el reductor para integrarlo en el store
export default CartSlice.reducer;

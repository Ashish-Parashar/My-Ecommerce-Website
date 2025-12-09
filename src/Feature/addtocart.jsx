import { createSlice } from "@reduxjs/toolkit";

const storedItems = localStorage.getItem("cartItems");
const initialState = {
    items: storedItems ? JSON.parse(storedItems) : [],
};

const saveToLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
};

export const addtocartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const newItem = action.payload;
            const ExistingItem = state.items.find((item) => item._id === newItem._id)
            if (ExistingItem) {
                ExistingItem.quantity += 1;
            }
            else {
                state.items.push({ ...newItem, quantity: 1 })
            }
            console.log(newItem)
            saveToLocalStorage(state.items);

        },

        increaseQuantity: (state, action) => {
            const id = action.payload;
            const ExistingItem = state.items.find((item) => item._id === id)
            if (ExistingItem) {
                ExistingItem.quantity += 1;
            }
            console.log(ExistingItem.quantity)
            saveToLocalStorage(state.items);

        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const ExistingItem = state.items.find((item) => item._id === id)
            if (ExistingItem && ExistingItem.quantity > 1) {
                ExistingItem.quantity -= 1;
            }
            else {
                state.items = state.items.filter((item) => item._id !== id)
            }
            console.log(ExistingItem.quantity)
            saveToLocalStorage(state.items);
        },
         totalAmount: (state) => {
            state.totalAmount = state.items.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0);
        },

    }
})

export const { addtoCart, increaseQuantity, decreaseQuantity,totalAmount } = addtocartSlice.actions
export default addtocartSlice.reducer
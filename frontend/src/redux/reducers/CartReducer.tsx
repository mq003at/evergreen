// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { Cart } from "../../types/models";
// import { CartState } from "../../types/reducers";
// import { axiosInstance } from "../sharedInstances";
// import { AxiosResponse, AxiosError } from "axios";
// import { reqHeaders } from "../sharedReducerFunctions";

// const initialState: CartState = {
//   dataArray: [],
//   error: null,
// };

// export const fetchAllCarts = createAsyncThunk("fetchAllCarts", async () => {
//   try {
//     const res: AxiosResponse<Cart[] | AxiosError<string>, any> =
//       await axiosInstance.get("carts");
//     return res.data;
//   } catch (e) {
//     const error = e as AxiosError<string>;
//     return error;
//   }
// });

// export const addCart = createAsyncThunk(
//   "addCart",
//   async ({ addedCart, token }: { addedCart: Cart; token: string }) => {
//     try {
//       const res: AxiosResponse<Cart | AxiosError<string>, any> =
//         await axiosInstance.post(
//           "carts",
//           { name: addedCart.name, bio: addedCart.bio },
//           { headers: reqHeaders(token) },
//         );
//       return res.data;
//     } catch (e) {
//       const error = e as AxiosError<string>;
//       return error;
//     }
//   },
// );

// export const updateCart = createAsyncThunk(
//   "updateCart",
//   async ({
//     id,
//     updatedCart,
//     tokenString,
//   }: {
//     id: string;
//     updatedCart: Partial<Cart>;
//     tokenString: string;
//   }) => {
//     try {
//       const res: AxiosResponse<Cart | AxiosError<string>, any> =
//         await axiosInstance.put(`carts/${id}`, updatedCart, {
//           headers: reqHeaders(tokenString),
//         });
//       return res.data;
//     } catch (e) {
//       const error = e as AxiosError<string>;
//       return error;
//     }
//   },
// );

// export const deleteCart = createAsyncThunk(
//   "deleteCart",
//   async ({ id, token }: { id: number; token: string }) => {
//     try {
//       const res: AxiosResponse<
//         { message: string; id: number } | AxiosError<string>,
//         any
//       > = await axiosInstance.delete(`carts/${id}`, {
//         headers: reqHeaders(token),
//       });
//       return res.data;
//     } catch (e) {
//       const error = e as AxiosError<string>;
//       return error;
//     }
//   },
// );

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {},
//     extraReducers: (build) => {
//       build
//         .addCase(fetchAllCarts.fulfilled, (state, action) => {
//           if (!(action.payload instanceof AxiosError)) {
//             state.dataArray = action.payload;
//           }
//         })
//         .addCase(addCart.fulfilled, (state, action) => {
//           if (!(action.payload instanceof AxiosError)) {
//             state.dataArray.push(action.payload);
//             successToast("Cart added successfully");
//           } else errorToast(action.payload.message);
//         })
//         .addCase(updateCart.fulfilled, (state, action) => {
//           if (!(action.payload instanceof AxiosError)) {
//             const data: Cart = action.payload;
//             state.dataArray.map((cart) => (cart.id === data.id ? data : cart));
//             successToast("Cart updated successfully");
//           } else {
//             errorToast(action.payload.message);
//           }
//         })
//         .addCase(deleteCart.fulfilled, (state, action) => {
//           if (!(action.payload instanceof AxiosError)) {
//             const id = action.payload.id;
//             state.dataArray = state.dataArray.filter((cart) => cart.id !== id);
//             successToast(action.payload.message);
//           } else {
//             errorToast(action.payload.message)
//           }
//         });
//     },
//   });
  
//   export const cartReducer = cartSlice.reducer;
export default {}
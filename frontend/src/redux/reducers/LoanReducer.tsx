// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { Loan } from "../../types/models";
// import { LoanState } from "../../types/reducers";
// import { axiosInstance } from "../sharedInstances";
// import { AxiosResponse, AxiosError } from "axios";
// import { errorToast, reqHeaders } from "../sharedReducerFunctions";

// const initialState: LoanState = {
//   dataArray: [],
//   error: null,
// };

// export const fetchAllLoans = createAsyncThunk("fetchAllLoans", async () => {
//   try {
//     const res: AxiosResponse<Loan[] | AxiosError<string>, any> =
//       await axiosInstance.get("loans");
//     return res.data;
//   } catch (e) {
//     const error = e as AxiosError<string>;
//     return error;
//   }
// });

// export const addLoan = createAsyncThunk(
//   "addLoan",
//   async ({ addedLoan, token }: { addedLoan: Loan; token: string }) => {
//     try {
//       const res: AxiosResponse<Loan | AxiosError<string>, any> =
//         await axiosInstance.post(
//           "loans",
//           { name: addedLoan.name, bio: addedLoan.bio },
//           { headers: reqHeaders(token) },
//         );
//       return res.data;
//     } catch (e) {
//       const error = e as AxiosError<string>;
//       return error;
//     }
//   },
// );

// export const updateLoan = createAsyncThunk(
//   "updateLoan",
//   async ({
//     id,
//     updatedLoan,
//     tokenString,
//   }: {
//     id: string;
//     updatedLoan: Partial<Loan>;
//     tokenString: string;
//   }) => {
//     try {
//       const res: AxiosResponse<Loan | AxiosError<string>, any> =
//         await axiosInstance.put(`loans/${id}`, updatedLoan, {
//           headers: reqHeaders(tokenString),
//         });
//       return res.data;
//     } catch (e) {
//       const error = e as AxiosError<string>;
//       return error;
//     }
//   },
// );

// export const deleteLoan = createAsyncThunk(
//   "deleteLoan",
//   async ({ id, token }: { id: string; token: string }) => {
//     try {
//       const res: AxiosResponse<
//         { message: string; id: string } | AxiosError<string>,
//         any
//       > = await axiosInstance.delete(`loans/${id}`, {
//         headers: reqHeaders(token),
//       });
//       return res.data;
//     } catch (e) {
//       const error = e as AxiosError<string>;
//       return error;
//     }
//   },
// );

// const loanSlice = createSlice({
//     name: "loan",
//     initialState,
//     reducers: {},
//     extraReducers: (build) => {
//       build
//         .addCase(fetchAllLoans.fulfilled, (state, action) => {
//           if (!(action.payload instanceof AxiosError)) {
//             state.dataArray = action.payload;
//           }
//         })
//         .addCase(addLoan.fulfilled, (state, action) => {
//           if (!(action.payload instanceof AxiosError)) {
//             state.dataArray.push(action.payload);
//             successToast("Loan added successfully");
//           } else errorToast(action.payload.message);
//         })
//         .addCase(updateLoan.fulfilled, (state, action) => {
//           if (!(action.payload instanceof AxiosError)) {
//             const data: Loan = action.payload;
//             state.dataArray.map((loan) => (loan.id === data.id ? data : loan));
//             successToast("Loan updated successfully");
//           } else {
//             errorToast(action.payload.message);
//           }
//         })
//         .addCase(deleteLoan.fulfilled, (state, action) => {
//           if (!(action.payload instanceof AxiosError)) {
//             const id = action.payload.id;
//             state.dataArray = state.dataArray.filter((loan) => loan.id !== id);
//             successToast(action.payload.message);
//           } else {
//             errorToast(action.payload.message)
//           }
//         });
//     },
//   });
  
//   export const loanReducer = loanSlice.reducer;
// function successToast(message: string) {
//     throw new Error("Function not implemented.");
// }

export default {}
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/models";
import { CategoryState } from "../../types/reducers";
import { axiosInstance } from "../sharedInstances";
import { AxiosResponse, AxiosError } from "axios";
import { errorToast, reqHeaders, successToast } from "../sharedReducerFunctions";

const initialState: CategoryState = {
  dataArray: [],
  error: null,
};

export const fetchAllCategories = createAsyncThunk("fetchAllCategories", async () => {
  try {
    const res: AxiosResponse<Category[] | AxiosError<string>, any> =
      await axiosInstance.get("categories");
    return res.data;
  } catch (e) {
    const error = e as AxiosError<string>;
    return error;
  }
});

export const addCategory = createAsyncThunk(
  "addCategory",
  async ({ addedCategory, token }: { addedCategory: Category; token: string }) => {
    try {
      const res: AxiosResponse<Category | AxiosError<string>, any> =
        await axiosInstance.post(
          "categories",
          { name: addedCategory.name, description: addedCategory.description },
          { headers: reqHeaders(token) },
        );
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async ({
    id,
    updatedCategory,
    tokenString,
  }: {
    id: string;
    updatedCategory: Partial<Category>;
    tokenString: string;
  }) => {
    try {
      const res: AxiosResponse<Category | AxiosError<string>, any> =
        await axiosInstance.put(`categories/${id}`, updatedCategory, {
          headers: reqHeaders(tokenString),
        });
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async ({ id, token }: { id: string; token: string }) => {
    try {
      const res: AxiosResponse<
        { message: string; id: string } | AxiosError<string>,
        any
      > = await axiosInstance.delete(`categories/${id}`, {
        headers: reqHeaders(token),
      });
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (build) => {
      build
        .addCase(fetchAllCategories.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            state.dataArray = action.payload;
          }
        })
        .addCase(addCategory.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            state.dataArray.push(action.payload);
            successToast("Category added successfully");
          } else errorToast(action.payload.message);
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            const data: Category = action.payload;
            state.dataArray.map((category) => (category.id === data.id ? data : category));
            successToast("Category updated successfully");
          } else {
            errorToast(action.payload.message);
          }
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            const id = action.payload.id;
            state.dataArray = state.dataArray.filter((category) => category.id !== id);
            successToast(action.payload.message);
          } else {
            errorToast(action.payload.message)
          }
        });
    },
  });
  
  export const categoryReducer = categorySlice.reducer;

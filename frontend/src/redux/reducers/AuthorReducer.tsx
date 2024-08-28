import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Author } from "../../types/models";
import { AuthorState } from "../../types/reducers";
import { axiosInstance } from "../sharedInstances";
import { AxiosResponse, AxiosError } from "axios";
import { errorToast, reqHeaders, successToast } from "../sharedReducerFunctions";

const initialState: AuthorState = {
  dataArray: [],
  error: null,
};

export const fetchAllAuthors = createAsyncThunk("fetchAllAuthors", async () => {
  try {
    const res: AxiosResponse<Author[] | AxiosError<string>, any> =
      await axiosInstance.get("authors");
    return res.data;
  } catch (e) {
    const error = e as AxiosError<string>;
    return error;
  }
});

export const addAuthor = createAsyncThunk(
  "addAuthor",
  async ({ addedAuthor, token }: { addedAuthor: Author; token: string }) => {
    try {
      const res: AxiosResponse<Author | AxiosError<string>, any> =
        await axiosInstance.post(
          "authors",
          { name: addedAuthor.name, bio: addedAuthor.bio },
          { headers: reqHeaders(token) },
        );
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

export const updateAuthor = createAsyncThunk(
  "updateAuthor",
  async ({
    id,
    updatedAuthor,
    tokenString,
  }: {
    id: string;
    updatedAuthor: Partial<Author>;
    tokenString: string;
  }) => {
    try {
      const res: AxiosResponse<Author | AxiosError<string>, any> =
        await axiosInstance.put(`authors/${id}`, updatedAuthor, {
          headers: reqHeaders(tokenString),
        });
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

export const deleteAuthor = createAsyncThunk(
  "deleteAuthor",
  async ({ id, token }: { id: number; token: string }) => {
    try {
      const res: AxiosResponse<
        { message: string; id: string } | AxiosError<string>,
        any
      > = await axiosInstance.delete(`authors/${id}`, {
        headers: reqHeaders(token),
      });
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {},
    extraReducers: (build) => {
      build
        .addCase(fetchAllAuthors.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            state.dataArray = action.payload;
          }
        })
        .addCase(addAuthor.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            state.dataArray.push(action.payload);
            successToast("Author added successfully");
          } else errorToast(action.payload.message);
        })
        .addCase(updateAuthor.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            const data: Author = action.payload;
            state.dataArray.map((author) => (author.id === data.id ? data : author));
            successToast("Author updated successfully");
          } else {
            errorToast(action.payload.message);
          }
        })
        .addCase(deleteAuthor.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            const id = action.payload.id;
            state.dataArray = state.dataArray.filter((author) => author.id !== id);
            successToast(action.payload.message);
          } else {
            errorToast(action.payload.message)
          }
        });
    },
  });
  
  export const authorReducer = authorSlice.reducer;

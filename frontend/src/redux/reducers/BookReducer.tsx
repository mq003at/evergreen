import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddedBook, Book } from "../../types/models";
import { BookState } from "../../types/reducers";
import { axiosInstance } from "../sharedInstances";
import { AxiosResponse, AxiosError } from "axios";
import { errorToast, reqHeaders, successToast } from "../sharedReducerFunctions";

const initialState: BookState = {
  dataArray: [],
  error: null,
};

export const fetchAllBooks = createAsyncThunk("fetchAllBooks", async () => {
  try {
    const res: AxiosResponse<Book[] | AxiosError<string>, any> =
      await axiosInstance.get("books");
    return res.data;
  } catch (e) {
    const error = e as AxiosError<string>;
    return error;
  }
});

export const addBook = createAsyncThunk(
  "addBook",
  async ({ addedBook, token }: { addedBook: AddedBook; token: string }) => {
    try {
      const res: AxiosResponse<Book | AxiosError<string>, any> =
        await axiosInstance.post(
          "books",
          { title: addedBook.title, 
            author: addedBook.author,
            "category":  "66b7731981aec3f77fb1aff4",
            "publishedDate": "2024-08-10T14:02:38.471Z",
            "price": 1.5
        },
          { headers: reqHeaders(token) },
        );
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

export const updateBook = createAsyncThunk(
  "updateBook",
  async ({
    id,
    updatedBook,
    tokenString,
  }: {
    id: string;
    updatedBook: Partial<Book>;
    tokenString: string;
  }) => {
    try {
      const res: AxiosResponse<Book | AxiosError<string>, any> =
        await axiosInstance.put(`books/${id}`, updatedBook, {
          headers: reqHeaders(tokenString),
        });
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

export const deleteBook = createAsyncThunk(
  "deleteBook",
  async ({ id, token }: { id: string; token: string }) => {
    try {
      const res: AxiosResponse<
        { message: string; id: string } | AxiosError<string>,
        any
      > = await axiosInstance.delete(`books/${id}`, {
        headers: reqHeaders(token),
      });
      return res.data;
    } catch (e) {
      const error = e as AxiosError<string>;
      return error;
    }
  },
);

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (build) => {
      build
        .addCase(fetchAllBooks.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            state.dataArray = action.payload;
          }
        })
        .addCase(addBook.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            state.dataArray.push(action.payload);
            successToast("Book added successfully");
          } else errorToast(action.payload.message);
        })
        .addCase(updateBook.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            const data: Book = action.payload;
            state.dataArray.map((book) => (book.id === data.id ? data : book));
            successToast("Book updated successfully");
          } else {
            errorToast(action.payload.message);
          }
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
          if (!(action.payload instanceof AxiosError)) {
            const id = action.payload.id;
            state.dataArray = state.dataArray.filter((book) => book.id !== id);
            successToast(action.payload.message);
          } else {
            errorToast(action.payload.message)
          }
        });
    },
  });
  
  export const bookReducer = bookSlice.reducer;

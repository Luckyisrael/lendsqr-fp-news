import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../types';
import { fetchNews } from 'services/api';

interface NewsState {
  articles: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  status: 'idle',
  error: null,
};

export const fetchNewsAsync = createAsyncThunk<
  Article[],
  void,
  { rejectValue: string }
>('news/fetchNews', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchNews();
    return response.articles;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsAsync.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.status = 'succeeded';
        state.articles = action.payload;
        state.error = null;
      })
      .addCase(fetchNewsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error occurred';
      });
  },
});

export default newsSlice.reducer;
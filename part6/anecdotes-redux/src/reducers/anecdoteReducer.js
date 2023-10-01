import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotes = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    increaseVoteOf(state, action) {
      return state.map((anecdote) => {
        if (anecdote.id === action.payload.id) {
          return action.payload;
        } else {
          return anecdote;
        }
      });
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, increaseVoteOf, setAnecdotes } =
  anecdotes.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateAnecdote = (id, anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote);
    dispatch(increaseVoteOf(updatedAnecdote));
  };
};

export default anecdotes.reducer;

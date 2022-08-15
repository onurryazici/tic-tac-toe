import { createSlice } from '@reduxjs/toolkit';

export const Players = {
    empty   : "-",
    playerO : "O",
    playerX : "X"
}
export const WinnerState = {
    NotSpecified:-1,
    PlayerOWin:0,
    PlayerXWin:1,
    Tied:2
}
const initialState = {
  matrix: new Array(3).fill("-").map(()=> new Array(3).fill("-")),
  turn: Players.playerO,
  winnerState: WinnerState.NotSpecified
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    FILL_CELL: (state,action) => {
        const row = action.payload.row;
        const col = action.payload.col;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    SET_WINNER: (state,action) => {

    },
    SET_MESSAGE: (state,action) => {

    }
  }
});

export const { FILL_CELL, SET_WINNER, SET_MESSAGE } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const SELECT_TURN = (state) => state.game.turn;
export const SELECT_WINNER_STATE = (state) => state.game.winnerState;

export default gameSlice.reducer;

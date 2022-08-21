import { createSlice } from '@reduxjs/toolkit';

export const Players = {
    empty   : "-",
    playerO : "O",
    playerX : "X"
}
export const WinnerState = {
    NotSpecified : -1,
    PlayerOWin   : 0,
    PlayerXWin   : 1,
    Draw         : 2
}
const initialState = {
  matrix  : new Array(3).fill("-").map( () => new Array(3).fill("-")),
  turn    : Players.playerO,
  winner  : WinnerState.NotSpecified,
};

export const gameSlice = createSlice({
  name : 'game',
  initialState,
  reducers: {
    FILL_CELL: (state,action) => {
        const row = action.payload.row;
        const col = action.payload.col;
        const matrix = state.matrix;
        
        state.matrix[row][col] = state.turn
        var rowResult = matrix[row][0] + matrix[row][1] + matrix[row][2]
        var colResult = matrix[0][col] + matrix[1][col] + matrix[2][col]
        
        //const emptycells = matrix.filter((row,i)=> { return row[i]===Players.empty} ).length
		const emptycells = matrix.findIndex((row,index)=> {
			return row.includes("-")
		})

        state.empty  = emptycells
		if (rowResult === "OOO" || colResult === "OOO")
          state.winner = WinnerState.PlayerOWin
        else if (rowResult === "XXX" || colResult === "XXX") 
          state.winner = WinnerState.PlayerXWin 
        else if (emptycells===-1) 
          state.winner = WinnerState.Draw 
        
        if(state.turn === Players.playerO)
          state.turn = Players.playerX
        else if(state.turn === Players.playerX)
          state.turn = Players.playerO
        
    },
    SET_TURN: (state,action) => {
      state.turn = action.payload
    },
	RESET_GAME: (state) => {
		state.matrix = new Array(3).fill("-").map( () => new Array(3).fill("-"))
		state.turn = Players.playerO
		state.winner = WinnerState.NotSpecified
	}
  }
});

export const { FILL_CELL, SET_WINNER, SET_TURN, RESET_GAME} = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const SELECT_TURN    = (state) => state.game.turn;
export const SELECT_WINNER  = (state) => state.game.winner;
export const SELECT_MATRIX  = (state) => state.game.matrix;
export default gameSlice.reducer;

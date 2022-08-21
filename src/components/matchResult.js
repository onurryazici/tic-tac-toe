import React, { useEffect, useState } from "react"
import { Alert } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { SELECT_MESSAGE, SELECT_WINNER, WinnerState, RESET_GAME } from "../features/game/gameSlice"

export default function MatchResult(props){
    const winner = useSelector(SELECT_WINNER)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        if(winner===WinnerState.PlayerOWin){
            setMessage("Player O Won!")
          } else if(winner === WinnerState.PlayerXWin){
            setMessage("Player X Won!")
          } else if(winner === WinnerState.Draw) {
            setMessage("Match ended in a draw")
          } else {
            setMessage("")
          }
    }, [dispatch,winner])
      
	function restartGame(){
		dispatch(RESET_GAME())
	}
    return(
        message !== "" ?
        <Alert key={"primary"} variant={"danger"} className="custom-alert">
			{ message } <Alert.Link href="#" onClick={()=>restartGame()}>Restart</Alert.Link>. 
		</Alert>
        : ""
    )
}
import React, { useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaDotCircle, FaTimes } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SELECT_TURN, Players } from '../features/game/gameSlice';
import { useSelector } from 'react-redux';

export default function PlayersView(){
	const turn = useSelector(SELECT_TURN)
	useEffect(() => {
	  if(turn===Players.playerO){
		document.getElementById("playerOButton").classList.add("player-turn")
		document.getElementById("playerXButton").classList.remove("player-turn")
	  } else {
		document.getElementById("playerXButton").classList.add("player-turn")
		document.getElementById("playerOButton").classList.remove("player-turn")
	  }
	}, [turn])
	
    return (
        <ButtonGroup aria-label="Players">
				<Button id="playerOButton" >
					<FaDotCircle color="#0066cc"/><span className="txt">Player O</span>
				</Button>
				<Button id="playerXButton" >
					<FaTimes color="#e00303"/><span className="txt">Player X</span>
				</Button>
		</ButtonGroup>
    )
}
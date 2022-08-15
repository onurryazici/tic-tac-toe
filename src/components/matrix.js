import React, { useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { FaDotCircle, FaTimes } from "react-icons/fa";
import MatchResult from "./matchResult";

import { useSelector, useDispatch } from 'react-redux';
import {
  SELECT_TURN,
  Players,
  SELECT_WINNER_STATE,
  SET_WINNER,
  SET_MESSAGE,
  WinnerState
} from '../features/game/gameSlice'

export default function Matrix(){
    const dispatch = useDispatch();
    
	const PlayerO = <FaDotCircle color="#0066cc" fontSize={100} onClick={(e)=>e.stopPropagation()}/>
	const PlayerX = <FaTimes color="#e00303" fontSize={100} onClick={(e)=>e.stopPropagation()}/>
	const [playersTurn, setPlayersTurn] = useState(Players.playerO);
	const [matrix, setMatrix]  = useState(new Array(3).fill("-").map(()=> new Array(3).fill("-"))) // This will create 3x3 matrix
	const [winner, setWinner] = useState(WinnerState.NotSpecified)
	const [message, setMessage] = useState("")


	function checkWinner(row,col){
		var rowResult = matrix[row][0] + matrix[row][1] + matrix[row][2]
		var colResult = matrix[0][col] + matrix[1][col] + matrix[2][col]
		if (rowResult === "OOO" || colResult === "OOO"){
			setMessage("Player 0 Won!")
			setWinner(WinnerState.PlayerOWin)
		}
		else if (rowResult === "XXX" || colResult === "XXX") {
			setMessage("Player X Won!") 
			setWinner(WinnerState.PlayerXWin)
		}
			
		const emptycells = matrix.filter((row,i)=> row[i]===Players.empty ).length
		//alert(emptycells)
		//var hasEmptyCells = matrix.find((row)=> {  return row[0]===Players.empty ||  row[1]===Players.empty ||  row[2]===Players.empty})
		if(emptycells===0) {
			console.log(matrix)
			setMessage("Match ended in a draw")
			setWinner(WinnerState.Tied)
		}
	}

	function onCellClick(event) {
		const row = event.target.dataset.row;
		const col = event.target.dataset.col;

		if(matrix[row][col] === Players.empty && winner === WinnerState.NotSpecified){
			matrix[row][col] = playersTurn
			if(playersTurn === Players.playerO){
				document.getElementById("container").classList.add("playerX-turn");
				document.getElementById("container").classList.remove("playerO-turn")
				setPlayersTurn(Players.playerX)
			} else {
				document.getElementById("container").classList.add("playerO-turn");
				document.getElementById("container").classList.remove("playerX-turn")
				setPlayersTurn(Players.playerO)
			}
			checkWinner(row,col);

		}
		
	}


    return(
		<>
        <Container style={{maxWidth:'500px', maxHeight:'500px', background:'#222222'}} >
				<Row className="justify-content-md-center mt-5">
					<Table className='a disable-text-select' id="xoxtable" >
						<tbody>{
							matrix.map((row,rowIndex) => {
								return (
									<tr key={rowIndex}> {
										Array.from(row).map((subitems, colIndex) => {
											return (
												<td
													key={colIndex} 
													className='table-cells' 
													data-row={rowIndex} 
													data-col={colIndex} 
													data-value={"-"} onClick={(event)=>onCellClick(event)}>
													{
														matrix[rowIndex][colIndex] === Players.playerO ? PlayerO :
														matrix[rowIndex][colIndex] === Players.playerX ? PlayerX : ""
													}
												</td>
											)
										})
									} </tr>
								)
							})
						}</tbody>
					</Table>
				</Row>
			</Container>
			<MatchResult message={message}/>
		</>
    )
}
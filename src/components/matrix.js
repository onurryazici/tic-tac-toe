import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import { FaDotCircle, FaTimes } from "react-icons/fa";
import MatchResult from "./matchResult";

import { useSelector, useDispatch } from 'react-redux';
import {
  SELECT_TURN,
  Players,
  SELECT_WINNER,
  WinnerState,
  SELECT_MATRIX,
  FILL_CELL
} from '../features/game/gameSlice'

export default function Matrix(){
    const dispatch 		= useDispatch();
	const playersTurn 	= useSelector(SELECT_TURN)
	const winner 		= useSelector(SELECT_WINNER)
	const matrix 		= useSelector(SELECT_MATRIX)
	const PlayerO 		= <FaDotCircle color="#0066cc" fontSize={100} onClick={(e)=>e.stopPropagation()}/>
	const PlayerX 		= <FaTimes color="#e00303" fontSize={100} onClick={(e)=>e.stopPropagation()}/>

	function onCellClick(event) {
		const row = event.target.dataset.row;
		const col = event.target.dataset.col;

		if(matrix[row][col] === Players.empty && winner === WinnerState.NotSpecified){
			dispatch(FILL_CELL({row:row, col:col, turn: playersTurn}))
			if(playersTurn === Players.playerO){
				document.getElementById("container").classList.add("playerX-turn");
				document.getElementById("container").classList.remove("playerO-turn");
            } else {
				document.getElementById("container").classList.add("playerO-turn");
				document.getElementById("container").classList.remove("playerX-turn")
			}
		}
	}

    return(
		<><Container style={{maxWidth:'500px', maxHeight:'500px', background:'#222222'}} >
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
	<MatchResult /></>
    )
}
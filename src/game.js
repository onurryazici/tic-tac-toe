import React from 'react';
import PlayersView from './components/playersView';
import Matrix from './components/matrix';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Players, SELECT_TURN } from './features/game/gameSlice';

export default function Game(){
    const playersTurn = useSelector(SELECT_TURN)
    return (
		<div id="container" className={playersTurn === Players.playerO ? "playerO-turn" : "playerX-turn"}>
			<PlayersView/>
			<Matrix/>
		</div>
    )
}
import React, { useEffect, useState } from 'react';
import PlayersView from './components/playersView';
import Matrix from './components/matrix';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Game(props){
    
    return (
		<div id="container" className="playerO-turn">
			<PlayersView/>
			<Matrix/>
		</div>
    )
}
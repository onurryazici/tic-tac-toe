import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaDotCircle, FaTimes } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PlayersView(props){

    return (
        <ButtonGroup aria-label="Players">
				<Button id="playerOButton" className="user-win">
					<FaDotCircle color="#0066cc"/><span className="txt">Player O</span>
				</Button>
				<Button id="playerXButton">
					<FaTimes color="#e00303"/><span className="txt">Player X</span>
				</Button>
		</ButtonGroup>
    )
}
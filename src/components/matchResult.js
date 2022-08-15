import React from "react"
import { Alert } from "react-bootstrap"

export default function MatchResult(props){
    return(
        props.message !== "" ?
        <Alert key={"primary"} variant={"danger"} className="custom-alert">
			{props.message}
		</Alert>
        : ""
    )
}
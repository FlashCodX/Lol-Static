import React from 'react'
import {Link} from "react-router-dom";


export default class NavBar extends  React.Component{
    render() {
        return(
            <div className={"navbar"} >
                <div className={"logo-container"}>
                    <Link to={'/'}>
                    </Link>
                </div>

                <div className={"nav-items"}>
                    <Link to={'/livematch'}>Live Match</Link>
                    <Link to={'/matchhistory'}>Match History</Link>
                </div>

            </div>
        )
    }

}
import React from 'react'
import {Link} from "react-router-dom";
import {DataObj} from "../../config";


export default class NavBar extends  React.Component{
    render() {
        return(
            <div className={"navbar"} >
                <div className={"logo-container"}>
                    <Link to={'/'}>
                    <img src={DataObj.Defaults['logo']} alt=""/>

                    </Link>
                </div>



            </div>
        )
    }

}
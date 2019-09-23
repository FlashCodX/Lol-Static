import React from 'react'
import {AppResources, DataObj} from "../../config";
import {Redirect} from "react-router-dom";

export default class Error extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            red: false
        }
    }

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({red: true});
            }
                .bind(this),
            2000
        );
    }

    render() {
        const url = "url('" + AppResources.Defaults['background'] + "')";

        return (
            <div>
                {(this.state.red) ? <Redirect to={'/'}/> : <div className={"notfound"}>
                    <div className={"bg"} style={{backgroundImage: url}}/>
                    <label> 404 PAGE NOT FOUND</label>
                </div>}
            </div>

        )
    }


}
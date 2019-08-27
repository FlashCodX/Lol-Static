import React from 'react'
import MatchDetails from "./MatchDetails";


export default class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showDetails:true
        }
    }

    render() {
        return (
            <div className={"records-container"}>
                {(this.state.showDetails)?<MatchDetails/>:null}
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button onClick={()=>this.setState({showDetails:true})}>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>

                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>
                <div className={"record-box"}>
                    <div className={"box-bg"}/>
                    <div className={"box-title"}>LONGEST WINNING STREAK</div>
                    <div className={"box-val"}>10</div>
                    <div className={"box-time"}>3 months ago</div>
                    <button>Details</button>
                </div>

            </div>
        )
    }

}
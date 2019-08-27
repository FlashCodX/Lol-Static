import React from 'react'


export default class MatchDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"match-details"}>
                <i className="fa fa-times-circle"/>
                <div className={"details-title"}>STANDOUT PERFORMANCES</div>
                <div className={"performances-container"}>
                    <div className={"performance-box"}>
                        <div className={"performance-background"}/>
                        <div className={"performance-title"}>MOST MINIONS KILLED</div>
                        <div className={"performance-result"}>500</div>
                        <div className={"performance-player"}>FLASHWARS</div>
                    </div>
                    <div className={"performance-box"}>
                        <div className={"performance-background"}/>
                        <div className={"performance-title"}>MOST MINIONS KILLED</div>
                        <div className={"performance-result"}>500</div>
                        <div className={"performance-player"}>FLASHWARS</div>
                    </div> <div className={"performance-box"}>
                    <div className={"performance-background"}/>
                    <div className={"performance-title"}>MOST MINIONS KILLED</div>
                    <div className={"performance-result"}>500</div>
                    <div className={"performance-player"}>FLASHWARS</div>
                </div> <div className={"performance-box"}>
                    <div className={"performance-background"}/>
                    <div className={"performance-title"}>MOST MINIONS KILLED</div>
                    <div className={"performance-result"}>500</div>
                    <div className={"performance-player"}>FLASHWARS</div>
                </div> <div className={"performance-box"}>
                    <div className={"performance-background"}/>
                    <div className={"performance-title"}>MOST MINIONS KILLED</div>
                    <div className={"performance-result"}>500</div>
                    <div className={"performance-player"}>FLASHWARS</div>
                </div>
                </div>
            </div>
        )
    }


}
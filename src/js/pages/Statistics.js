import React from 'react'
import Records from "../Components/Records";
import History from "../Components/History";
import Live from "../Components/Live";
import Progress from "../Components/Progress";

export default class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'MATCHES',
        }
    }


    Controller() {
        console.log(this.state.selected)
        switch (this.state.selected) {
            case 'PROGRESS':
               /* document.getElementById(this.state.selected.toLowerCase()).style.opacity = "1";
                document.getElementById("live").style.opacity = "0.5";
                document.getElementById("records").style.opacity = "0.5";
                document.getElementById("matches").style.opacity = "0.5";*/
                return (
                    <Progress />
                )
                break;
            case 'LIVE':
               /* document.getElementById(this.state.selected.toLowerCase()).style.opacity = "1";
                document.getElementById("progress").style.opacity = "0.5";
                document.getElementById("records").style.opacity = "0.5";
                document.getElementById("matches").style.opacity = "0.5";*/
               return (
                   <Live isLive={true}/>
               )
                break;

            case 'RECORDS':
              /*  document.getElementById(this.state.selected.toLowerCase()).style.opacity = "1";
                document.getElementById("progress").style.opacity = "0.5";
                document.getElementById("live").style.opacity = "0.5";
                document.getElementById("matches").style.opacity = "0.5";*/
                return (
                    <Records/>
                )
                break;
            case 'MATCHES':
                /*document.getElementById(this.state.selected.toLowerCase()).style.opacity = "1";
                document.getElementById("progress").style.opacity = "0.5";
                document.getElementById("records").style.opacity = "0.5";
                document.getElementById("live").style.opacity = "0.5";*/
                return (
                    <History/>
                )
                break;
        }
    }

    render() {
        return (
            <div className={"statistics-page"}>
                <div className={"player-header"}>
                    <img className={"player-rank-img"} src={"https://cdn.lolskill.net/img/tiers/192/bronze.png"}
                         alt=""/>
                    <div className={"rank-text"}>BRONZE III</div>
                    <div className={"champ-points"}>503,201 PTS</div>
                    <div className={"champ-name"}>FIDDLESTICKS</div>
                    <img className={"player-icon"}
                         src={"https://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/588.png"} alt=""/>
                    <div className={"player-name"}>FLASHWARS</div>
                    <div className={"main-lanes"}>MAINS:</div>
                    <div className={"player-lanes"}>
                        <img src={"https://cdn.lolskill.net/img/roles/32/jungle.png"} alt=""/>
                        <img src={"https://cdn.lolskill.net/img/roles/32/support.png"} alt=""/>
                    </div>
                    <div className={"top-champions"}>
                        <img src={"https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png"} alt=""/>
                        <img src={"https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Brand.png"} alt=""/>
                        <img src={"https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Jax.png"} alt=""/>
                        <img src={"https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Swain.png"} alt=""/>
                        <img src={"https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Aatrox.png"} alt=""/>
                    </div>
                </div>
                <div className={"stats-navigator"}>
                    <div id={"progress"} onClick={() => {
                        this.setState({selected: 'PROGRESS'})
                    }}>PROGRESS
                    </div>
                    <div id={"live"} onClick={() => {
                        this.setState({selected: 'LIVE'})
                    }}>LIVE
                    </div>
                    <div id={"records"} onClick={() => {
                        this.setState({selected: 'RECORDS'})
                    }}>RECORDS
                    </div>
                    <div id={"matches"} onClick={() => {
                        this.setState({selected: 'MATCHES'})
                    }}>MATCHES
                    </div>
                </div>
                {this.Controller()}

            </div>
        )
    }


}
import React from 'react'
import {AppResources, DataObj} from "../../config";
import {Brain} from "../methods/Brain";
import {Conversors} from "../methods/Conversors";
import ReactTooltip from "react-tooltip";

const brain = new Brain();
const conversor = new Conversors();
export default class Live extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLive: DataObj.data.liveMatch
        }
        console.log(this.state.isLive)
    }


    renderMatch() {
        const blue = brain.splitLiveTeams().blue
        const teamBlueBans=brain.splitLiveTeams().blueTeamBans
        const teamRedBans=brain.splitLiveTeams().redTeamBans
        const red = brain.splitLiveTeams().red
        let bueTeam = []
        let redTeam = []
        blue.map((player) => {
            const champInfo = brain.getChampionInfoById(player['championId'])
            const spells = brain.getPlayerSpells(player)
            const rankData= brain.getUserRanksByPlayer(player['userRank']).solo
            const percentage=(rankData.wins/(rankData.wins+rankData.losses)*100).toFixed(2)
            const url = "url('" + 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + champInfo['id']
                + '_0.jpg' + "')";
            const mastery = brain.getChampionStatsByPlayer(player)
            const ranked = brain.getUserRanksByPlayer(player['userRank']).solo.tier === 'unranked'
            bueTeam.push(<section className={"player"}>
                <div style={{backgroundImage: url}}/>
                <section>
                    <div>{player['summonerName']}</div>
                    <section>
                        {spells}
                    </section>

                    <section className={"stats"}>
                        <section>
                            <img
                                src={(mastery === null) ? AppResources.Masteries['lv0'] : AppResources.Masteries['lv' + mastery['championLevel']]}
                                alt=""/>

                            <div>{(mastery === null) ? 'LV.0' : 'LV.' + mastery['championLevel']}</div>
                        </section>

                        {(ranked) ? <section/> : <section>

                            <div>RANKEDS</div>
                            {(percentage>50)? <div style={{color:'green' ,fontSize:"1.1rem"}}>{percentage}%</div>: <div style={{color:'red' ,fontSize:"1.1rem"}}>{percentage}%</div>}
                            <div><span style={{color:"green"}}>{ rankData.wins}</span>- <span style={{color:"red"}}>{rankData.losses}</span></div>
                        </section>}

                        <section>
                            <img
                                src={AppResources.Ranks[brain.getUserRanksByPlayer(player['userRank']).solo.tier.toLowerCase()]}
                                alt=""/>
                            <div>{brain.getUserRanksByPlayer(player['userRank']).solo.tier.toUpperCase()} {brain.getUserRanksByPlayer(player['userRank']).solo.rank}</div>
                            <div>{brain.getUserRanksByPlayer(player['userRank']).solo.lp} LP</div>
                        </section>
                    </section>
                    <div>{(mastery === null) ? '0 PTS' : conversor.beautify(mastery['championPoints']) + ' PTS'}</div>
                    <div>{champInfo['name']}</div>
                </section>

            </section>)
        })


        red.map((player) => {
            const champInfo = brain.getChampionInfoById(player['championId'])
            const spells = brain.getPlayerSpells(player)
            const rankData= brain.getUserRanksByPlayer(player['userRank']).solo
            const percentage=(rankData.wins/(rankData.wins+rankData.losses)*100).toFixed(2)
            const url = "url('" + 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + champInfo['id']
                + '_0.jpg' + "')";
            const mastery = brain.getChampionStatsByPlayer(player)
            const ranked = brain.getUserRanksByPlayer(player['userRank']).solo.tier === 'unranked'
            redTeam.push(<section className={"player"}>
                <div style={{backgroundImage: url}}/>
                <section>
                    <div>{player['summonerName']}</div>
                    <section>
                        {spells}
                    </section>

                    <section className={"stats"}>
                        <section>
                            <img
                                src={(mastery === null) ? AppResources.Masteries['lv0'] : AppResources.Masteries['lv' + mastery['championLevel']]}
                                alt=""/>

                            <div>{(mastery === null) ? 'LV.0' : 'LV.' + mastery['championLevel']}</div>
                        </section>

                        {(ranked) ? <section/> : <section>

                            <div>RANKEDS</div>
                            {(percentage>50)? <div style={{color:'green' ,fontSize:"1.1rem"}}>{percentage}%</div>: <div style={{color:'red' ,fontSize:"1.1rem"}}>{percentage}%</div>}
                            <div><span style={{color:"green"}}>{ rankData.wins}</span>- <span style={{color:"red"}}>{rankData.losses}</span></div>
                        </section>}

                        <section>
                            <img
                                src={AppResources.Ranks[brain.getUserRanksByPlayer(player['userRank']).solo.tier.toLowerCase()]}
                                alt=""/>
                            <div>{brain.getUserRanksByPlayer(player['userRank']).solo.tier.toUpperCase()} {brain.getUserRanksByPlayer(player['userRank']).solo.rank}</div>
                            <div>{brain.getUserRanksByPlayer(player['userRank']).solo.lp} LP</div>
                        </section>
                    </section>
                    <div>{(mastery === null) ? '0 PTS' : conversor.beautify(mastery['championPoints']) + ' PTS'}</div>
                    <div>{champInfo['name']}</div>
                </section>

            </section>)
        })

        return (
            <main className={"live"}>
                <ReactTooltip className={"tooltip"}/>
                <section className={"section-a"}>
                    {bueTeam}
                </section>
                <section className={"section-b"}>
                    <section className={"b1"}>
                       {teamBlueBans.map((ban)=>{
                           console.log(ban)
                          const champ= brain.getChampionInfoById(ban['championId'])
                           return(
                               <img data-tip={champ['name']} src={"http://ddragon.leagueoflegends.com/cdn/"+AppResources.PatchVersion+"/img/champion/"+champ['id']+".png"} alt=""/>
                           )

                       })}
                    </section>
                    <section className={"b2"}>
                        <div>50%</div>
                        <i className="far fa-circle circle"/>
                        <div>50%</div>
                    </section>
                    <section className={"b3"}>
                        {teamRedBans.map((ban)=>{
                            console.log(ban)
                            const champ= brain.getChampionInfoById(ban['championId'])
                            return(
                                <img data-tip={champ['name']} src={"http://ddragon.leagueoflegends.com/cdn/"+AppResources.PatchVersion+"/img/champion/"+champ['id']+".png"} alt=""/>
                            )

                        })}
                    </section>

                </section>

                <section className={"section-a"}>
                    {redTeam}
                </section>


            </main>
        )
    }


    render() {
        if (this.state.isLive) {
            return (
                this.renderMatch()

            )
        } else {
            return (
                <div className={"warning"}>{DataObj.data.username} IS NOT CURRENTLY ON A MATCH.</div>
            )
        }

    }

}
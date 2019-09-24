import React from 'react'
import {DataObj} from "../../config";
import {Brain} from "../methods/Brain";
import {MatchDetailsBrain} from "../methods/MatchDetailsBrain";
import {Conversors} from "../methods/Conversors";

const brain = new Brain();
const convertor = new Conversors();
const topScores = new MatchDetailsBrain();
export default class MatchDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: props.match,
            close: false,
        }
    }

    renderTeams() {
        let teamBlue = []
        let teamRed = []
        let background = ''
        let teamBlueBans = []
        let teamRedBans = []
        let teamBlueKda = {
            kills: 0,
            deaths: 0,
            assists: 0
        }

        let teamRedKda = {
            kills: 0,
            deaths: 0,
            assists: 0
        }

        const teams = brain.splitTeamsByMatch(this.state.game);
        teams.teamBlue.map((player) => {
            teamBlueKda.kills += player['champion']['stats']['kills']
            teamBlueKda.deaths += player['champion']['stats']['deaths']
            teamBlueKda.assists += player['champion']['stats']['assists']
            const url = brain.getChampionUrls(player['champion']['championId']);
            teamBlue.push(<div className={"player-details-container"}>
                <div className={"player-icon-container"}>
                    <img src={url['icon']} alt=""/>
                    <div className={"player-level"}>{player['champion']['stats']['champLevel']}</div>
                </div>
                <div className={"d-spells-container"}>
                    {brain.getPlayerSpells(player['champion']).map((spell) => {
                        return (
                            <img src={spell} alt=""/>
                        )
                    })}
                </div>
                <div className={"d-player-username"}>{player['account']['player']['summonerName']}</div>
                <div className={"d-player-items-container"}>
                    {brain.getItemsUrls(player['champion']['stats']).map((item) => {
                        if (item !== 0) {
                            return (
                                <img src={item} alt=""/>
                            )
                        }

                    })}
                </div>
                <div className={"d-player-kda-container"}>
                    <div className={"label"}>KDA</div>
                    <div className={"value"}>
                        <span className={"kills"}>{player['champion']['stats']['kills']}</span>/
                        <span className={"deaths"}>{player['champion']['stats']['deaths']}</span>/
                        <span className={"assists"}>{player['champion']['stats']['assists']}</span>
                    </div>
                </div>
                <div className={"d-player-cs-container"}>
                    <div className={"label"}>CS</div>
                    <div
                        className={"value"}>{parseInt(player['champion']['stats']['totalMinionsKilled']) + parseInt(player['champion']['stats']['neutralMinionsKilled'])}</div>
                </div>
                <div className={"d-player-wards-container"}>
                    <div className={"label"}>WARDS</div>
                    <div className={"value"}>{player['champion']['stats']['wardsPlaced']}</div>
                </div>
                <div className={"d-player-damagedealtochamps-container"}>
                    <div className={"label"}>DMG TO CHAMPS</div>
                    <div
                        className={"value"}>{convertor.beautify(player['champion']['stats']['totalDamageDealtToChampions'])}</div>
                </div>
                <div className={"d-player-damagedealt-container"}>
                    <div className={"label"}>DMG DEALT</div>
                    <div className={"value"}>{convertor.beautify(player['champion']['stats']['totalDamageDealt'])}</div>
                </div>
                <div className={"d-player-damagetaken-container"}>
                    <div className={"label"}>DMG TAKEN</div>
                    <div className={"value"}>{convertor.beautify(player['champion']['stats']['totalDamageTaken'])}</div>
                </div>
            </div>)
        })

        teams.teamRed.map((player) => {
            teamRedKda.kills += player['champion']['stats']['kills']
            teamRedKda.deaths += player['champion']['stats']['deaths']
            teamRedKda.assists += player['champion']['stats']['assists']
            const url = brain.getChampionUrls(player['champion']['championId']);
            teamRed.push(<div className={"player-details-container"}>
                <div className={"player-icon-container"}>
                    <img src={url['icon']} alt=""/>
                    <div className={"player-level"}>{player['champion']['stats']['champLevel']}</div>
                </div>
                <div className={"d-spells-container"}>
                    {brain.getPlayerSpells(player['champion']).map((spell) => {
                        return (
                            <img src={spell} alt=""/>
                        )
                    })}
                </div>
                <div className={"d-player-username"}>{player['account']['player']['summonerName']}</div>
                <div className={"d-player-items-container"}>
                    {brain.getItemsUrls(player['champion']['stats']).map((item) => {
                        if (item !== 0) {
                            return (
                                <img src={item} alt=""/>
                            )
                        }

                    })}
                </div>
                <div className={"d-player-kda-container"}>
                    <div className={"label"}>KDA</div>
                    <div className={"value"}>
                        <span className={"kills"}>{player['champion']['stats']['kills']}</span>/
                        <span className={"deaths"}>{player['champion']['stats']['deaths']}</span>/
                        <span className={"assists"}>{player['champion']['stats']['assists']}</span>
                    </div>
                </div>
                <div className={"d-player-cs-container"}>
                    <div className={"label"}>CS</div>
                    <div
                        className={"value"}>{parseInt(player['champion']['stats']['totalMinionsKilled']) + parseInt(player['champion']['stats']['neutralMinionsKilled'])}</div>
                </div>
                <div className={"d-player-wards-container"}>
                    <div className={"label"}>WARDS</div>
                    <div className={"value"}>{player['champion']['stats']['wardsPlaced']}</div>
                </div>
                <div className={"d-player-damagedealtochamps-container"}>
                    <div className={"label"}>DMG TO CHAMPS</div>
                    <div
                        className={"value"}>{convertor.beautify(player['champion']['stats']['totalDamageDealtToChampions'])}</div>
                </div>
                <div className={"d-player-damagedealt-container"}>
                    <div className={"label"}>DMG DEALT</div>
                    <div className={"value"}>{convertor.beautify(player['champion']['stats']['totalDamageDealt'])}</div>
                </div>
                <div className={"d-player-damagetaken-container"}>
                    <div className={"label"}>DMG TAKEN</div>
                    <div className={"value"}>{convertor.beautify(player['champion']['stats']['totalDamageTaken'])}</div>
                </div>
            </div>)
        })


        teams.teamBlueDetails['bans'].map((ban) => {
            const url = brain.getChampionUrls(ban['championId'])
            teamBlueBans.push(<img src={url['icon']} alt=""/>)
        })
        teams.teamRedDetails['bans'].map((ban) => {
            const url = brain.getChampionUrls(ban['championId'])
            teamRedBans.push(<img src={url['icon']} alt=""/>)
        })
        let blueTeamColor = ''
        let redTeamColor = ''
        if (teams.teamBlueDetails['win'] === "Win") {
            blueTeamColor = "green"
            redTeamColor = "red"

        } else {
            blueTeamColor = "red"
            redTeamColor = "green"
        }
        return (
            <div className={"team-details-container"}>
                <div className={"team-blue-details-container"}>
                    <div className={"team-header"}>
                        <div className={"team-result"}
                             style={{color: blueTeamColor}}>{(teams.teamBlueDetails['win'] === "Win") ? "VICTORY" : "DEFEAT"}</div>
                        <div className={"label"}>BLUE TEAM</div>
                        <div className={"bans-container"}>
                            <div className={"label"}>BANS:</div>

                            {teamBlueBans}
                        </div>
                        <div className={"team-kda-container"}>
                            <div className={"label"}>TEAM KDA</div>
                            <div className={"team-kda"}><span className={"kills"}>{teamBlueKda.kills}</span>
                                /<span className={"deaths"}>{teamBlueKda.deaths}</span>/
                                <span className={"assists"}>{teamBlueKda.assists}</span></div>
                        </div>

                        <div className={"team-objectives"}>
                            <div className={"team-objectives-container"}>
                                <div className={"label"}>DRAKES</div>
                                <div className={"value"}>{teams.teamBlueDetails['dragonKills']}</div>
                            </div>
                            <div className={"team-objectives-container"}>
                                <div className={"label"}>BARONS</div>
                                <div className={"value"}>{teams.teamBlueDetails['baronKills']}
                                </div>
                            </div>
                            <div className={"team-objectives-container"}>
                                <div className={"label"}>TOWERS</div>
                                <div className={"value"}>{teams.teamBlueDetails['towerKills']}</div>
                            </div>
                        </div>
                    </div>
                    <div className={"team-details"}>
                        {teamBlue}
                    </div>
                </div>

                <div className={"team-red-details-container"}>
                    <div className={"team-header"} style={{background: "rgba(139,0,0,0.3)"}}>
                        <div className={"team-result"}
                             style={{color: redTeamColor}}>{(teams.teamRedDetails['win'] === "Win") ? "VICTORY" : "DEFEAT"}</div>
                        <div className={"label"}>RED TEAM</div>
                        <div className={"bans-container"}>
                            <div className={"label"}>BANS:</div>

                            {teamRedBans}
                        </div>
                        <div className={"team-kda-container"}>
                            <div className={"label"}>TEAM KDA</div>
                            <div className={"team-kda"}><span className={"kills"}>{teamRedKda.kills}</span>
                                /<span className={"deaths"}>{teamRedKda.deaths}</span>/
                                <span className={"assists"}>{teamRedKda.assists}</span></div>
                        </div>

                        <div className={"team-objectives"}>
                            <div className={"team-objectives-container"}>
                                <div className={"label"}>DRAKES</div>
                                <div className={"value"}>{teams.teamRedDetails['dragonKills']}</div>
                            </div>
                            <div className={"team-objectives-container"}>
                                <div className={"label"}>BARONS</div>
                                <div className={"value"}>{teams.teamRedDetails['baronKills']}
                                </div>
                            </div>
                            <div className={"team-objectives-container"}>
                                <div className={"label"}>TOWERS</div>
                                <div className={"value"}>{teams.teamRedDetails['towerKills']}</div>
                            </div>
                        </div>
                    </div>
                    <div className={"team-details"}>
                        {teamRed}
                    </div>
                </div>


            </div>
        )
    }

    render() {
        /* const game = this.state.game
         const MostCs = filter.getTopCsInGame(game)
         const MostDmg = filter.getTopDamageInGame(game)
         const MostGold = filter.getTopGoldInGame(game)
         const HighestKda = filter.getHighestKdaInGame(game)
         const MostWards = filter.getTopWardsPlacedInGame(game)*/
        const url = "url('" + 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg' + "')";
        const game = this.state.game
        const topCs = topScores.getTopCsInGame(game)

        const topDmg = topScores.getTopDamageInGame(game)
        const HighestKda = topScores.getHighestKdaInGame(game)
        const MostGold = topScores.getTopGoldInGame(game)
        const MostWards = topScores.getTopWardsPlacedInGame(game)
        const BlueTeam = topScores.getTeamData(game['teams'][0])
        const RedTeam = topScores.getTeamData(game['teams'][1])

        const teamBlueKills=brain.splitTeamsByMatch(game).teamBlueDetails['kills']
        const teamBlueDeaths=brain.splitTeamsByMatch(game).teamBlueDetails['deaths']
        const teamBlueAssists=brain.splitTeamsByMatch(game).teamBlueDetails['assists']


        const teamRedKills=brain.splitTeamsByMatch(game).teamRedDetails['kills']
        const teamRedDeaths=brain.splitTeamsByMatch(game).teamRedDetails['deaths']
        const teamRedAssists=brain.splitTeamsByMatch(game).teamRedDetails['assists']

        const BlueTeamPlayers= brain.splitTeamsByMatch(game).teamBlue
        const RedTeamPlayers= brain.splitTeamsByMatch(game).teamRed
        return (
            <div>
                {(this.state.close) ? null : <div className={"details"}>
                    <i className="fa fa-times-circle" onClick={() => this.setState({close: true})}/>
                    <main>
                        <div>STANDOUT PERFORMANCES</div>
                        <section className={"performances"}>
                            <section>
                                <div>MOST MINIONS KILLED</div>
                                <div>{topCs.champion.totalCs}</div>
                                <div>{topCs.account['player']['summonerName']}</div>
                                <div  style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(topCs.champion['championId'])['id'] + "_0.jpg')"}}/>
                            </section>

                            <section>
                                <div>MOST DAMAGE DEALT TO CHAMPS</div>
                                <div style={{color:'red'}}>{convertor.beautify(topDmg.champion['stats']['totalDamageDealtToChampions'])}</div>
                                <div>{topDmg.account['player']['summonerName']}</div>
                                <div  style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(topDmg.champion['championId'])['id'] + "_0.jpg')"}}/>

                            </section>

                            <section>
                                <div>MOST GOLD</div>
                                <div>{convertor.beautify(MostGold.champion['stats']['goldEarned'])}</div>
                                <div>{MostGold.account['player']['summonerName']}</div>
                                <div  style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(MostGold.champion['championId'])['id'] + "_0.jpg')"}}/>

                            </section>


                            <section>
                                <div>HIGHEST KDA</div>
                                <div>{HighestKda.kda.toFixed(2)}</div>
                                <div>{HighestKda.account['player']['summonerName']}</div>
                                <div  style={{backgroundImage: "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(HighestKda.champion['championId'])['id'] + "_0.jpg')"}}/>

                            </section>



                        </section>

                        <section className={"team-header"}>
                            <section>
                                {(BlueTeam.result==='VICTORY')?<div style={{color:'green',fontSize:'1.2rem'}}>{BlueTeam.result}</div>:<div style={{color:'red',fontSize:'1.2rem'}}>{BlueTeam.result}</div>}
                                <div>BLUE TEAM</div>
                            </section>
                            <section className={"bans"}>
                                <div>BANS:</div>
                                {BlueTeam.bans}

                            </section>
                            <section>
                                <div>KDA</div>
                                <div><span style={{color:'green'}}>{teamBlueKills}</span>/<span style={{color:'red'}}>{teamBlueDeaths}</span>/<span style={{color:'aqua'}}>{teamBlueAssists}</span></div>
                            </section>
                            <section>
                                <div>DRAKES</div>
                                <div style={{color:'green'}}>{BlueTeam.drakes}</div>
                            </section>
                            <section>
                                <div>TOWERS</div>
                                <div style={{color:'green'}}>{BlueTeam.towers}</div>
                            </section>
                            <section>
                                <div>GOLD</div>
                                <div style={{color:'green'}}>{convertor.beautify(brain.splitTeamsByMatch(game).teamBlueDetails['totalGold'])}</div>
                            </section>

                        </section>


                        <section className={"players"}>

                            {BlueTeamPlayers}




                        </section>
                        <section className={"team-header"} style={{background:'rgba(217, 30, 24, .4)'}}>
                            <section>
                                {(RedTeam.result==='VICTORY')?<div style={{color:'green',fontSize:'1.2rem'}}>{RedTeam.result}</div>:<div style={{color:'red',fontSize:'1.2rem'}}>{RedTeam.result}</div>}
                                <div>RED TEAM</div>
                            </section>
                            <section className={"bans"}>
                                <div>BANS:</div>
                                {RedTeam.bans}

                            </section>
                            <section>
                                <div>KDA</div>
                                <div><span style={{color:'green'}}>{teamRedKills}</span>/<span style={{color:'red'}}>{teamRedDeaths}</span>/<span style={{color:'aqua'}}>{teamRedAssists}</span></div>
                            </section>
                            <section>
                                <div>DRAKES</div>
                                <div style={{color:'green'}}>{RedTeam.drakes}</div>
                            </section>
                            <section>
                                <div>TOWERS</div>
                                <div style={{color:'green'}}>{RedTeam.towers}</div>
                            </section>
                            <section>
                                <div>GOLD</div>
                                <div style={{color:'green'}}>{convertor.beautify(brain.splitTeamsByMatch(game).teamRedDetails['totalGold'])}</div>
                            </section>

                        </section>


                        <section className={"players"}>

                            {RedTeamPlayers}


                        </section>


                    </main>


                </div>}
            </div>

        )
    }


}
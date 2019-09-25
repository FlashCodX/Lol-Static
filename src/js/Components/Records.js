import React from 'react'
import MatchDetails from "./MatchDetails";
import {DataObj} from "../../config";
import {Brain} from "../methods/Brain";
import {Conversors} from "../methods/Conversors";
import {Mrecords} from "../methods/Mrecords";
import {UrlsExtract} from "../methods/UrlsExtract";

const records = new Mrecords();
const conversor = new Conversors();
const brain = new Brain();
export default class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            selectedMatch:'',
            ready: props.ready,
            warning:false
        }
    }


    sectoh(ts) {
        const minutes = Math.floor(ts / 60);
        const hours = Math.floor(ts / 3600);
        const seconds = ts - minutes * 60;


        if (hours > 1) {
            return hours + 'HOUR ' + minutes + 'MIN' + seconds + 'SEC'
        } else {
            return minutes + ' MIN ' + seconds + ' SEC'
        }
    }

    middleware(game){
        if (this.state.ready){
            this.setState({selectedMatch:game},()=>{
                this.setState({showDetails:true})
            })
        }else {
            this.setState({warning:true})
        }
    }


    render() {
        const url = "url('" + 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg' + "')";
        const MostKills = brain.getMyPlayer(records.getMostKills());
        const MostFarm = brain.getMyPlayer(records.getMostFarm());


        const MostDeaths = brain.getMyPlayer(records.getMostDeaths());
        const MostAssists = brain.getMyPlayer(records.getMostAssists());
        const MostWards = brain.getMyPlayer(records.getMosWardsPlaced());
        const WinningStreak = records.getLongestWinningStreak().streak;
        const WinningGameStreak = brain.getMyPlayer(records.getLongestWinningStreak().game);
        const LosingStreak = records.getLongestLosingStreak().streak
        const LosingGameStreak = brain.getMyPlayer(records.getLongestLosingStreak().game);
        const HighestDamage = brain.getMyPlayer(records.getMostDmgToChamps());
        const HighestKdaGame = brain.getMyPlayer(records.getHighestKDA().game);
        const HighestKda = records.getHighestKDA().kda.toFixed(2);
        const ShortestWin = this.sectoh(records.getShortestWin().duration);
        const ShortestWinGame = brain.getMyPlayer(records.getShortestWin().game);
        const LongestGameG = brain.getMyPlayer(records.getLongestGame().game);
        const LongestGame = records.getLongestGame().duration;
        const LongestLoss = records.getLongestLoss().duration;
        const LongestLossGame = brain.getMyPlayer(records.getLongestLoss().game);

        const QuickestLoss = records.getQuichestLoss().duration;
        const QuickestLossGame = brain.getMyPlayer(records.getQuichestLoss().game);
        return (
            <div>
                {(this.state.showDetails) ? <MatchDetails key={Date.now()} match={this.state.selectedMatch}/> : null}
                {(this.state.warning)? <div className={"re-warning"}><i className="fas fa-exclamation"/>WAIT UNTIL ALL MATCHES ARE LOADED</div>:null}

                <main className={"records"}>

                    <section className={"records-wrapper"}>


                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(QuickestLossGame.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Quickest Loss</div>
                                <section>
                                    <div
                                        style={{color: 'red', fontSize: "1rem"}}>{this.sectoh(QuickestLoss)}</div>
                                    <div onClick={()=>this.middleware(QuickestLossGame.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(QuickestLossGame.match)}</div>
                            </section>
                        </div>


                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(LongestLossGame.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Longest Loss</div>
                                <section>
                                    <div
                                        style={{color: 'red', fontSize: "1rem"}}>{this.sectoh(LongestLoss)}</div>
                                    <div onClick={()=>this.middleware(LongestLossGame.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(LongestLossGame.match)}</div>
                            </section>
                        </div>

                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(ShortestWinGame.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Shortest Win</div>
                                <section>
                                    <div
                                        style={{color: 'aqua', fontSize: "1rem"}}>{ShortestWin.toLowerCase()}</div>
                                    <div onClick={()=>this.middleware(ShortestWinGame.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(ShortestWinGame.match)}</div>
                            </section>
                        </div>

                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(LongestGameG.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Longest Game</div>
                                <section>
                                    <div style={{color: 'aqua', fontSize: "1rem"}}>{this.sectoh(LongestGame)}</div>
                                    <div onClick={()=>this.middleware(LongestGameG.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(LongestGameG.match)}</div>
                            </section>
                        </div>

                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(HighestDamage.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Highest Damage to Champs</div>
                                <section>
                                    <div
                                        style={{color: 'green'}}>{conversor.beautify(HighestDamage.champion['stats']['totalDamageDealtToChampions'])}</div>
                                    <div onClick={()=>this.middleware(HighestDamage.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(HighestDamage.match)}</div>
                            </section>
                        </div>

                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(HighestKdaGame.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Highest Kda</div>
                                <section>
                                    <div
                                        style={{color: 'green'}}>{HighestKda}</div>
                                    <div onClick={()=>this.middleware(HighestKdaGame.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(HighestKdaGame.match)}</div>
                            </section>
                        </div>
                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(MostKills.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Most Kills</div>
                                <section>
                                    <div style={{color: 'green'}}>{MostKills.champion['stats']['kills']}</div>
                                    <div onClick={()=>this.middleware(MostKills.match)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(MostKills.match)}</div>
                            </section>
                        </div>


                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(MostFarm.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Most Minions Killed</div>
                                <section>
                                    <div style={{color: 'green'}}>{MostFarm.champion['stats']['kills']}</div>
                                    <div onClick={()=>this.middleware(MostFarm.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(MostFarm.match)}</div>
                            </section>
                        </div>

                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(MostDeaths.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Most Deaths</div>
                                <section>
                                    <div style={{color: 'red'}}>{MostDeaths.champion['stats']['deaths']}</div>
                                    <div onClick={()=>this.middleware(MostDeaths.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(MostDeaths.match)}</div>
                            </section>
                        </div>


                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(WinningGameStreak.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Longest Winning Streak</div>
                                <section>
                                    <div style={{color: 'aquamarine'}}>{WinningStreak}</div>
                                    <div onClick={()=>this.middleware(WinningGameStreak.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(WinningGameStreak.match)}</div>
                            </section>
                        </div>


                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(LosingGameStreak.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Longest Losing Streak</div>
                                <section>
                                    <div style={{color: 'red'}}>{LosingStreak}</div>
                                    <div onClick={()=>this.middleware(LosingGameStreak.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(LosingGameStreak.match)}</div>
                            </section>
                        </div>


                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(MostAssists.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Most Assists</div>
                                <section>
                                    <div style={{color: 'aqua'}}>{MostAssists.champion['stats']['assists']}</div>
                                    <div onClick={()=>this.middleware(MostAssists.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(MostAssists.match)}</div>
                            </section>
                        </div>
                        <div className={"box"}>
                            <div
                                style={{backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + brain.getChampionInfoById(MostWards.champion['championId'])['id'] + "_0.jpg')"}}/>
                            <section>
                                <div>Most Wards Placed</div>
                                <section>
                                    <div>{MostWards.champion['stats']['wardsPlaced']}</div>
                                    <div onClick={()=>this.middleware(MostWards.game)}>DETAILS<i className="fas fa-sign-out-alt"/></div>

                                </section>
                                <div>{brain.getTimeDiference(MostWards.match)}</div>
                            </section>
                        </div>


                    </section>


                </main>
            </div>


        )
    }

}
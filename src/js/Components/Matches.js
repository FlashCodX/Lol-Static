import React from 'react'
import {DataObj} from "../../config";
import {Brain} from "../methods/Brain";
import {Conversors} from "../methods/Conversors";


const conversor = new Conversors();
const brain = new Brain();
export default class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top5: props.top5,
            matchesToShow: 5,
            matches:props.matches
        }


    }




    renderTop5() {
        let matches = []
        this.state.matches.map((game) => {
            const stats = brain.getMyPlayer(game).champion['stats']
            const spells = brain.getPlayerSpells(brain.getMyPlayer(game).champion);
            const kills = stats['kills'];
            const deaths = stats['deaths'];
            const assists = stats['assists'];
            const dmg = stats['totalDamageDealtToChampions'];
            const farm = stats['totalMinionsKilled'] + stats['neutralMinionsKilled'];
            const doublekills = stats['doubleKills'];
            const triplekills = stats['tripleKills'];
            const quadrakills = stats['quadraKills'];
            const pentakills = stats['pentaKills'];
            const items = brain.getItems(stats)
            const gameResult = brain.getMatchResult(game, brain.getMyPlayer(game).champion)
            const gameType = brain.getGameType(game)
            const gameCreation = brain.getTimeDiference(game)
            const url="url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+ brain.getChampionInfoById(brain.getMyPlayer(game).champion['championId'])['id']+ "_0.jpg')"

            matches.push(<section key={game['gameId']} className={"match"}>
                <div className={"match-bg"} style={{backgroundImage:url}} />
                <section className={"section-a"}>
                    <div>{gameCreation.toUpperCase()}</div>
                    {(doublekills > 1) ? <div>DOUBLE KILL ({doublekills})</div> : null}
                    {(triplekills > 1) ? <div>TRIPLE KILL ({triplekills})</div> : null}
                    {(quadrakills > 1) ? <div>QUADRA KILL ({quadrakills})</div> : null}
                    {(pentakills > 1) ? <div>PENTA KILL ({pentakills})</div> : null}
                </section>
                <section className={"section-b"}>
                    <section>
                        {(gameResult === 'VICTORY') ? <div style={{color: "green"}}>{gameResult}</div> :
                            <div style={{color: "red"}}>{gameResult}</div>}
                        <div>{gameType}</div>
                    </section>
                    <section>
                        <div><span className={"kills"}>{kills}</span>/<span style={{color: 'red'}}>{deaths}</span>/<span
                            style={{color: 'aqua'}}>{assists}</span></div>
                        <div>KDA</div>
                    </section>
                    <section>
                        <div>{conversor.beautify(dmg)}</div>
                        <div>DMG DEALT TO CHAMPS</div>
                    </section>
                    <section>
                        <div>{farm}</div>
                        <div>CS</div>
                    </section>
                    <section>
                        <section>
                            {spells}
                        </section>

                        <div>SPELLS</div>

                    </section>

                </section>
                <section className={"section-c"}>
                    {items}
                </section>

            </section>)
        })

        return matches
    }



    render() {
        return (
            <section className={"matches"}>

                {(this.state.top5) ? this.renderTop5() :
                    this.renderHistory()

                }

                {(this.state.top5) ? null :
                    this.state.matchesToShow >= DataObj.data.totalGames ? null :
                      this.state.matches.length===0?null: <div onClick={() => this.setState({matchesToShow: this.state.matchesToShow + 5})}>LOAD MORE <i
                            className="fas fa-chevron-down"/></div>}
            </section>
        )

    }


    renderHistory() {
        let matches = []
        const sorted = this.state.matches.sort(function (a, b) {
            return b['gameCreation'] - a['gameCreation']
        })
        sorted.slice(0, this.state.matchesToShow).map((game) => {
            const stats = brain.getMyPlayer(game).champion['stats']
            const spells = brain.getPlayerSpells(brain.getMyPlayer(game).champion)
            const kills = stats['kills'];
            const deaths = stats['deaths'];
            const assists = stats['assists'];
            const dmg = stats['totalDamageDealtToChampions'];
            const farm = stats['totalMinionsKilled'] + stats['neutralMinionsKilled'];
            const doublekills = stats['doubleKills'];
            const triplekills = stats['tripleKills'];
            const quadrakills = stats['quadraKills'];
            const pentakills = stats['pentaKills'];
            const items = brain.getItems(stats)
            const gameResult = brain.getMatchResult(game, brain.getMyPlayer(game).champion)
            const gameType = brain.getGameType(game)
            const gameCreation = brain.getTimeDiference(game)
            const url="url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+ brain.getChampionInfoById(brain.getMyPlayer(game).champion['championId'])['id']+ "_0.jpg')"
            matches.push(<section className={"match"}>
                <div className={"match-bg"} style={{backgroundImage:url}}/>
                <section className={"section-a"}>
                    <div>{gameCreation.toUpperCase()}</div>
                    {(doublekills > 1) ? <div>DOUBLE KILL ({doublekills})</div> : null}
                    {(triplekills > 1) ? <div>TRIPLE KILL ({triplekills})</div> : null}
                    {(quadrakills > 1) ? <div>QUADRA KILL ({quadrakills})</div> : null}
                    {(pentakills > 1) ? <div>PENTA KILL ({pentakills})</div> : null}
                </section>
                <section className={"section-b"}>
                    <section>
                        {(gameResult === 'VICTORY') ? <div style={{color: "green"}}>{gameResult}</div> :
                            <div style={{color: "red"}}>{gameResult}</div>}
                        <div>{gameType}</div>
                    </section>
                    <section>
                        <div><span className={"kills"}>{kills}</span>/<span
                            style={{color: 'red'}}>{deaths}</span>/<span
                            style={{color: 'blue'}}>{assists}</span></div>
                        <div>KDA</div>
                    </section>
                    <section>
                        <div>{conversor.beautify(dmg)}</div>
                        <div>DMG DEALT TO CHAMPS</div>
                    </section>
                    <section>
                        <div>{farm}</div>
                        <div>CS</div>
                    </section>
                    <section>
                        <section>
                            {spells}
                        </section>

                        <div>SPELLS</div>

                    </section>

                </section>
                <section className={"section-c"}>
                    {items}
                </section>

            </section>)
        })

        if (matches.length===0){
            matches.push(<div>No Matches Found</div>)
        }
        return matches
    }
}
import React from 'react'
import {AppResources, DataObj} from "../../config";
import {Brain} from "../methods/Brain";
import Matches from "./Matches";
const brain = new Brain();
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            matches:DataObj.data.matchHistory.matchDetails
        }
    }


    render() {
        let top5Matches = brain.getTop5Matches(this.state.matches);
        top5Matches=top5Matches.slice(0,5);
        return (
            <main className={"profile"}>
                <section className={"section-a"}>
                    <section className={"card"}>
                        <div>
                            <img src={AppResources.Ranks[brain.getUserRanks().solo.tier.toLowerCase()]} alt=""/>
                        </div>
                        <section>
                            <div>RANKED SOLO/DUO</div>
                            <div>{brain.getUserRanks().solo.tier.toUpperCase()} {brain.getUserRanks().solo.rank}</div>
                            <div>{brain.getUserRanks().solo.lp} LP</div>
                        </section>


                    </section>
                    <section className={"card"}>
                        <div>
                            <img src={AppResources.Ranks[brain.getUserRanks().tft.tier.toLowerCase()]} alt=""/>
                        </div>
                        <section>
                            <div>TFT</div>
                            <div>{brain.getUserRanks().tft.tier.toUpperCase()} {brain.getUserRanks().tft.rank}</div>
                            <div>{brain.getUserRanks().tft.lp} LP</div>
                        </section>

                    </section>

                    <section className={"card"}>
                        <div>
                            <img src={AppResources.Ranks[brain.getUserRanks().flex.tier.toLowerCase()]} alt=""/>
                        </div>
                        <section>
                            <div>RANKED FLEX</div>
                            <div>{brain.getUserRanks().flex.tier.toUpperCase()} {brain.getUserRanks().flex.rank}</div>
                            <div>{brain.getUserRanks().flex.lp} LP</div>
                        </section>

                    </section>


                </section>
                <section className={"section-b"}>
                    <section className={"kda"}>
                        <div><span>AVERAGE KDA: </span><span style={{color:'green'}}>{brain.getAverageKda().kills}</span>/<span style={{color:'red'}}>{brain.getAverageKda().deaths}</span>/<span style={{color:'aqua'}}>{brain.getAverageKda().assists}</span></div>
                        <section>
                            <div><span>KILLS: </span><span style={{color:'green'}} >{brain.getTotalKda().kills}</span></div>
                            <div><span>DEATHS: </span><span style={{color:'red'}}>{brain.getTotalKda().deaths}</span></div>
                            <div><span>ASSISTS: </span><span style={{color:'aqua'}}>{brain.getTotalKda().assists}</span></div>
                        </section>
                    </section>
                    <Matches matches={top5Matches} top5={true}/>

                </section>

            </main>
        )

    }


}

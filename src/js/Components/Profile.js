import React from 'react'

import {AppResources, DataObj} from "../../config";
import History from "./History";
import {Brain} from "../methods/Brain";
import Matches from "./Matches";

const brain = new Brain();
export default class Profile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const top5Matches = brain.getTop5Matches();
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

/*  <div className={"profile-container"}>
                <div className={"ranked-solo-container"}>
                    <img className={"rank-img"}
                         src={"https://firebasestorage.googleapis.com/v0/b/lol-static.appspot.com/o/ranks%2Fchallenger.webp?alt=media&token=50706d2a-981f-4d3e-992c-5a85aa5c7819"}
                         alt=""/>
                    <div className={"prof-solo-container"}>
                        <div className={"prof-rank-label"}>RANKED SOLO/DUO</div>
                        <div className={"prof-rank-val"}>BRONZE III</div>
                        <div className={"prof-ranked-lp"}>100 LP</div>
                    </div>
                </div>
                <div className={"ranked-solo-container"}>
                    <img className={"rank-img"}
                         src={"https://firebasestorage.googleapis.com/v0/b/lol-static.appspot.com/o/ranks%2Fchallenger.webp?alt=media&token=50706d2a-981f-4d3e-992c-5a85aa5c7819"}
                         alt=""/>
                    <div className={"prof-solo-container"}>
                        <div className={"prof-rank-label"}>RANKED SOLO/DUO</div>
                        <div className={"prof-rank-val"}>BRONZE III</div>
                        <div className={"prof-ranked-lp"}>100 LP</div>
                    </div>
                </div>
                <div className={"ranked-solo-container"}>
                    <img className={"rank-img"}
                         src={"https://firebasestorage.googleapis.com/v0/b/lol-static.appspot.com/o/ranks%2Fchallenger.webp?alt=media&token=50706d2a-981f-4d3e-992c-5a85aa5c7819"}
                         alt=""/>
                    <div className={"prof-solo-container"}>
                        <div className={"prof-rank-label"}>RANKED SOLO/DUO</div>
                        <div className={"prof-rank-val"}>BRONZE III</div>
                        <div className={"prof-ranked-lp"}>100 LP</div>
                    </div>
                </div>
                <div className={"prof-kda-calc"}>
                    <div className={"prof-box-bg"}/>

                    <div className={"kda-calc-label"}>KDA:</div>
                    <div className={"kda-calc-value"}><span className={"kills"}>2000</span></div>
                </div>
                <div className={"prof-kda-container"}>
                    <div className={"prof-kda-box"}>
                        <div className={"prof-box-bg"}/>
                        <div className={"prof-kda-label"}>KILLS:</div>
                        <div className={"prof-kda-value"}><span className={"kills"}>200</span></div>
                    </div>


                    <div className={"prof-kda-box"}>
                        <div className={"prof-box-bg"}/>

                        <div className={"prof-kda-label"}>DEATHS:</div>
                        <div className={"prof-kda-value"}><span className={"deaths"}>1000</span></div>
                    </div>

                    <div className={"prof-kda-box"}>
                        <div className={"prof-box-bg"}/>

                        <div className={"prof-kda-label"}>ASSISTS:</div>
                        <div className={"prof-kda-value"}><span className={"assists"}>1500</span></div>
                    </div>
                </div>
                <div className={"profile-top-Matches"}>

                    {filter.showMatchHistory(4)}

                </div>


            </div>*/
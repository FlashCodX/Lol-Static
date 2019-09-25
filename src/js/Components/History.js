import React from 'react'
import {DataObj} from "../../config";
import {Brain} from '../methods/Brain'
import Matches from "./Matches";


const brain = new Brain();
export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: DataObj.data.matchHistory.matchDetails,
            currentlyShowing: 5,
            text: '',
            gameType: 'All',

        }
    }

    componentDidMount() {
        this.search()
    }

    onInputChange(e) {
        this.setState({text: e.target.value}, () => {
            this.search()

        })
    }

    onGameChange(e) {
        this.setState({gameType: e.target.value}, () => {
            this.search()
        })
    }

    search() {
        let matches = [];
        DataObj.data.matchHistory.matchDetails.forEach((game) => {
            const championName = brain.getChampionInfoById(brain.getMyPlayer(game).champion['championId'])['name'].toLowerCase();
            if (championName.includes(this.state.text.toLowerCase()) || this.state.text === '') {
                if (this.state.gameType==='All'){
                    matches.push(game)
                }else {
                    switch (this.state.gameType) {
                        case "Normal":
                            if (brain.getGameType(game)==='NORMAL DRAFT'){
                                matches.push(game)
                            }
                            break;
                            case "Aram":
                                if (brain.getGameType(game)==='ARAM 5V5'){
                                    matches.push(game)
                                }
                                break;
                        case 'Ranked':
                            if (brain.getGameType(game)==='RANKED SOLO'){
                                matches.push(game)
                            }
                            break;
                        case 'Tft':
                            if (brain.getGameType(game)==='NORMAL TFT'){
                                matches.push(game)
                            }
                            break;
                        case 'RankedTft':
                            if (brain.getGameType(game)==='RANKED TFT'){
                                matches.push(game)
                            }
                            break;

                        case 'Flex5v5':
                            if (brain.getGameType(game)==='FLEX 5V5'){
                                matches.push(game)
                            }
                            break;

                        case 'Flex3v3':
                            if (brain.getGameType(game)==='FLEX 3V3'){
                                matches.push(game)
                            }
                            break;

                    }
                }

            }
        });
        this.setState({matches: matches})
    }

    render() {
        return (
            <main className={"history"}>
                <main className={"filter"}>
                    <section className={"filter-box"}>
                        <div>FILTER</div>
                        <section>
                            <label>BY Champion</label>
                            <section>
                                <i className="fas fa-search"/>
                                <input type="text" onChange={(e) => this.onInputChange(e)}
                                       placeholder={"Champion ..."}/>
                            </section>
                        </section>

                        <section>
                            <label>BY Game Type</label>
                            <section>
                                <select onChange={(e) => this.onGameChange(e)} name="#" id="">
                                    <option value="All">ALL</option>
                                    <option value="Normal">NORMAL</option>
                                    <option value="Flex5v5">FLEX 5V5</option>
                                    <option value="Flex3v3">FLEX 3V3</option>
                                    <option value="Ranked">RANKED</option>
                                    <option value="Aram">ARAM</option>
                                    <option value="RankedTft">RANKED TFT</option>
                                    <option value="Tft">NORMAL TFT</option>
                                </select>
                            </section>
                        </section>
                        <section>

                        </section>

                    </section>

                </main>
                <Matches matches={this.state.matches} key={Date.now() + Math.random() * 1000} top5={false}
                         index={this.state.currentlyShowing}/>
            </main>
        )
    }


}
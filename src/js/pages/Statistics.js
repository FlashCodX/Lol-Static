import React from 'react'
import Records from "../Components/Records";
import Matches from "../Components/History";
import Live from "../Components/Live";
import Profile from "../Components/Profile";
import {AppResources, DataObj} from "../../config";
import {Redirect} from "react-router-dom";
import axios from 'axios'
import {Conversors} from "../methods/Conversors";
import {Brain} from "../methods/Brain";
import {Info} from "../methods/Info";
import ReactTooltip from "react-tooltip";

const info = new Info();
const conversor = new Conversors();
const brain = new Brain();
export default class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'PROFILE',
            percentage: '0%',
            matches: 10,
            ready: false
        }

    }


    getAllMatches() {
        axios.get('https://lolstatic.netlify.com/.netlify/functions/getMoreMatches?id=' + DataObj.data.accountDetails['accountId'] + '&server=' + 'euw1&index=' + DataObj.data.matchHistory.matchDetails.length).then((matches) => {
            matches.data['matches'].map((game) => {
                DataObj.data.matchHistory.matches.push(game)
            })

            matches.data['matchDetails'].map((game) => {
                if (DataObj.data.matchHistory.matchDetails.length !== DataObj.data.totalGames) {

                    DataObj.data.matchHistory.matchDetails.push(game)
                } else {
                    this.setState({ready: true})
                }

            })
            if (DataObj.data.totalGames !== DataObj.data.matchHistory.matchDetails.length) {
                this.getAllMatches()
            }
            let percentage = DataObj.data.matchHistory.matchDetails.length * 100 / DataObj.data.totalGames;
            this.setState({matches: DataObj.data.matchHistory.matchDetails.length, percentage: percentage + '%'})


        }).catch((error) => {
        })
    }

    componentDidMount() {
        if (DataObj.data.totalGames !== DataObj.data.matchHistory.matchDetails.length) {
            if (DataObj.data.valid) {
                this.getAllMatches()
            }

        }
    }


    Controller() {
        switch (this.state.selected) {
            case 'PROFILE':
                return (
                    <Profile key={Date.now()}/>
                )
                break;
            case 'LIVE':
                return (
                    <Live isLive={true}/>
                )
                break;

            case 'RECORDS':
                return (
                    <Records key={Date.now()} ready={this.state.ready}/>
                )
                break;
            case 'MATCHES':
                return (
                    <Matches/>
                )
                break;
            case 'REDIRECT':
                return (
                    <Redirect to={'/'}/>
                )
        }
    }


    render() {
        if (DataObj.data.valid) {
            const url = "url('" + AppResources.Defaults['background'] + "')";
            const champInfo = brain.getChampionInfoById(DataObj.data.topChampions[0]['championId']);
            const champUrl = "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champInfo['id'] + "_0.jpg')";
            const MostPlayedLanes = brain.getMainLanes()
            return (
                <div>
                    <main className={"statistics"}>
                        <ReactTooltip className={"tooltip"}/>
                        <div style={{backgroundImage: url}} className={"bg"}/>
                        <section className={"header"}>
                            <div className={"profile-bg"} style={{backgroundImage: champUrl}}/>
                            <section className={"left"}>

                                <div>
                                    <section>
                                        <div>
                                            <div className={"progress"} style={{width: this.state.percentage}}/>
                                            <div
                                                className={"progress-Matches"}>{this.state.matches} OF {DataObj.data.totalGames} MATCHES
                                            </div>
                                        </div>
                                    </section>
                                    <img src={brain.getProfileIconUrl(DataObj.data.accountDetails['profileIconId'])}
                                         alt=""/>

                                </div>
                                <section>
                                    <label>{DataObj.data.username}</label>
                                    <section>
                                        <div></div>
                                        <section>
                                            <img src={""} alt=""/>
                                        </section>
                                    </section>


                                </section>
                            </section>

                            <section className={"mid"}>

                                <img src={AppResources.Ranks[brain.getUserRanks().solo.tier.toLowerCase()]} alt=""/>
                                <div> {(brain.getUserRanks().solo.tier === 'unranked') ? 'UNRANKED' : brain.getUserRanks().solo.tier + " " + brain.getUserRanks().solo.rank}</div>
                                <div>{conversor.beautify(DataObj.data.topChampions[0]['championPoints'])} PTS</div>
                                <div>{info.getChampionInfoById(DataObj.data.topChampions[0]['championId'])['name']}</div>
                            </section>
                            <section className={"right"}>
                                {this.getTopChamps()}

                            </section>
                        </section>
                        <section className={"nav"}>
                            <div onClick={() => {
                                this.setState({selected: 'PROFILE'})
                            }}>PROFILE
                            </div>
                            <div onClick={() => {
                                this.setState({selected: 'LIVE'})
                            }}>LIVE
                            </div>
                            <div onClick={() => {
                                this.setState({selected: 'RECORDS'})
                            }}>RECORDS
                            </div>
                            <div onClick={() => {
                                this.setState({selected: 'MATCHES'})
                            }}>MATCHES
                            </div>
                        </section>

                        {this.Controller()}

                    </main>

                </div>

            )
        } else {
            return (
                <Redirect to={'/'}/>
            )
        }


    }

    getTopChamps() {
        let images = []
        const Top5 = brain.getTopChampions()
        Top5.map((champ) => {
            images.push(<img key={champ['id']}
                             src={'http://ddragon.leagueoflegends.com/cdn/' + AppResources.PatchVersion + '/img/champion/' + champ['id'] + '.png'}
                             alt=""/>)
        })
        return images
    }
}

import React from 'react'
import {AppResources, DataObj} from "../../config";
import {Redirect} from "react-router-dom";
import 'aos/dist/aos.css';
import {UrlsExtract} from "../methods/UrlsExtract";
import {Info} from "../methods/Info";
import ReactTooltip from 'react-tooltip';
import axios from "axios";


const info = new Info();
const UrlExtract = new UrlsExtract();
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            freeChampions: [],
            username: '',
            server: 'euw1',
            redirect: 'RECORDS',
            errormsg: 'Username Not Found',
            loading:false
        }
        console.log(AppResources)
    }


    renderRoles(info) {
        let roles = []
        info['tags'].forEach((role) => {
            roles.push(
                <img key={role} data-tip={role} src={AppResources.Roles[role.toLowerCase()] + ".png"} alt=""/>)
        });
        return roles

    }

    renderChampions() {
        let freeChampions = [];
        AppResources.FreeChampions.map((champ) => {
            const url = UrlExtract.getChampionUrls(champ);
            const Info = info.getChampionInfoById(champ);
            freeChampions.push(
                <div key={Info['key']}>
                    <img src={url.loading} alt=""/>
                    <section className={"roles"}>
                        {this.renderRoles(Info)}
                    </section>
                    <label>{Info['name']}</label>


                </div>
            )
        });
        return freeChampions
    }

    onNameChange(e) {
        console.log(e.target.value)
        this.setState({username: e.target.value})
    }

    onServerChange(e) {
        console.log(e.target.value)
        this.setState({server: e.target.value})
    }


    makePlayerSearch() {
        this.setState({loading:true})
        axios.get('https://lolstatic.netlify.com/.netlify/functions/searchSummoner?name=' + this.state.username + '&server=' + this.state.server).then((data) => {
            console.log(data)
            DataObj.data = data.data
            this.setState({loading:false})
            if (!data.data.valid) {
                document.getElementById('error').style.display = 'block'

            } else {
                document.getElementById('error').style.display = 'hidden'
                this.setState({redirect: 'Statistics'})

            }

        }).catch((error) => {
            console.log(error)
            this.setState({loading:false})

        })
    }

    render() {
        const url = "url('" + AppResources.Defaults['background'] + "')";
        return (

            <div className={"home"}>
                <div style={{backgroundImage: url}} className={"bg"}/>
                <ReactTooltip className={"tooltip"}/>
                {(this.state.redirect === "Statistics") ? <Redirect to={'/statistics'}/> :


                    <section className={"content-wrapper"}>
                        <header>
                            League Of Legends Summoners&Game Statistics
                        </header>
                        <section className={"section-a"}>
                            <input type={"text"} placeholder={"Summoner Name"}
                                   onChange={(e) => this.onNameChange(e)}/>
                            <select name="server" id="server" onChange={(e) => this.onServerChange(e)}>
                                <option value="EUW1">EUW</option>
                                <option value="RU">RU</option>
                                <option value="KR">KR</option>
                                <option value="OC1">OC</option>
                                <option value="BR1">BR</option>
                                <option value="NA1">NA</option>
                                <option value="EUN1">EUN</option>
                                <option value="TR1">TR</option>
                            </select>
                            <a href="#" onClick={() => this.makePlayerSearch()}><i className="fas fa-search"/></a>
                            <label id={"error"}><i className="fas fa-exclamation"/>{this.state.errormsg}</label>
                            {(this.state.loading) ?
                                <div className={"loading"}><img src={AppResources.Defaults.loading}
                                                                               alt=""/></div>
                                : null}


                        </section>

                        <section className={"section-b"}>
                            <label>FREE CHAMPION ROTATION</label>
                            <section className={"section-b1"}>
                                {this.renderChampions()}

                            </section>

                        </section>
                    </section>
                }

            </div>


        )
    }
}
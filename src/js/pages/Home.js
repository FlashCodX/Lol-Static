import React from 'react'
import {AppResources, DataObj} from "../../config";
import {Redirect} from "react-router-dom";
import 'aos/dist/aos.css';
import {UrlsExtract} from "../methods/UrlsExtract";
import {Info} from "../methods/Info";
import ReactTooltip from 'react-tooltip';
import axios from "axios";
import {debuger} from "../debug";

const background = require('./../../res/defaults/background.jpg');
const loading = require('./../../res/defaults/loading.gif');

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
            loading: false
        }
    }


    renderRoles(info) {
        let roles = [];
        info['tags'].forEach((role) => {
            roles.push(
                <img key={Info['key']+role} data-tip={role} src={AppResources.Roles[role.toLowerCase()]} alt=""/>)
        });
        return roles

    }

    renderChampions() {
        let freeChampions = [];
        AppResources.FreeChampions.forEach((champ) => {
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

    checkEnter(e){
        if (e.keyCode===13){
            this.makePlayerSearch()
        }
    }

    onNameChange(e) {
        this.setState({username: e.target.value})
    }

    onServerChange(e) {
        this.setState({server: e.target.value})
    }


    makePlayerSearch() {

        if (!this.state.loading) {
            this.setState({loading: true});
            axios.get(debuger.url + '.netlify/functions/searchSummoner?name=' + this.state.username + '&server=' + this.state.server).then((data) => {
                DataObj.data = data.data;
                DataObj.data.Server=this.state.server
                this.setState({loading: false});
                if (!data.data.valid) {
                    this.setState({errormsg:'Username Not Found'});
                    document.getElementById('error').style.display = 'block'
                } else {
                    document.getElementById('error').style.display = 'hidden';
                    this.setState({redirect: 'Statistics'})

                }

            }).catch(()=>{
                this.setState({loading: false});
                this.setState({errormsg:'Server Error'});
                document.getElementById('error').style.display = 'block'


            })
        }

    }

    render() {
        const url = "url('" +background+ "')";
        return (
            <div className={"home"}>
                <div style={{background: url}} className={"bg"}/>
                <ReactTooltip className={"tooltip"}/>
                {(this.state.redirect === "Statistics") ? <Redirect to={'/statistics'}/> :

                    <section className={"content-wrapper"}>
                        <header>
                            League Of Legends Summoners&Game Statistics
                        </header>
                        <section className={"section-a"}>
                            <input type={"text"} placeholder={"Summoner Name"} onKeyDown={(e)=>this.checkEnter(e)}
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
                            <div onClick={() => this.makePlayerSearch()}><i className="fas fa-search"/></div>
                            <label id={"error"}><i className="fas fa-exclamation"/>{this.state.errormsg}</label>
                            {(this.state.loading) ?
                                <div className={"loading"}><img src={loading}
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
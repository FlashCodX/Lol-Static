import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './css/index.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./js/pages/Home";
import Statistics from "./js/pages/Statistics";
import Error from "./js/pages/Error";
import axios from 'axios'
import {AppResources} from "./config";
import {debuger} from "./js/debug";


const RiotResources = ['champion.json', 'item.json', 'summoner.json', 'profileicon.json'];
const ranks = ['bronze', 'silver', 'master', 'challenger', 'diamond', 'gold', 'iron', 'platinum', 'grandmaster', 'unranked'];
const roles = ['bottom', 'middle', 'jungle', 'support', 'top', 'mage', 'assassin', 'fighter', 'marksman', 'tank'];
const masteries = ['lv0.webp', 'lv1.png', 'lv2.png', 'lv3.png', 'lv4.png', 'lv5.png', 'lv6.png', 'lv7.png'];



roles.forEach((role) => {
    AppResources.Roles[role] = require(`./res/lanes/${role}.png`)
});

ranks.forEach((rank) => {
    AppResources.Ranks[rank] = require(`./res/ranks/${rank}.webp`)
});

for (let i = 0; i < masteries.length; i++) {
    AppResources.Masteries[(masteries[i] + i).split('.')[0]] = require(`./res/masteries/${masteries[i]}`)
}



axios.get('https://ddragon.leagueoflegends.com/realms/na.json').then((server) => {
    AppResources.PatchVersion = server.data['v'];
    RiotResources.map(async (dt) => {
        await axios.get('https://ddragon.leagueoflegends.com/cdn/' + server.data['v'] + '/data/en_US/' + dt).then((data) => {
            const propName = dt.split('.')[0];
            AppResources[propName] = data.data
        })
    })
});


axios.get(debuger.url + '.netlify/functions/getFreeChampions?server=euw1').then((champs) => {
    AppResources.FreeChampions = champs.data['freeChampionIds'];
            ReactDOM.render(
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/'} component={Home}/>
                        <Route exact path={'/statistics'} component={Statistics}/>
                        <Route component={Error}/>
                    </Switch>
                </BrowserRouter>
                , document.getElementById('root'));




});


serviceWorker.register();

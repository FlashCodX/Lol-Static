import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './css/index.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./js/pages/Home";
import Statistics from "./js/pages/Statistics";
import Error from "./js/pages/Error";
import axios from 'axios'
import {DataObj ,AppResources} from "./config";
import {debuger} from "./js/debug";
import {config} from "./config";
import firebase from "firebase";
firebase.initializeApp(config)


const RiotResources = ['champion.json', 'item.json', 'summoner.json','profileicon.json']
const ranks = ['bronze', 'silver', 'master', 'challenger', 'diamond', 'gold', 'iron', 'platinum', 'grandmaster', 'unranked']
const roles = ['bottom', 'middle', 'jungle', 'support', 'top', 'mage', 'assassin', 'fighter', 'marksman', 'tank']
const masteries = ['lv0.webp','lv1.png','lv2.png','lv3.png','lv4.png','lv5.png','lv6.png','lv7.png']


const defaults = ['background.jpg', 'loading.gif']


Promise.all(ranks.map( async (rank) => {
    return await firebase.apps[0].storage('gs://lol-static.appspot.com/').ref('ranks/' + rank + '.webp').getDownloadURL().then((url) => {
        AppResources.Ranks[rank]=url
    })
}))


Promise.all(roles.map(async (lane) => {
    return await firebase.apps[0].storage('gs://lol-static.appspot.com/').ref('lanes/' + lane + '.png').getDownloadURL().then((url) => {
        AppResources.Roles[lane]=url
    })
}));

for (let i = 0; i < masteries.length; i++) {
    firebase.apps[0].storage('gs://lol-static.appspot.com/').ref('masteries/'+masteries[i]).getDownloadURL().then((url) => {
        AppResources.Masteries[masteries[i].split('.')[0]]=url
    })
}




axios.get('https://ddragon.leagueoflegends.com/realms/na.json').then((server) => {
    AppResources.PatchVersion=server.data['v']
    Promise.all(RiotResources.map((dt) => {
        return axios.get('https://ddragon.leagueoflegends.com/cdn/' + server.data['v'] + '/data/en_US/' + dt).then((data) => {
            const propName = dt.split('.')[0]
            AppResources[propName] = data.data

        })
    })).then((_) => {
        Promise.all(defaults.map((el) => {
            return firebase.apps[0].storage('gs://lol-static.appspot.com/').ref('defaults/' + el).getDownloadURL().then((url) => {

                AppResources.Defaults[el.split('.')[0]] = url
            })
        })).then((_) => {
            axios.get(debuger.url+'.netlify/functions/getFreeChampions?server=euw1').then((champs) => {

                AppResources.FreeChampions = champs.data['freeChampionIds']

                    ReactDOM.render(
                        <BrowserRouter>
                            <Switch>
                                <Route exact path={'/'} component={Home}/>
                                <Route exact path={'/statistics'} component={Statistics}/>
                                <Route component={Error}/>
                            </Switch>
                        </BrowserRouter>
                        , document.getElementById('root'));



            })
        })

    }).catch((_) => {
    })
})




serviceWorker.unregister();

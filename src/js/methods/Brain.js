import {AppResources, DataObj} from "../../config";
import React from "react";
import {Conversors} from "./Conversors";
import axios from "axios";
import {UrlsExtract} from "./UrlsExtract";


const conversor = new Conversors()
const Urls = new UrlsExtract();

export class Brain {

    getTopChampions() {
        let info = []
        DataObj.data.topChampions.slice(0, 5).map((champ) => {
            const inf = this.getChampionInfoById(champ['championId'])
            info.push(inf)
        })
        return info
    }

    getChampionInfoById(championId) {
        const ChampionsList = Object.values(AppResources['champion']['data'])
        let Info = {}
        ChampionsList.map((champ) => {

            if (champ['key'].toLocaleString() === championId.toLocaleString()) {
                Info = champ
            }
        })
        return Info
    }


    getChampionStatsByPlayer(player) {
        let championStats = null
        player['mastery'].map((champ) => {
            if (champ['championId'] === player['championId']) {
                championStats = champ
            }
        })

        return championStats
    }


    getMyPlayer(match) {
        let myPlayer = {
            champion: {},
            account: {},
            match: {},
            game: {}
        }
        myPlayer.game = match
        match['participantIdentities'].map((account) => {
            match['participants'].map((champion, i) => {
                if (account['player']['summonerName'].toLowerCase() === DataObj.data.username.toLowerCase()) {
                    if (account['participantId'].toLocaleString() === champion['participantId'].toLocaleString()) {
                        myPlayer.champion = champion
                        myPlayer.account = account
                        myPlayer.match = match

                    }

                }
            })
        })
        return myPlayer


    }


    getTotalKda() {
        let totalKda = {
            kills: 0,
            deaths: 0,
            assists: 0
        }

        DataObj.data.matchHistory.matchDetails.map((match) => {

            totalKda.kills += this.getMyPlayer(match).champion['stats']['kills']
            totalKda.deaths += this.getMyPlayer(match).champion['stats']['deaths']
            totalKda.assists += this.getMyPlayer(match).champion['stats']['assists']

        })

        return totalKda
    }


    getTop5Matches() {
        console.log("called")
        const Top5 = DataObj.data.matchHistory.matchDetails
        Top5.sort((a, b) => {
            const kdaA = (this.getMyPlayer(a).champion['stats']['kills'] + this.getMyPlayer(a).champion['stats']['assists']) / ((this.getMyPlayer(a).champion['stats']['deaths'] === 0) ? 1 : this.getMyPlayer(a).champion['stats']['deaths'])
            const kdaB = (this.getMyPlayer(b).champion['stats']['kills'] + this.getMyPlayer(b).champion['stats']['assists']) / ((this.getMyPlayer(b).champion['stats']['deaths'] === 0) ? 1 : this.getMyPlayer(b).champion['stats']['deaths'])

            return kdaB - kdaA

        })
        const slice = Top5.splice(0, 5)

        return slice
    }

    getAverageKda() {
        let averageKda = {
            kills: 0,
            deaths: 0,
            assists: 0
        }
        DataObj.data.matchHistory.matchDetails.map((match) => {
            averageKda.kills += this.getMyPlayer(match).champion['stats']['kills']
            averageKda.deaths += this.getMyPlayer(match).champion['stats']['deaths']
            averageKda.assists += this.getMyPlayer(match).champion['stats']['assists']
        })

        averageKda.kills = Math.round(averageKda.kills / DataObj.data.matchHistory.matchDetails.length)
        averageKda.deaths = Math.round(averageKda.deaths / DataObj.data.matchHistory.matchDetails.length)
        averageKda.assists = Math.round(averageKda.assists / DataObj.data.matchHistory.matchDetails.length)

        return averageKda

    }


    getUserRanksByPlayer(ranksData) {
        console.log(ranksData)
        console.log(ranksData)
        let ranks = {
            unrankedAll: false,
            solo: {
                tier: 'unranked',
                rank: '',
                lp: 0,
                wins: 0,
                losses: 0
            },
            tft: {
                tier: 'unranked',
                rank: '',
                lp: 0
            },
            flex: {
                tier: 'unranked',
                rank: '',
                lp: 0
            }
        }

        if (ranksData) {
            if (ranksData['RANKED_SOLO_5x5']) {
                ranks.solo.rank = ranksData['RANKED_SOLO_5x5']['rank']
                ranks.solo.lp = ranksData['RANKED_SOLO_5x5']['leaguePoints']
                ranks.solo.tier = ranksData['RANKED_SOLO_5x5']['tier']
                ranks.solo.unranked = false
                ranks.solo.wins = ranksData['RANKED_SOLO_5x5']['wins']
                ranks.solo.losses = ranksData['RANKED_SOLO_5x5']['losses']

            }
            if (ranksData['RANKED_FLEX_TT']) {
                ranks.flex.rank = ranksData['RANKED_FLEX_TT']['rank']
                ranks.flex.lp = ranksData['RANKED_FLEX_TT']['leaguePoints']
                ranks.flex.tier = ranksData['RANKED_FLEX_TT']['tier']
                ranks.flex.unranked = false
            }
            if (ranksData['RANKED_TFT']) {

                ranks.tft.rank = ranksData['RANKED_TFT']['rank']
                ranks.tft.lp = ranksData['RANKED_TFT']['leaguePoints']
                ranks.tft.tier = ranksData['RANKED_TFT']['tier']
                ranks.tft.unranked = false
            }
        } else {
            ranks.unrankedAll = true
        }
        console.log(ranks)
        return ranks
    }

    getUserRanks() {
        let ranks = {
            unrankedAll: false,
            solo: {
                tier: 'unranked',
                rank: '',
                lp: 0
            },
            tft: {
                tier: 'unranked',
                rank: '',
                lp: 0
            },
            flex: {
                tier: 'unranked',
                rank: '',
                lp: 0
            }
        }
        if (DataObj.data.ranks) {
            if (DataObj.data.ranks['RANKED_SOLO_5x5']) {
                ranks.solo.rank = DataObj.data.ranks['RANKED_SOLO_5x5']['rank']
                ranks.solo.lp = DataObj.data.ranks['RANKED_SOLO_5x5']['leaguePoints']
                ranks.solo.tier = DataObj.data.ranks['RANKED_SOLO_5x5']['tier']
                ranks.solo.unranked = false
            }
            if (DataObj.data.ranks['RANKED_FLEX_TT']) {
                ranks.flex.rank = DataObj.data.ranks['RANKED_FLEX_TT']['rank']
                ranks.flex.lp = DataObj.data.ranks['RANKED_FLEX_TT']['leaguePoints']
                ranks.flex.tier = DataObj.data.ranks['RANKED_FLEX_TT']['tier']
                ranks.flex.unranked = false
            }
            if (DataObj.data.ranks['RANKED_TFT']) {
                ranks.tft.rank = DataObj.data.ranks['RANKED_TFT']['rank']
                ranks.tft.lp = DataObj.data.ranks['RANKED_TFT']['leaguePoints']
                ranks.tft.tier = DataObj.data.ranks['RANKED_TFT']['tier']
                ranks.tft.unranked = false
            }
        } else {
            ranks.unrankedAll = true
        }
        return ranks
    }

    getItems(stats) {
        let items = []
        let counter = 0
        for (let i = 0; i <= 6; i++) {
            if (stats['item' + [i]] !== 0) {

                items.push(<img key={stats['item' + [i]]}
                                src={'https://ddragon.leagueoflegends.com/cdn/' + AppResources.PatchVersion + '/img/item/' + stats['item' + [i]] + '.png'}
                                alt=""/>)

            } else {
                counter++
            }
        }
        for (let i = 0; i <= counter; i++) {
            items.push(<div key={i + Date.now()} className={"no-item"}/>)
        }
        return items
    }


    sortDetails() {
        DataObj.data.matchHistory.matchDetails.sort(function (a, b) {
            return a['gameCreation'] - b['gameCreation']
        })
    }

    sortMatches() {
        DataObj.data.matchHistory.matches.sort(function (a, b) {
            return b['gameCreation'] - a['gameCreation']
        })
    }

    getTimeDiference(match) {
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;

        const elapsed = Date.now() - match['gameCreation'];

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        } else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    }

    getGameType(match) {
        let gameType = ''
        switch (match['queueId']) {
            case 430:
                gameType = 'BLIND 5V5';
                break;
            case 420:
                gameType = 'RANKED SOLO'
                break;
            case 400:
                gameType = 'NORMAL DRAFT'
                break;
            case 450:
                gameType = 'ARAM 5V5'
                break;
            case 1090:
                gameType = 'NORMAL TFT'
                break;
            case 1100:
                gameType = 'RANKED TFT'
                break;
            case 440:
                gameType = 'FLEX 5V5'
                break;
            case 470:
                gameType = 'FLEX 3V3'
                break;

        }
        return gameType
    }


    getPlayerSpells(player) {
        let spells = []
        const spellsList = Object.values(AppResources['summoner']['data'])
        for (let i = 1; i <= 2; i++) {
            spellsList.map((spell) => {
                if (spell['key'].toLocaleString() === player['spell' + i + 'Id'].toLocaleString()) {
                    spells.push(<img key={player['spell' + i + 'Id']}
                                     src={"https://ddragon.leagueoflegends.com/cdn/" + AppResources.PatchVersion + "/img/spell/" + spell['id'] + ".png"}
                                     alt=""/>)
                }
            })
        }
        return spells

    }


    getMainLanes() {

        let lanes = [{jungle: 0}, {bottom: 0}, {top: 0}, {support: 0}, {mid: 0}]
        let imgs = []

        DataObj.data.matchHistory.matches.map((game) => {
            if (game['lane'] !== 'NONE') {
                const lane = game['lane'].toLocaleString().toLowerCase()
                lanes.map((l, i) => {
                    if (Object.keys(l).toLocaleString() === lane) {
                        const oldVal = lanes[i][lane];
                        lanes[i][lane] = oldVal + 1
                    }
                })


            }
        })

        console.log(lanes)


    }


    getProfileIconUrl(iconId) {
        return 'https://ddragon.leagueoflegends.com/cdn/' + AppResources.PatchVersion + '/img/profileicon/' + AppResources['profileicon']['data'][iconId]['image']['full']
    }


    getgameResult(match, player) {
        let gameResult = ''
        match['teams'].map((team) => {
            if (team['teamId'] === player['champion']['teamId']) {
                if (team['win'] === "Win") {
                    gameResult = 'VICTORY'

                } else {
                    gameResult = 'DEFEAT'

                }
            }
        })

        return gameResult
    }


    getMatchResult(match, player) {
        let gameResult = ''
        match['teams'].map((team) => {
            if (team['teamId'] === player['teamId']) {
                if (team['win'] === "Win") {
                    gameResult = 'VICTORY'

                } else {
                    gameResult = 'DEFEAT'

                }
            }
        })

        return gameResult

    }

    splitLiveTeams() {
        let teams = {
            blue: [],
            red: [],
            blueTeamBans: [],
            redTeamBans: []
        }

        DataObj.data.liveMatchDetails['bannedChampions'].map((ban) => {
            switch (ban['teamId']) {
                case 100:
                    teams.blueTeamBans.push(ban)
                    break;
                case 200:
                    teams.redTeamBans.push(ban)
                    break;

            }
        })

        DataObj.data.liveMatchDetails['participants'].map((player) => {
            switch (player['teamId']) {
                case 100:
                    teams.blue.push(player)
                    break;
                case 200:
                    teams.red.push(player)

            }
        })

        return teams
    }


    splitTeamsByMatch(match) {
        let teams = {
            teamBlue: [],
            teamRed: [],
            teamBlueDetails: [],
            teamRedDetails: []
        }
        match['teams'].map((team) => {
            switch (team['teamId']) {
                case 100:
                    teams.teamBlueDetails = team
                    break;
                case 200:
                    teams.teamRedDetails = team
            }
            teams.teamBlueDetails['totalGold'] = 0
            teams.teamRedDetails['totalGold'] = 0

            teams.teamBlueDetails['kills'] = 0
            teams.teamBlueDetails['deaths'] = 0
            teams.teamBlueDetails['assists'] = 0

            teams.teamRedDetails['kills'] = 0
            teams.teamRedDetails['deaths'] = 0
            teams.teamRedDetails['assists'] = 0

        })
        match['participants'].map((player) => {
            match['participantIdentities'].map((id) => {
                if (player['participantId'] === id['participantId']) {
                    switch (player['teamId']) {
                        case 100:
                            teams.teamBlueDetails['kills'] += player['stats']['kills']
                            teams.teamBlueDetails['deaths'] += player['stats']['deaths']
                            teams.teamBlueDetails['assists'] += player['stats']['assists']

                            teams.teamBlueDetails['totalGold'] += player['stats']['goldEarned']
                            const champion = this.getChampionInfoById(player['championId'])
                            const spells = this.getPlayerSpells(player)
                            const items = this.getItems(player['stats'])
                            console.log(player)
                            teams.teamBlue.push(<section>
                                <img key={champion['id']}
                                     src={'http://ddragon.leagueoflegends.com/cdn/' + AppResources.PatchVersion + '/img/champion/' + champion['id'] + '.png'}
                                     alt=""/>
                                <div>{id['player']['summonerName']}</div>
                                <section className={"spells"}>
                                    {spells}
                                </section>
                                <section className={"items"}>
                                    {items}
                                </section>
                                <section>
                                    <div>KDA</div>
                                    <div><span style={{color: 'green'}}>{player['stats']['kills']}</span>/<span
                                        style={{color: 'red'}}>{player['stats']['deaths']}</span>/<span
                                        style={{color: 'aqua'}}>{player['stats']['assists']}</span></div>
                                </section>
                                <section>
                                    <div>CS</div>
                                    <div
                                        style={{color: 'green'}}>{player['stats']['neutralMinionsKilled'] + player['stats']['totalMinionsKilled']}</div>
                                </section>
                                <section>
                                    <div>WARDS</div>
                                    <div style={{color: 'green'}}>{player['stats']['wardsPlaced']}</div>
                                </section>
                                <section>
                                    <div>DMG</div>
                                    <div
                                        style={{color: 'red'}}>{conversor.beautify(player['stats']['totalDamageDealtToChampions'])}</div>
                                </section>
                            </section>)

                            break;
                        case 200:
                            teams.teamRedDetails['totalGold'] += player['stats']['goldEarned']

                            teams.teamRedDetails['kills'] += player['stats']['kills']
                            teams.teamRedDetails['deaths'] += player['stats']['deaths']
                            teams.teamRedDetails['assists'] += player['stats']['assists']
                            const champion2 = this.getChampionInfoById(player['championId'])
                            const spells2 = this.getPlayerSpells(player)
                            const items2 = this.getItems(player['stats'])
                            console.log(player)
                            teams.teamRed.push(<section>
                                <img key={champion2['id']}
                                     src={'http://ddragon.leagueoflegends.com/cdn/' + AppResources.PatchVersion + '/img/champion/' + champion2['id'] + '.png'}
                                     alt=""/>
                                <div>{id['player']['summonerName']}</div>
                                <section className={"spells"}>
                                    {spells2}
                                </section>
                                <section className={"items"}>
                                    {items2}
                                </section>
                                <section>
                                    <div>KDA</div>
                                    <div><span style={{color: 'green'}}>{player['stats']['kills']}</span>/<span
                                        style={{color: 'red'}}>{player['stats']['deaths']}</span>/<span
                                        style={{color: 'aqua'}}>{player['stats']['assists']}</span></div>
                                </section>
                                <section>
                                    <div>CS</div>
                                    <div
                                        style={{color: 'green'}}>{player['stats']['neutralMinionsKilled'] + player['stats']['totalMinionsKilled']}</div>
                                </section>
                                <section>
                                    <div>WARDS</div>
                                    <div style={{color: 'green'}}>{player['stats']['wardsPlaced']}</div>
                                </section>
                                <section>
                                    <div>DMG TO CHAMPS</div>
                                    <div
                                        style={{color: 'red'}}>{conversor.beautify(player['stats']['totalDamageDealtToChampions'])}</div>
                                </section>
                            </section>)

                    }
                }
            })
        })
        return teams

    }


}

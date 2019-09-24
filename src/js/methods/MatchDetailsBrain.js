import {Brain} from "./Brain";
import {AppResources} from "../../config";
import React from "react";

const brain = new Brain();

export class MatchDetailsBrain {




    getTeamData(team) {
        let data = {
            bans: [],
            drakes: 0,
            barons: 0,
            towers: 0,
            result: ''
        }

        team['bans'].map((champ) => {
            const champion = brain.getChampionInfoById(champ['championId'])
            data.bans.push(<img key={champion['id']}
                                src={'http://ddragon.leagueoflegends.com/cdn/' + AppResources.PatchVersion + '/img/champion/' + champion['id'] + '.png'}
                                alt=""/>)
        })
        data.drakes = team['dragonKills']
        data.towers = team['towerKills']
        data.barons = team['baronKills']
        if (team['win'] === "Fail") {
            data.result = 'DEFEAT'
        } else {
            data.result = "VICTORY"
        }

        return data
    }

    getTopWardsPlacedInGame(match) {
        let mostWards = 0
        let user = {
            champion: {},
            account: {}
        }
        match['participants'].map((player) => {
            const wards = player['stats']['wardsPlaced']
            if (wards > mostWards) {
                mostWards = wards
                user.champion = player

            }
        })

        match['participantIdentities'].map((account) => {
            if (account['participantId'] === user.champion['participantId']) {
                user.account = account
            }
        })

        return user
    }

    getTopGoldInGame(match) {
        let mostGold = 0
        let user = {
            champion: {},
            account: {}
        }
        match['participants'].map((player) => {
            const gold = player['stats']['goldEarned']
            if (gold > mostGold) {
                mostGold = gold
                user.champion = player

            }
        })

        match['participantIdentities'].map((account) => {
            if (account['participantId'] === user.champion['participantId']) {
                user.account = account
            }
        })

        return user
    }

    getHighestKdaInGame(match) {
        let highestKda = 0
        let user = {
            champion: {},
            account: {},
            kda: 0
        }
        match['participants'].map((player) => {
            const kills = player['stats']['kills']
            const deaths = player['stats']['deaths']
            const assists = player['stats']['assists']
            const kda = assists + kills / ((deaths === 0) ? 1 : deaths)
            if (kda > highestKda) {
                highestKda = kda
                user.champion = player
                user.kda = kda
            }
        })

        match['participantIdentities'].map((account) => {
            if (account['participantId'] === user.champion['participantId']) {
                user.account = account
            }
        })

        return user
    }


    getTopCsInGame(match) {
        let mostCs = 0
        let user = {
            champion: {},
            account: {}
        }
        match['participants'].map((player) => {
            const cs = player['stats']['totalMinionsKilled'] + player['stats']['neutralMinionsKilled'];
            if (cs > mostCs) {
                mostCs = cs
                user.champion = player
                user.champion['totalCs'] = mostCs

            }
        })

        match['participantIdentities'].map((account) => {
            if (account['participantId'] === user.champion['participantId']) {
                user.account = account
            }
        })

        return user

    }

    getTopDamageInGame(match) {
        let mosDmg = 0
        let user = {
            champion: {},
            account: {}
        }
        match['participants'].map((player) => {
            const dmg = player['stats']['totalDamageDealt']
            if (dmg > mosDmg) {
                mosDmg = dmg
                user.champion = player
            }
        })

        match['participantIdentities'].map((account) => {
            if (account['participantId'] === user.champion['participantId']) {
                user.account = account
            }
        })

        return user
    }
}
import {DataObj} from "../../config";
import React from "react";
import {Brain} from "./Brain";

const brain = new Brain()

export class Mrecords {

    getMostDmgToChamps() {
        let old = 0
        let game = ''
        DataObj.data.matchHistory.matchDetails.map((match) => {
            const player = brain.getMyPlayer(match).champion
            const stats = player['stats']
            const dmg = stats['totalDamageDealtToChampions'];
            if (old < dmg) {
                old = dmg
                game = match
            }
        })
        return game

    }


    getMosWardsPlaced() {
        let old = 0
        let game = ''
        DataObj.data.matchHistory.matchDetails.map((match) => {
            const player = brain.getMyPlayer(match).champion
            const stats = player['stats']
            const wards = stats['wardsPlaced'];
            if (old < wards) {
                old = wards
                game = match
            }
        })
        return game
    }

    getMostKills() {
        let old = 0
        let game = ''
        DataObj.data.matchHistory.matchDetails.map((match) => {
            const player = brain.getMyPlayer(match).champion
            const stats = player['stats']
            const kills = stats['kills'];
            if (old < kills) {
                old = kills
                game = match
            }
        })
        return game
    }


    getMostFarm() {
        let old = 0
        let game = ''
        DataObj.data.matchHistory.matchDetails.map((match) => {
            const player = brain.getMyPlayer(match).champion
            const stats = player['stats']
            const farm = stats['neutralMinionsKilled']+stats['totalMinionsKilled'];
            if (old < farm) {
                old = farm
                game = match
            }
        })
        return game
    }


    getMostDeaths() {
        let oldDeaths = 0
        let game = ''
        DataObj.data.matchHistory.matchDetails.map((match) => {
            const player = brain.getMyPlayer(match).champion
            const stats = player['stats']
            const deaths = stats['deaths'];
            if (oldDeaths < deaths) {
                oldDeaths = deaths
                game = match

            }
        })
        return game
    }

    getMostAssists() {
        let oldAssists = 0
        let game = ''
        DataObj.data.matchHistory.matchDetails.map((match) => {
            const player = brain.getMyPlayer(match).champion
            const stats = player['stats']
            const assists = stats['assists'];
            if (oldAssists < assists) {
                oldAssists = assists
                game = match
            }
        })
        return game
    }

    getLongestWinningStreak() {
        let winStreak = 0
        let dt = {
            streak: 0,
            game: ''
        }

//d
        const sorted = DataObj.data.matchHistory.matchDetails.sort(function (a, b) {
            return b['gameCreation'] - a['gameCreation']
        })


        sorted.map((game) => {
            const player = brain.getMyPlayer(game)
            const result = brain.getgameResult(game, player)
            if (result === 'VICTORY') {
                winStreak += 1

            } else {
                if (dt.streak < winStreak) {
                    dt.streak = winStreak
                    dt.game = game

                }
                winStreak = 0


            }

        })

        return dt

    }

    getLongestLosingStreak() {
        let losingStreak = 0
        let dt = {
            streak: 0,
            game: ''
        }


        const sorted = DataObj.data.matchHistory.matchDetails.sort(function (a, b) {
            return b['gameCreation'] - a['gameCreation']
        })


        sorted.map((game) => {
            const player = brain.getMyPlayer(game)
            const result = brain.getgameResult(game, player)
            if (result === 'DEFEAT') {
                losingStreak += 1

            } else {
                if (dt.streak < losingStreak) {
                    dt.streak = losingStreak
                    dt.game = game

                }
                losingStreak = 0


            }

        })

        return dt


    }

    getShortestWin() {
        let dt = {
            duration: 10000,
            game: ''
        }

        const sorted = DataObj.data.matchHistory.matchDetails.sort(function (a, b) {
            return b['gameCreation'] - a['gameCreation']
        })
        sorted.map((game) => {
            const player = brain.getMyPlayer(game)
            const result = brain.getgameResult(game, player)
            if (result === 'VICTORY') {
                if (game['gameDuration']>250){
                    if (dt.duration>game['gameDuration']){
                        dt.duration=game['gameDuration']
                        dt.game=game
                    }
                }
            }

        })

        return dt
    }

    getQuichestLoss() {
        let dt = {
            duration: 10000,
            game: ''
        }

        const sorted = DataObj.data.matchHistory.matchDetails.sort(function (a, b) {
            return b['gameCreation'] - a['gameCreation']
        })
        sorted.map((game) => {
            const player = brain.getMyPlayer(game)
            const result = brain.getgameResult(game, player)
            if (result === 'DEFEAT') {
                if (game['gameDuration']>250){
                    if (dt.duration>game['gameDuration']){
                        dt.duration=game['gameDuration']
                        dt.game=game
                    }
                }
            }

        })

        return dt

    }

    getLongestLoss() {
        let dt = {
            duration: 0,
            game: ''
        }

        const sorted = DataObj.data.matchHistory.matchDetails.sort(function (a, b) {
            return b['gameCreation'] - a['gameCreation']
        })
        sorted.map((game) => {
            const player = brain.getMyPlayer(game)
            const result = brain.getgameResult(game, player)
            if (result === 'DEFEAT') {
                if (game['gameDuration']>250){
                    if (dt.duration<game['gameDuration']){
                        dt.duration=game['gameDuration']
                        dt.game=game
                    }
                }
            }

        })

        return dt

    }

    getLongestGame() {
        let dt = {
            duration: 0,
            game: ''
        }

        const sorted = DataObj.data.matchHistory.matchDetails.sort(function (a, b) {
            return b['gameCreation'] - a['gameCreation']
        })
        sorted.map((game) => {
            if (game['gameDuration']>dt.duration){
                dt.duration=game['gameDuration']
                dt.game=game
            }

        })

        return dt
    }

    getHighestKDA() {
        let oldKda = 0
        let dt = {
            kda: 0,
            game: ''
        }
        DataObj.data.matchHistory.matchDetails.map((match) => {
            const player = brain.getMyPlayer(match).champion
            const stats = player['stats']
            const kda = (stats['assists'] / 3) + stats['kills'] / (stats['deaths'] === 0 ? 1 : stats['deaths'])
            if (oldKda < kda) {
                oldKda = kda
                dt.kda = oldKda
                dt.game = match
            }
        })
        return dt


    }


}
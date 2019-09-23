const functions = require('firebase-functions');
const key = 'RGAPI-c5c2bfc3-cd07-4183-be01-d719c7a6c790';
const Axios = require('axios');


async function getSummonerByName(name, server) {
    return Axios.get('https://' + server + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + key).then((response) => {
        return response.data
    }).catch((error) => {
        throw error.response.status
    })
}

async function getMatchHistoryByAccountId(server, id, index) {
    return Axios.get('https://' + server + '.api.riotgames.com/lol/match/v4/matchlists/by-account/' + id + '?endIndex=' + (parseInt(index) + 10) + '&beginIndex=' + index + '&api_key=' + key,).then((response) => {
        return response.data
    }).catch((error) => {
        throw error.response.status
    })

}

async function getUserRank(id, server) {
    let ranks = {}
    return Axios.get('https://' + server + '.api.riotgames.com/lol/league/v4/entries/by-summoner/' + id + '?api_key=' + key).then((response) => {
        if (response.data.length !== 0) {
            response.data.map((rank) => {
                ranks[rank['queueType']] = rank
            })

        } else {
            ranks = null
        }
        return ranks
    }).catch((error) => {
        throw error.response.status
    })
}

async function getMatchInfoByMatchId(server, id) {
    return Axios.get('https://' + server + '.api.riotgames.com/lol/match/v4/matches/' + id + '?api_key=' + key).then((response) => {
        return response.data
    }).catch((error) => {
        throw error.response.status
    })

}

async function getLiveMatchBySummonerId(id, server) {
    return Axios.get('https://' + server + '.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + id + '?api_key=' + key).then((response) => {
        return response.data
    }).catch((error) => {
        throw error.response.status
    })

}

async function getTopChampions(id, server) {
    return Axios.get('https://' + server + '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + id + '?api_key=' + key).then((response) => {
        return response.data
    }).catch((error) => {
        throw error.response.status
    })
}


async function getFreeRotation(server) {
    return Axios.get('https://' + server + '.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=' + key).then((response) => {
        return response.data
    }).catch((error) => {
        throw error
    })

}

async function search(server, name) {
    const response = {
        valid: false,
        totalGames: 0,
        username: '',
        topChampions: [],
        ranks: [],
        matchHistory: {
            matches: [],
            matchDetails: []
        },
        liveMatch: false,
        liveMatchDetails: {},
        accountDetails: {}
    }
    try {
        const accountDetails = await getSummonerByName(name, server)
        const topChampions = await getTopChampions(accountDetails['id'], server)
        const matchHistory = await getMatchHistoryByAccountId(server, accountDetails['accountId'], 0);

        await Promise.all(matchHistory['matches'].map(async (match) => {
            const details = await getMatchInfoByMatchId(server, match['gameId'])
            response.matchHistory.matchDetails.push(details)
            return details
        }))

        response.matchHistory.matchDetails.sort(function (a, b) {
            return b['gameCreation'] -a['gameCreation']
        })

        try {
            let liveDetails = await getLiveMatchBySummonerId(accountDetails['id'], server)
            await Promise.all(liveDetails['participants'].map(async (player,i) => {
                liveDetails['participants'][i]['userRank'] =await getUserRank(player['summonerId'], server)
                liveDetails['participants'][i]['mastery'] =await getTopChampions(player['summonerId'], server)
                return player
            }))

            response.liveMatch = true
            response.liveMatchDetails = liveDetails
        } catch (e) {
            response.liveMatch = false
        }
        const ranks = await getUserRank(accountDetails['id'], server)

        response.totalGames = matchHistory['totalGames']
        response.matchHistory.matches = matchHistory['matches']
        response.topChampions = topChampions
        response.ranks = ranks
        response.accountDetails = accountDetails
        response.valid = true
        response.username = accountDetails['name']
        return response

    } catch (e) {
        return response
    }

}

async function getMoreMatches(id, server, index) {
    const data = {
        matches: [],
        matchDetails: []
    }
    const matchHistory = await getMatchHistoryByAccountId(server, id, index);

    await Promise.all(matchHistory['matches'].map(async (match) => {
        data.matches.push(match)
        const details = await getMatchInfoByMatchId(server, match['gameId'])
        data.matchDetails.push(details)
        return details
    }))
    return data


}


exports.getChampionRotation = functions.https.onRequest((req, res) => {
    const server = req.query.server
    if (server) {
        return getFreeRotation(server).then((response) => {
            res.send(response)
            return response
        }).catch((error) => {
            res.send(error)
            return error
        })

    } else {
        res.sendStatus(500)
    }
})
exports.defaultSearch = functions.https.onRequest((req, res) => {
    const name = req.query.name
    const server = req.query.server
    if (name && server) {
        return search(server, name).then((response) => {
            res.send(response)
            return response
        }).catch((error) => {
            res.sendStatus(error)
            return error
        })

    } else {
        res.sendStatus(500)
    }
})
exports.getMoreMatches = functions.https.onRequest((req, res) => {
    const id = req.query.id
    const server = req.query.server
    const index = req.query.index
    if (id && server && index) {
        getMoreMatches(id, server, index).then((details) => {
            res.send(details)
            return details
        }).catch((error) => {
            res.sendStatus(500)
            return error
        })
    } else {
        res.sendStatus(500)
    }

})

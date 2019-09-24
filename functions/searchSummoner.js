const axios = require('axios')


exports.handler = function (event, context, callback) {
    const {API_KEY} = process.env


    const {name} = event['queryStringParameters'];
    const {server} = event['queryStringParameters'];
    //const url = 'https://' + server + SEARCH_URL + name + '?api_key=' + API_KEY;

    const send = (code, body) => {
        callback(null, {
            statusCode: code,
            body: JSON.stringify(body)
        })
    };

    const makeSearch = async () => {
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


    };

    async function getSummonerByName(name, server) {
        return axios.get('https://' + server + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + API_KEY).then((response) => {
            return response.data
        }).catch((error) => {
            throw error.response.status
        })
    }

    async function getMatchHistoryByAccountId(server, id, index) {
        return axios.get('https://' + server + '.api.riotgames.com/lol/match/v4/matchlists/by-account/' + id + '?endIndex=' + (parseInt(index) + 10) + '&beginIndex=' + index + '&api_key=' + API_KEY,).then((response) => {
            return response.data
        }).catch((error) => {
            send(200,error)

            throw error.response.status
        })

    }

    async function getUserRank(id, server) {
        let ranks = {}
        return axios.get('https://' + server + '.api.riotgames.com/lol/league/v4/entries/by-summoner/' + id + '?api_key=' + API_KEY).then((response) => {
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
        return axios.get('https://' + server + '.api.riotgames.com/lol/match/v4/matches/' + id + '?api_key=' + API_KEY).then((response) => {
            return response.data
        }).catch((error) => {
            throw error.response.status
        })

    }

    async function getLiveMatchBySummonerId(id, server) {
        return axios.get('https://' + server + '.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + id + '?api_key=' + API_KEY).then((response) => {
            return response.data
        }).catch((error) => {
            throw error.response.status
        })

    }

    async function getTopChampions(id, server) {
        return axios.get('https://' + server + '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + id + '?api_key=' + API_KEY).then((response) => {
            return response.data
        }).catch((error) => {
            throw error.response.status
        })
    }


    server && name ? makeSearch().then(res => send(200, res)).catch(err => send(200, err)) : send(500, 'err')


};
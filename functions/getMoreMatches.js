const axios = require('axios')


exports.handler = function (event, context, callback) {
    const {API_KEY} = process.env



    const {id} = event['queryStringParameters'];
    const {server} = event['queryStringParameters'];
    const {index} = event['queryStringParameters'];

    //const url = 'https://' + server + SEARCH_URL + name + '?api_key=' + API_KEY;

    const send = (code, body) => {
        callback(null, {
            statusCode: code,
            body: JSON.stringify(body)
        })
    };


    async function getMoreMatches() {
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
    async function getMatchHistoryByAccountId(server, id, index) {
        return axios.get('https://' + server + '.api.riotgames.com/lol/match/v4/matchlists/by-account/' + id + '?endIndex=' + (parseInt(index) + 10) + '&beginIndex=' + index + '&api_key=' + API_KEY,).then((response) => {
            return response.data
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


    server && id && index ? getMoreMatches().then(res => send(200, res)).catch(err => send(200, err)) : send(500, 'err')

};
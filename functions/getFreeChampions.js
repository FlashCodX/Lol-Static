const axios = require('axios')


exports.handler = function (event, context, callback) {
    const env = process.env;
    const {API_KEY} = process.env


    const {server} = event['queryStringParameters'];
    //const url = 'https://' + server + SEARCH_URL + name + '?api_key=' + API_KEY;

    const send = (code, body) => {
        callback(null, {
            statusCode: code,
            body: JSON.stringify(body)
        })
    };

    const getRotation = async () => {
        const champions = await getFreeRotation(server)
        return champions
    };


    async function getFreeRotation(server) {
        return axios.get('https://' + server + '.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=' + API_KEY).then((response) => {
            return response.data
        }).catch((error) => {
            throw error
        })

    }

    server ? getRotation().then(res => send(200, res)).catch(err => send(200, err)) : send(500, '')


};
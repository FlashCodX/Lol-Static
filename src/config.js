const env=process.env

export const config = {
    apiKey: "AIzaSyAnbsfSCEEmtopRcOxlj-zBL3bqtaCU0FM",
    authDomain: "lol-static.firebaseapp.com",
    databaseURL: "https://lol-static.firebaseio.com",
    projectId: "lol-static",
    storageBucket: "lol-static.appspot.com",
    messagingSenderId: "255085972146",
    appId: "1:255085972146:web:8466fdef5e941754"
}




export let AppResources = {
    FreeChampions: [],
    Defaults: {},
    PatchVersion: 0,
    Ranks: {},
    Masteries: {},
    Roles: {}
}

export let DataObj = {
    data: {
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

}
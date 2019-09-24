const env=process.env

export const config = {
    REACT_APP_FIREBASE_KEY: env.REACT_APP_FIREBASE_KEY,
    REACT_APP_AUTH_DOMAIN: env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_DB_URL: env.REACT_APP_DB_URL,
    REACT_APP_FIREBASE_ID: env.REACT_APP_FIREBASE_ID,
    REACT_APP_STORAGE_URL: env.REACT_APP_STORAGE_URL,
    REACT_APP_MESSENGER_ID: env.REACT_APP_MESSENGER_ID,
    REACT_APP_APP_ID: env.REACT_APP_APP_ID
}

export let enVars = {
    Rotation: process.env.REACT_APP_ROTATION_URL,
    More: process.env.REACT_APP_MORE_MATCHES,
    Search:process.env.REACT_APP_SEARCH
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
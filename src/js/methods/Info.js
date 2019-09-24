import {AppResources, DataObj} from "../../config";


export class Info {
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
}
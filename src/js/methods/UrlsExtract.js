import {AppResources, DataObj} from "../../config";


export class UrlsExtract {

    getItemsUrls(stats) {
        let items = []
        for (let i = 0; i <= 6; i++) {
            if (stats['item' + [i]] === 0) {
                items.push(0)
            } else {
                items.push('https://ddragon.leagueoflegends.com/cdn/' + DataObj['PatchVersion'] + '/img/item/' + stats['item' + [i]] + '.png')


            }

        }
        return items

    }


    getChampionUrls(championId) {
        const ChampionsList = Object.values(AppResources['champion']['data'])
        let urls = {
            loading: '',
            splash: '',
            icon: ''
        }
        ChampionsList.map((champ) => {
            if (champ['key'].toLocaleString() === championId.toLocaleString()) {
                urls.loading = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champ['id'] + "_0.jpg"
                urls.splash = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champ['id'] + "_0.jpg"
                urls.icon = "https://ddragon.leagueoflegends.com/cdn/" + DataObj['PatchVersion'] + "/img/champion/" + champ['id'] + ".png"

            }
        })
        return urls
    }

    getProfileIconUrl(iconId) {
        return 'https://ddragon.leagueoflegends.com/cdn/' + DataObj['PatchVersion'] + '/img/profileicon/' + DataObj['profileicon']['data'][iconId]['image']['full']
    }
}
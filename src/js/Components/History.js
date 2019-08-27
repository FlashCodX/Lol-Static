import React from 'react'

export default class History extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={"history-container"}>
                <div className={"filter-container"}>
                    <div className={"filter-header"}>FILTER</div>
                    <div className={"filter-input-1"}>
                        <div className={"filter-label"}>BY CHAMPION</div>
                        <input type="text" placeholder={"Champion ..."}/>
                    </div>
                    <div className={"filter-input-2"}>
                        <div className={"filter-label"}>BY GAME TYPE</div>
                        <select name={"game-type"} id="">
                            <option value={"Ranked"}>Ranked</option>
                            <option value={"Normal"}>Normal</option>
                        </select>
                    </div>


                </div>
                <div className={"matches-container"}>


                    <div className={"match-box"}>
                        <div className={"match-background"}/>
                        <div className={"match-line"}>
                            <div className={"game-result"}>
                                <div className={"match-result"}>DEFEAT</div>
                                <div className={"match-type"}>RANKED</div>
                            </div>
                            <div className={"kda-game-result"}>
                                <div className={"kda-result"}><span className={"kills"}>10</span>/<span
                                    className={"deaths"}>4</span>/<span className={"assists"}>21</span></div>
                                <div className={"kda-label"}>KDA</div>
                            </div>
                            <div className={"dmg-game-result"}>
                                <div className={"damage-result"}>102,302</div>
                                <div className={"damage-label"}>DMG DEALT TO CHAMPS</div>
                            </div>
                            <div className={"farm-game-result"}>
                                <div className={"farm-result"}>100</div>
                                <div className={"farm-label"}>CS</div>
                            </div>
                            <div className={"spells-container"}>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                            </div>
                        </div>

                        <div className={"items-container"}>
                            <div className={"items-sub"}>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img className={"last-item"} src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                            </div>
                        </div>

                    </div>
                    <div className={"match-box"}>
                        <div className={"match-background"}/>
                        <div className={"match-line"}>
                            <div className={"game-result"}>
                                <div className={"match-result"}>DEFEAT</div>
                                <div className={"match-type"}>RANKED</div>
                            </div>
                            <div className={"kda-game-result"}>
                                <div className={"kda-result"}><span className={"kills"}>10</span>/<span
                                    className={"deaths"}>4</span>/<span className={"assists"}>21</span></div>
                                <div className={"kda-label"}>KDA</div>
                            </div>
                            <div className={"dmg-game-result"}>
                                <div className={"damage-result"}>102,302</div>
                                <div className={"damage-label"}>DMG DEALT TO CHAMPS</div>
                            </div>
                            <div className={"farm-game-result"}>
                                <div className={"farm-result"}>100</div>
                                <div className={"farm-label"}>CS</div>
                            </div>
                            <div className={"spells-container"}>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                            </div>
                        </div>

                        <div className={"items-container"}>
                            <div className={"items-sub"}>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img className={"last-item"} src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                            </div>
                        </div>

                    </div>
                    <div className={"match-box"}>
                        <div className={"match-background"}/>
                        <div className={"match-line"}>
                            <div className={"game-result"}>
                                <div className={"match-result"}>DEFEAT</div>
                                <div className={"match-type"}>RANKED</div>
                            </div>
                            <div className={"kda-game-result"}>
                                <div className={"kda-result"}><span className={"kills"}>10</span>/<span
                                    className={"deaths"}>4</span>/<span className={"assists"}>21</span></div>
                                <div className={"kda-label"}>KDA</div>
                            </div>
                            <div className={"dmg-game-result"}>
                                <div className={"damage-result"}>102,302</div>
                                <div className={"damage-label"}>DMG DEALT TO CHAMPS</div>
                            </div>
                            <div className={"farm-game-result"}>
                                <div className={"farm-result"}>100</div>
                                <div className={"farm-label"}>CS</div>
                            </div>
                            <div className={"spells-container"}>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                            </div>
                        </div>

                        <div className={"items-container"}>
                            <div className={"items-sub"}>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img className={"last-item"} src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                            </div>
                        </div>

                    </div>
                    <div className={"match-box"}>
                        <div className={"match-background"}/>
                        <div className={"match-line"}>
                            <div className={"game-result"}>
                                <div className={"match-result"}>DEFEAT</div>
                                <div className={"match-type"}>RANKED</div>
                            </div>
                            <div className={"kda-game-result"}>
                                <div className={"kda-result"}><span className={"kills"}>10</span>/<span
                                    className={"deaths"}>4</span>/<span className={"assists"}>21</span></div>
                                <div className={"kda-label"}>KDA</div>
                            </div>
                            <div className={"dmg-game-result"}>
                                <div className={"damage-result"}>102,302</div>
                                <div className={"damage-label"}>DMG DEALT TO CHAMPS</div>
                            </div>
                            <div className={"farm-game-result"}>
                                <div className={"farm-result"}>100</div>
                                <div className={"farm-label"}>CS</div>
                            </div>
                            <div className={"spells-container"}>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                            </div>
                        </div>

                        <div className={"items-container"}>
                            <div className={"items-sub"}>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img className={"last-item"} src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                            </div>
                        </div>

                    </div>
                    <div className={"match-box"}>
                        <div className={"match-background"}/>
                        <div className={"match-line"}>
                            <div className={"game-result"}>
                                <div className={"match-result"}>DEFEAT</div>
                                <div className={"match-type"}>RANKED</div>
                            </div>
                            <div className={"kda-game-result"}>
                                <div className={"kda-result"}><span className={"kills"}>10</span>/<span
                                    className={"deaths"}>4</span>/<span className={"assists"}>21</span></div>
                                <div className={"kda-label"}>KDA</div>
                            </div>
                            <div className={"dmg-game-result"}>
                                <div className={"damage-result"}>102,302</div>
                                <div className={"damage-label"}>DMG DEALT TO CHAMPS</div>
                            </div>
                            <div className={"farm-game-result"}>
                                <div className={"farm-result"}>100</div>
                                <div className={"farm-label"}>CS</div>
                            </div>
                            <div className={"spells-container"}>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/spells/32/4.png"} alt=""/>
                            </div>
                        </div>

                        <div className={"items-container"}>
                            <div className={"items-sub"}>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                                <img className={"last-item"} src={"https://cdn.lolskill.net/img/items/32/3085.png"} alt=""/>
                            </div>
                        </div>

                    </div>
                    <div className={"load-more-container"}>
                        <button className={"load-more-btn"}>Load more ...</button>

                    </div>

                </div>

            </div>
        )
    }


}
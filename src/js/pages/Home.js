import React from 'react'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={"home-page"}>
                <div className={"home-content"}>
                    <div className={"home-desc"}>
                        League Of Legends Summoners&Game Statistics
                    </div>

                    <div className={"Home-Form"} id={"home-form"}>
                        <input type="text" placeholder={"Summoner Name"} onChange={(e) => this.onNameChange(e)}/>
                        <select name="server" id="server" onChange={(e) => this.onServerChange(e)}>
                            <option value="EUW1">EUW1</option>
                        </select>
                        <i onClick={() => this.makeSearch()} className="fa fa-search"/>

                    </div>
                    <div className={"champ-rotation-header"}>
                    <div>FREE CHAMPION ROTATION THIS WEEK</div>
                    <div className={"champ-date"}>25.02.2019</div>
                    </div>
                    <div className={"champ-rotation"}>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>
                        <div>Brand</div>

                    </div>
                </div>
            </div>
        )
    }


}
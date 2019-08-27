import React from 'react'
import 'react-vis/dist/style.css';

import {HorizontalGridLines, LineMarkSeries, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from "react-vis";
const data = [{x: 0, y: 0}, {x: 1, y: 2}, {x: 2, y: 5}, {x: 3, y: 15},{x: 4, y: 3},{x: 5, y: 15},{x: 6, y: 15},{x: 1, y: 15}];

export default class Progress extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={"progress-container"}>
                <XYPlot height={300} width= {700} >
                    <VerticalGridLines style={{stroke: 'blue'}}/>
                    <HorizontalGridLines style={{stroke: 'blue'}} />
                    <XAxis style={{stroke: 'white'}} />
                    <YAxis style={{stroke: 'white'}} />
                    <LineSeries data={data} style={{stroke: 'green'}} />
                </XYPlot>
            </div>
        )
    }


}
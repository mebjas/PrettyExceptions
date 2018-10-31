// src/Window/Insights.tsx

import * as React from 'react';

export interface IInsightsState {
    val?: string;
    typeOf?: string;
}

export class Insights extends React.Component<IInsightsState>
{
    constructor(props: IInsightsState) {
        super(props);
    }

    public render() {
        let dataRequestRender;

        if (this.props.val && this.props.typeOf) {
            dataRequestRender = (<span>Requesting data (<b>{this.props.val}, typeOf:{this.props.typeOf}</b>) ...</span>);
        }

        return (
        <div className="pane">
            <div className="padded-more" id="insights">
                <h4>Insights</h4>
                <div>
                {dataRequestRender}
                </div>
            </div>
        </div>);
    }
}
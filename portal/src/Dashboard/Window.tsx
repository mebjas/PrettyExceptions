// src/Dashboard/Window.tsx

import * as React from 'react';
import { IInsightsState, Insights} from './Insights'
import { ISideBarData, SideBar } from './SideBar'
import { ISideBarAddBoxData } from "./SideBarAddBox"
import ToolBar from './ToolBar'
import WorkSpace from './WorkSpace'

interface IWindowState extends ISideBarData, IInsightsState {
    selectedException?: string;
    selectedId?: string;
};

class Window extends React.Component<{}, IWindowState>
{
    private exceptionEntryLocalStorageKey:string = "exceptionEntry";

    constructor(props: Readonly<{}>) {
        super(props);

        this.GetExceptionEntryFromLocalStorageIfExists = this.GetExceptionEntryFromLocalStorageIfExists.bind(this);
        this.OnSideBarListUpdate = this.OnSideBarListUpdate.bind(this);
        this.OnWorkSpaceAnnotationClickec = this.OnWorkSpaceAnnotationClickec.bind(this);
        this.OnSideBarListSelection = this.OnSideBarListSelection.bind(this);

        this.state = {
            exceptionIdMap: {},
            exceptions: []
        };
    }

    public componentDidMount() {
        this.GetExceptionEntryFromLocalStorageIfExists(true);
    }

    public render() {
        const exceptionList: ISideBarData = this.GetExceptionEntryFromLocalStorageIfExists();

        return (
            <div className="window">
                <ToolBar />
                <div className="window-content">
                    <div className="pane-group">
                        <SideBar
                            exceptions={exceptionList.exceptions}
                            exceptionIdMap={exceptionList.exceptionIdMap}
                            onSideBarListUpdate={this.OnSideBarListUpdate}
                            onSideBarListSelection={this.OnSideBarListSelection} />
                        <WorkSpace 
                            id={this.state.selectedId}
                            exceptionString={this.state.selectedException}
                            onAnnotationClicked={this.OnWorkSpaceAnnotationClickec} />
                        <Insights
                            val={this.state.val}
                            typeOf={this.state.typeOf} />
                    </div>
                </div>
            </div>);
    }

    private GetExceptionEntryFromLocalStorageIfExists(fromConstructor: boolean = false) : ISideBarData {
        const data: any = localStorage.getItem(this.exceptionEntryLocalStorageKey);
        if (data) {
            const sideBarData: ISideBarData = JSON.parse(data);

            if (fromConstructor) {
                this.setState({exceptions: sideBarData.exceptions});
            }

            return sideBarData;
        }

        return {exceptions: [], exceptionIdMap: {}};
    }

    private OnSideBarListUpdate(sideBarData: ISideBarData) {
        //// Set this item to local storage
        localStorage.setItem(this.exceptionEntryLocalStorageKey, JSON.stringify(sideBarData));

        this.setState({exceptions: sideBarData.exceptions, exceptionIdMap: sideBarData.exceptionIdMap});
    }

    private OnSideBarListSelection(exception: ISideBarAddBoxData) {
        this.setState({
            selectedException: exception.exceptionString,
            selectedId: exception.id
        });
    }

    private OnWorkSpaceAnnotationClickec(value: string, typeOfValue: string) {
        this.setState({val: value, typeOf: typeOfValue});
    }
}

export default Window;
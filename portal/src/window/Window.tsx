// src/window/Window.tsx

import * as React from 'react';
import { IInsightsState, Insights} from './Insights'
import { IExceptionEntryState, SideBar } from './SideBar'
import ToolBar from './ToolBar'
import WorkSpace from './WorkSpace'

interface IWindowState extends IExceptionEntryState, IInsightsState {};

class Window extends React.Component<{}, IWindowState>
{
    private exceptionEntryLocalStorageKey:string = "exceptionEntry";

    constructor(props: Readonly<{}>) {
        super(props);

        this.GetExceptionEntryFromLocalStorageIfExists = this.GetExceptionEntryFromLocalStorageIfExists.bind(this);
        this.OnSideBarSubmit = this.OnSideBarSubmit.bind(this);
        this.OnWorkSpaceAnnotationClickec = this.OnWorkSpaceAnnotationClickec.bind(this);

        this.state = {
            id: "",
            rawException: ""
        };
    }

    public componentDidMount() {
        this.GetExceptionEntryFromLocalStorageIfExists(true);
    }

    public render() {
        const rawExceptionData = this.GetExceptionEntryFromLocalStorageIfExists();

        return (
            <div className="window">
                <ToolBar />
                <div className="window-content">
                    <div className="pane-group">
                        <SideBar
                            id={rawExceptionData.id}
                            rawException={rawExceptionData.rawException}
                            onSubmit={this.OnSideBarSubmit} />
                        <WorkSpace 
                            id={this.state.id}
                            rawException={this.state.rawException}
                            onAnnotationClicked={this.OnWorkSpaceAnnotationClickec} />
                        <Insights
                            val={this.state.val}
                            typeOf={this.state.typeOf} />
                    </div>
                </div>
            </div>);
    }

    private GetExceptionEntryFromLocalStorageIfExists(fromConstructor: boolean = false) : IExceptionEntryState {
        let data: any = localStorage.getItem(this.exceptionEntryLocalStorageKey);
        let identifier: string = "";
        let exception: string = "";

        if (data) {
            data = JSON.parse(data);
            identifier = data.id || "";
            exception = data.rawException || "";

            if (fromConstructor) {
                this.setState({id: identifier, rawException: exception});
            }
        }

        return {id: identifier, rawException: exception};
    }

    private OnSideBarSubmit(exceptionEntry: IExceptionEntryState) {
        //// Set this item to local storage
        localStorage.setItem(this.exceptionEntryLocalStorageKey, JSON.stringify(exceptionEntry));

        this.setState({id: exceptionEntry.id, rawException: exceptionEntry.rawException});
    }

    private OnWorkSpaceAnnotationClickec(value: string, typeOfValue: string) {
        this.setState({val: value, typeOf: typeOfValue});
    }
}

export default Window;
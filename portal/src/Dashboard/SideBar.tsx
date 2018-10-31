// src/Dashboard/SideBar.tsx

import * as React from "react"
import { ISideBarAddBoxData } from "./SideBarAddBox"
import { SideBarAddBox } from "./SideBarAddBox"
import { SideBarList } from "./SideBarList"

export interface ISideBarData {
    exceptions: ISideBarAddBoxData[];
    exceptionIdMap: any;
}

export interface ISideBarProperty extends ISideBarData {
    onSideBarListUpdate: (exceptions: ISideBarData) => void;
    onSideBarListSelection: (exception: ISideBarAddBoxData) => void;
}

export interface ISideBarState extends ISideBarData, ISideBarAddBoxData {}

export class SideBar extends React.Component<ISideBarProperty, ISideBarState>
{
    private exceptions: ISideBarAddBoxData[] = [];
    private exceptionIdMap: any = {};

    constructor(props: ISideBarProperty) {
        super(props);

        this.exceptions = props.exceptions || [];
        this.exceptionIdMap = props.exceptionIdMap || {};

        this.state = {
            exceptionIdMap: this.exceptionIdMap,
            exceptions: this.exceptions
        };

        this.OnSideBarAddBoxAddEvent = this.OnSideBarAddBoxAddEvent.bind(this);
        this.OnSideBarListItemSelectionChange = this.OnSideBarListItemSelectionChange.bind(this);
        this.OnSideBarListItemEditDemanded = this.OnSideBarListItemEditDemanded.bind(this);
    }

    public render() {
        return (
            <div className="pane-md sidebar">
                <header className="toolbar toolbar-header">
                   <h1 className="title">Add Exception Stack Trace</h1>
                </header>
                <SideBarAddBox 
                    id={this.state.id}
                    exceptionString={this.state.exceptionString}
                    onSideBarAddBoxAddEvent={this.OnSideBarAddBoxAddEvent} />

                <footer className="toolbar toolbar-footer" />
                <SideBarList
                    exceptions={this.state.exceptions}
                    onChange={this.OnSideBarListItemSelectionChange}
                    onEditDemanded={this.OnSideBarListItemEditDemanded} />
            </div>);
    }

    private OnSideBarAddBoxAddEvent(input: ISideBarAddBoxData): string {
        const newExceptionId = input.id;
        if (!newExceptionId) {
            return "Exception Id need to be defined";
        }

        if (newExceptionId in this.exceptionIdMap) {
            return "this id already exists"
        }

        this.exceptions.push(input);
        this.exceptionIdMap[newExceptionId] = true;
        this.setState({exceptions: this.exceptions, exceptionIdMap: this.exceptionIdMap});

        //// Propagate this information upwards
        this.props.onSideBarListUpdate({exceptions: this.exceptions, exceptionIdMap: this.exceptionIdMap});
        return "";
    }

    private OnSideBarListItemSelectionChange(key: string, status: boolean) {
        if (status && this.props.onSideBarListSelection) {
            this.exceptions.forEach((exception: ISideBarAddBoxData) => {
                if (exception.id === key) {
                    return this.props.onSideBarListSelection(exception);
                }
            });
        }
    }

    private OnSideBarListItemEditDemanded(key: string) {
        this.exceptions.forEach((exception: ISideBarAddBoxData) => {
            if (exception.id === key) {
                this.setState({id: exception.id, exceptionString: exception.exceptionString});
            }
        });
    }
};
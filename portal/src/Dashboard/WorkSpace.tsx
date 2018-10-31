// src/Dashboard/WorkSpace.tsx

import * as React from 'react';
import { IRawException } from '../Core/Contracts'
import { PrettyExceptionBuilder } from '../Core/PrettyExceptionBuilder'
import { ISideBarAddBoxData } from "./SideBarAddBox"

export interface IWorkspaceProperty extends ISideBarAddBoxData
{
    onAnnotationClicked?: (val: string, typeOf: string) => void;
}

export interface IWorkspaceState extends ISideBarAddBoxData
{
    error?: string;
}

class WorkSpace extends React.Component<IWorkspaceProperty, IWorkspaceState>
{
    constructor(props: IWorkspaceState) {
        super(props);

        this.state = {error: undefined};
    }

    public render() {
        const rawException: string = this.props.exceptionString || "";
        const prettyExceptionBuilder: PrettyExceptionBuilder = new PrettyExceptionBuilder(this.props.onAnnotationClicked);

        let workspaceHeader;
        let errorSection;
        let prettyExceptionSection;
        if (this.props.id && this.props.id !== "") {
            workspaceHeader = <h3>ID: {this.props.id}</h3>;
        } else {
            workspaceHeader = <span>Add A Stack Trace to visualize it here!</span>;
        }

        if (this.state.error && this.state.error !== "") {
            errorSection = <h4 className="error-message">Unable to parse this exception entry</h4>;
        }

        if (rawException) {
            try {
                const data: IRawException[] = JSON.parse(rawException);
                prettyExceptionBuilder.Parse(data);
            }
            catch (ex) {
                //// TODO: handle this with exception message
            }
        }

        if (prettyExceptionBuilder && prettyExceptionBuilder.isSet) {
            prettyExceptionSection = prettyExceptionBuilder.Print();
        }

        return (
        <div className="pane">
            <div className="padded-more" id="workspace">
                {workspaceHeader}
                {errorSection}
                {prettyExceptionSection}
            </div>
        </div>);
    }
}

export default WorkSpace;
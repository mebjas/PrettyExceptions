// src/window/WorkSpace.tsx

import * as React from 'react';
import { IRawException } from '../Core/Contracts'
import { PrettyExceptionBuilder } from '../Core/PrettyExceptionBuilder'
import { IExceptionEntryState } from './SideBar'

export interface IWorkspaceState extends IExceptionEntryState
{
    onAnnotationClicked?: (val: string, typeOf: string) => void;
}

class WorkSpace extends React.Component<IWorkspaceState, IWorkspaceState>
{
    constructor(props: IWorkspaceState) {
        super(props);

        this.state = {
            id: this.props.id || "",
            onAnnotationClicked: this.props.onAnnotationClicked,
            rawException: this.props.rawException || ""
        };
    }

    public render() {
        const rawException = this.props.rawException;
        const prettyExceptionBuilder: PrettyExceptionBuilder = new PrettyExceptionBuilder(this.state.onAnnotationClicked);

        if (rawException) {
            try {
                const data: IRawException[] = JSON.parse(rawException);
                prettyExceptionBuilder.Parse(data);
            }
            catch (ex) {
                //// TODO: handle this with exception message
            }
        }

        return (
        <div className="pane">
            <div className="padded-more" id="workspace">
            {
                (this.props.id && this.props.id !== "")
                    ? <h3>ID: {this.props.id}</h3> : <span>Add A Stack Trace to visualize it here!</span>
            }

            {
                (prettyExceptionBuilder && prettyExceptionBuilder.isSet) ? prettyExceptionBuilder.Print() : null
            }
            </div>
        </div>);
    }
}

export default WorkSpace;
// src/window/SideBar.tsx

import * as React from 'react';

export interface IExceptionEntryState
{
    id?: string;
    rawException?: string;
}

export interface ISideBarState extends IExceptionEntryState {
    error: string;
}

export interface IExceptionEntryProperty extends IExceptionEntryState {
    onSubmit?: (exceptionEntry: IExceptionEntryState) => void;
}

export class SideBar extends React.Component<IExceptionEntryProperty, ISideBarState>
{
    private id: string;
    private rawException: string;
    private logs: string;

    constructor(exceptionEntry: IExceptionEntryProperty) {
        super(exceptionEntry);
        this.id = exceptionEntry.id || "";
        this.rawException = exceptionEntry.rawException || "";

        this.state = {
            error: "",
            id: exceptionEntry.id || "",
            rawException: exceptionEntry.rawException || ""
        };

        this.OnIdChange = this.OnIdChange.bind(this);
        this.OnExceptionValueChange = this.OnExceptionValueChange.bind(this);
        this.OnReset = this.OnReset.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);
    }

    public render() {
        const props = this.props;

        return (
            <div className="pane-md sidebar">
                <form className="padded-less">
                    <div className="form-group">
                        <label>Issue ID</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Issue ID"
                            id="input_id"
                            defaultValue={props.id}
                            onChange={this.OnIdChange} />
                    </div>
                    <div className="form-group">
                        <label>Raw Exception</label>
                        <textarea
                            className="form-control"
                            id="input_re"
                            style={{height: 500}}
                            defaultValue={props.rawException}
                            onChange={this.OnExceptionValueChange} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-form btn-default" disabled={true} onClick={this.OnReset}>Reset</button>
                        <button type="submit" className="btn btn-form btn-primary" onClick={this.OnSubmit}>Add</button>
                    </div>
                    <div className="error-message">
                        {(this.state.error && this.state.error !== "") ? (<span><br />{this.state.error}<br /></span>) : null}
                    </div>
                    <div className="log">{JSON.stringify(this.logs)}</div>
                </form>
            </div>);
    }

    private OnIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.id = e.currentTarget.value;
    }

    private OnExceptionValueChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.rawException = e.currentTarget.value;
    }

    private OnReset(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({id: "", rawException: ""});

        e.preventDefault();
        e.stopPropagation();
    }

    private OnSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (this.id.trim() === "") {
            this.setState({error: "Id cannont be null or empty"})
            return;
        } else if (this.rawException.trim() === "") {
            this.setState({error: "Raw Exception cannont be null or empty"})
            return;
        } else {
            this.setState({error: ""})
        }

        this.setState({id: this.id, rawException: this.rawException});

        if (this.props.onSubmit) {
            this.props.onSubmit({id: this.id, rawException: this.rawException});
        }
    }
};
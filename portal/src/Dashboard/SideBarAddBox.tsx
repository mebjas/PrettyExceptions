// src/Dashboard/SideBarAddBox.tsx

import * as React from 'react';

export interface ISideBarAddBoxData {
    id?: string,
    exceptionString?: string;
}

export interface ISideBarAddBoxProperty extends ISideBarAddBoxData {
    onSideBarAddBoxAddEvent?: (exceptionEntry: ISideBarAddBoxData) => string;
}

export interface ISideBarState extends ISideBarAddBoxData {
    error: string;
}

export class SideBarAddBox extends React.Component<ISideBarAddBoxProperty, ISideBarState>
{
    private id: string;
    private exceptionString: string;

    constructor(props: ISideBarAddBoxProperty) {
        super(props);

        this.id = props.id || "";
        this.exceptionString = props.exceptionString || "";

        this.OnIdChange = this.OnIdChange.bind(this);
        this.OnExceptionValueChange = this.OnExceptionValueChange.bind(this);
        this.OnReset = this.OnReset.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);

        this.state = {error: ""};
    }

    public render() {
        const props = this.props;

        return (
            <div className="sidebar-add-box">
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
                            style={{height: 300}}
                            defaultValue={props.exceptionString}
                            onChange={this.OnExceptionValueChange} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-form btn-default" disabled={true} onClick={this.OnReset}>Reset</button>
                        <button type="submit" className="btn btn-form btn-primary" onClick={this.OnSubmit}>Add</button>
                    </div>
                    <div className="error-message">
                        {(this.state.error && this.state.error !== "") ? (<span><br />{this.state.error}<br /></span>) : null}
                    </div>
                </form>
            </div>);
    }

    private OnIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.id = e.currentTarget.value;
    }

    private OnExceptionValueChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.exceptionString = e.currentTarget.value;
    }

    private OnReset(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({id: "", exceptionString: ""});

        e.preventDefault();
        e.stopPropagation();
    }

    private OnSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (this.id.trim() === "") {
            this.setState({error: "Id cannont be null or empty"})
            return;
        } else if (this.exceptionString.trim() === "") {
            this.setState({error: "Raw Exception cannont be null or empty"})
            return;
        } else {
            this.setState({error: ""})
        }

        this.setState({id: this.id, exceptionString: this.exceptionString});

        if (this.props.onSideBarAddBoxAddEvent) {
            const response:string = this.props.onSideBarAddBoxAddEvent({id: this.id, exceptionString: this.exceptionString});
            if (response && response.trim() !== "") {
                this.setState({error: response});
            }
        }
    }
}

export default SideBarAddBox;

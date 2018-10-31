// src/Dashboard/SideBarList.tsx

import * as React from "react"
import { ISideBarAddBoxData } from "./SideBarAddBox"

export interface ISidebarListData {
    exceptions: ISideBarAddBoxData[],
    onChange?: (id: string, status: boolean) => void,
    onEditDemanded?: (id: string) => void,
}

export class SideBarList extends React.Component<ISidebarListData, ISidebarListData> {
    private checkStatus: any = {};

    constructor(props: ISidebarListData) {
        super(props);
        this.OnSelected = this.OnSelected.bind(this);
        this.OnEditDemanded = this.OnEditDemanded.bind(this);
    }

    public render() {
        const list: ISideBarAddBoxData[] = this.props.exceptions;
        this.checkStatus = {};

        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-header">
                        <input className="form-control" type="text" placeholder="Search for exception" disabled={false} />
                    </li>
                </ul>
                <table className="table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        list.map((element: ISideBarAddBoxData, index: number) => {
                            const id: string = element.id || "";
                            this.checkStatus[id] = false;

                            return (
                                <tr className="sidebar-list-item" key={index}>
                                    <td>
                                        <input 
                                            type="checkbox"
                                            data-key={id}
                                            onChange={this.OnSelected} />
                                    </td>
                                    <td>{element.id}</td>
                                    <td>
                                        <span className="icon icon-minus-circled clickable" title="remove from list"/>
                                        &nbsp;&nbsp;
                                        <span 
                                            className="icon icon-pencil clickable"
                                            title="edit this exception"
                                            data-tag={id}
                                            onClick={this.OnEditDemanded.bind(null, id)} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>);
    }

    private OnSelected(event: React.ChangeEvent<HTMLElement>) {
        const key: string = event.target.dataset.key || ""
        this.checkStatus[key] = !this.checkStatus[key];
        if (this.props.onChange) {
            this.props.onChange(key, this.checkStatus[key]);
        }
    }

    private OnEditDemanded(id: string) {
        if (this.props.onEditDemanded) {
            this.props.onEditDemanded(id);
        }
    }
}
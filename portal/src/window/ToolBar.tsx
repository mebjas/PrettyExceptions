// src/Window/ToolBar.tsx

import * as React from 'react';

class ToolBar extends React.Component
{
    public render() {
        return (
        <header className="toolbar toolbar-header">
            <div className="toolbar-actions">
              <button className="btn btn-default" id="input_reset">
                <span className="icon icon-arrows-ccw" />
                &nbsp; Reset Workspace
              </button>
              <input type="checkbox" /> Show Relevent Data Only
            </div>
        </header>);
    }
}

export default ToolBar;
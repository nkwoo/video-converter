import React from "react";
import './TitleFrame.css';

enum ClickEventType {
    Minimize,
    Maximize,
    UnMaximize,
    Close
}

type TitleFrameState = {
    maximizeCheck: boolean
}

class TitleFrame extends React.Component<any, TitleFrameState> {

    state = {
        maximizeCheck: false
    }

    constructor(props: any) {
        super(props);

        window.ipcRenderer.on('updateMaximize', (event, res: boolean) => {
            this.setState({
                maximizeCheck: res
            });
        })
    }

    clickEvent(eventType: ClickEventType) {
        window.ipcRenderer.send("mainAppTitleEvent", eventType);
    }

    render() {
        return (
            <div className="title-frame">
                <div className="title">
                    Video Convertor
                </div>
                <div className="title-btn-area">
                    <div className="minimize-btn" onClick={() => this.clickEvent(ClickEventType.Minimize)}/>
                    {this.state.maximizeCheck ?
                        <div className="un-maximize-btn" onClick={() => this.clickEvent(ClickEventType.UnMaximize)}/>
                    :
                        <div className="maximize-btn" onClick={() => this.clickEvent(ClickEventType.Maximize)}/>
                    }
                    <div className="close-btn" onClick={() => this.clickEvent(ClickEventType.Close)}/>
                </div>
            </div>
        );
    }
}

export default TitleFrame
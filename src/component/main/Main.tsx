import React, {ReactNode} from 'react';
import {Redirect} from 'react-router-dom';
import './Main.css';

type MainProps = {}

type MainState = {
    redirect: boolean;
}

class Main extends React.Component<MainProps, MainState> {
    private _isMounted: boolean = false;

    constructor(props: MainProps) {
        super(props);

        if (this._isMounted) {
            this.setState({
                redirect: false
            });
        }
    }

    init() {
        setTimeout(() => {
            if (this._isMounted) {
                this.setState({redirect: true});
            }
        }, 2000);
    }

    render(): ReactNode {
        this.init();
        if (this._isMounted) {
            const {redirect} = this.state;

            if (redirect) {
                return <Redirect to="/upload"/>
            }
        }

        return (
            <div className="wrap">
                <div className="center">
                    <span>Video Converter</span>
                    <div className="loader" />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}

export default Main;
import React from "react";
import {Redirect} from "react-router-dom";
class Main extends React.Component<any, any> {
    state = {
        redirect: false
    }

    init () {
        setTimeout(() => {
            this.setState({redirect: true});
        }, 3000);
    }

    render() {
        this.init();
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to="/upload"/>
        }

        return (
            <div>Hello!</div>
        );
    }
}

export default Main;
import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Main from "./component/main/Main";
import Upload from "./component/upload/Upload";
import RouterNotFound from "./component/exception/RouterNotFound";
import TitleFrame from "./component/header/TitleFrame";
import isElectron from "is-electron";
import Styled from 'styled-components';

const Wrap = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${isElectron() ? 'calc(100% - 25px)' : '100%'};  
`;

class App extends React.Component<any, any> {

    render() {
        return (
            <>
                {isElectron() &&
                <TitleFrame/>
                }
                <Wrap>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/upload" component={Upload}/>
                        <Route component={RouterNotFound}/>
                    </Switch>
                </Wrap>
            </>
        );
    }
}

export default App;

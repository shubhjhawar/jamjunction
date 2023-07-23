import React, {Component} from 'react';
import {render} from 'react-dom';
import HomePage from './HomePage';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div class="gradient-background">
                <div class="center">
                    <HomePage />
                </div>
            </div>
        );
    }
}

export default App

const appDiv = document.getElementById("app");
render(<App />, appDiv);
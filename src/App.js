import "./App.css";

import { Component } from "react/cjs/react.production.min";
//Screens
import Game from "./screens/Game.js";
import Registration from "./screens/Registration.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
        };
    }

    render() {
        return (
            <div className="project-enri-emi">
                {this.state.isRegistered === false && <Registration />}
                {this.state.isRegistered && <Game />}
            </div>
        );
    }
}

export default App;

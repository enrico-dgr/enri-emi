
import React,{Component} from 'react';

class Player extends Component{

    constructor(props){
        super(props)

    }

    render(){
        const {
            name,
            id,
            score,
            index,
            removePlayer,
            changeScore
        } = this.props
        return (
            <div className="player">
            
                <span className="player-name">



                    {name}
                </span>

                {/* <Counter 
                    score={score}
                    changeScore={changeScore}
                    index={index}
                /> */}
            </div>
            
        );
    }
    
  }

import React from 'react';

class MainApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myPizzas: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        const value=this.refs.myInput.value;
        this.props.filterInput(value);
    }
    render(){
        return(
           <div>
               <div>
                   <input type="text" ref="myInput" onChange={this.handleChange}/>
               </div>
               <div>
                   <button onClick={this.props.sortBtn}>Sort</button>
               </div>
           </div>
        )
    }
}

export default MainApp;

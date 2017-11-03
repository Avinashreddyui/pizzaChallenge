
import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './src/MainApp.js';

export default class Index extends React.Component{
   constructor(props) {
       super(props);
       this.state = {
           pizzas: [],
           hasErrored: false,
           isLoading: false,
           sortIndex: 0
       };
       this.filterFunction= this.filterFunction.bind(this);
       this.sortFunction = this.sortFunction.bind(this);
   }
   componentDidMount(){
       this.setState({ isLoading: true });
           fetch('./pizza.json')
               .then((response) => {
                   if (!response.ok) {
                       throw Error(response.statusText);
                   }
                   this.setState({ isLoading: false });
                   return response;
               })
               .then((response) => response.json())
               .then((items) => this.setState({ pizzas:items.pizzas }))
               .catch(() => this.setState({ hasErrored: true }));
   }
   filterFunction(value){
           const filteredPizzas = this.state.pizzas.filter(pizza => pizza.toLowerCase().includes(value.toLowerCase()));
           this.setState({pizzas: filteredPizzas});
   }
    sortFunction(){
       if(this.state.sortIndex === 0) {
           this.state.pizzas.sort(function (a, b) {
               let pizza1 = a.toLowerCase();
               let pizza2 = b.toLowerCase();
               return pizza1 > pizza2 ? 1 : pizza1 < pizza2 ? -1 : 0;
           });
           this.setState({sortIndex:1});
       }
        if(this.state.sortIndex === 1) {
            this.state.pizzas.sort(function (a, b) {
                let pizza1 = a.toLowerCase();
                let pizza2 = b.toLowerCase();
                return pizza2 > pizza1 ? 1 : pizza2 < pizza1 ? -1 : 0;
            });
            this.setState({sortIndex:0});
        }

    }
    render(){
        if (this.state.hasErrored) {
            return <h2>Sorry! bad Response</h2>;
        }

        if (this.state.isLoading) {
            return <h2>....Loading</h2>;
        }
        return(
            <div>
                <div>
                    <MainApp
                        filterInput={(value)=>this.filterFunction(value)}
                        pizzas={this.state.pizzas}
                        sortBtn={this.sortFunction}
                    />
                    <div>
                        {this.state.pizzas.map((dynamicComponent, i) => <div
                            key = {i} >{dynamicComponent}</div>)}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
document.getElementById('app')
);

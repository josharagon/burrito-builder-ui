import React, { Component } from 'react';
import './App.css';
import {getOrders, addOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state= {
      allOrders: [],
    }
  }

  componentDidMount() {
    getOrders()
      .then(allBurritos => this.setState({allOrders: allBurritos.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  addNewOrder = (name, ingredients) => {
    const newOrder = {name: name, ingredients:ingredients}
    addOrder(newOrder)
    .then((order) => this.setState({allOrders: this.state.allOrders.concat(order)}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addNewOrder}/>
        </header>
        <Orders orders={this.state.allOrders}/>
      </main>
    );
  }
}


export default App;

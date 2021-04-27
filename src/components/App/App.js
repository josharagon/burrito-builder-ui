import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
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

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>
        <Orders orders={this.state.allOrders}/>
      </main>
    );
  }
}


export default App;

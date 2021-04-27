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
      error: ''
    }
  }

  componentDidMount = () => {
    getOrders()
      .then(allBurritos => this.setState({allOrders: allBurritos.orders}))
      .catch(err => this.setState({error: err.message}));
  }

  checkForError = () => {
    if(this.state.error) {
      return (<h2 className='error'>Error fetching orders. Try refreshing your browser.</h2>)
    }
  }

  addNewOrder = (name, ingredients) => {
    const newOrder = {name: name, ingredients:ingredients}
    addOrder(newOrder)
    .then((order) => this.setState({allOrders: this.state.allOrders.concat(order)}))
  }

  // deleteExistingOrder = (e) => {
  //   deleteOrder(e.target.id)
  //   .then(reviews => console.log(reviews))
    
  // }

  render() {
    return (
      <main className="App">
        <header>
          <h1>🌯 Burrito Builder🌯 </h1>
          <OrderForm addOrder={this.addNewOrder}/>
        </header>
        {this.checkForError() }
        { !this.state.error && <Orders orders={this.state.allOrders}/>}
      </main>
    );
  }
}


export default App;

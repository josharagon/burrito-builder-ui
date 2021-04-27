import React, { Component } from 'react';
import './OrderForm.css'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      completed: true,
    };
  }


  handleSubmit = e => {
    if(this.state.name && this.state.ingredients.length){
      e.preventDefault();
      this.props.addOrder(this.state.name, this.state.ingredients);
      this.clearInputs();
    } else {
      e.preventDefault();
      this.setState({completed: false})
    }
  }

  handleNameChange = e => {
    this.setState({name: e.target.value})
  }

  handleIngredientChange = e => {
    e.preventDefault();
    if(!this.state.ingredients.includes(e.target.value)){
    this.setState(({ingredients: this.state.ingredients.concat(e.target.value)}))
    } else {
      return
    }
  }

  warnCustomer = () => {
    if(!this.state.completed) {
      return(<h4 className='error'>Please fill out every input field</h4>)
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [], completed: true});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
          <button key={ingredient} name={ingredient} value={ingredient} id={ingredient} onClick={e => this.handleIngredientChange(e)}>
            {ingredient}
          </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        <div className='ingredients'> 
        <p>Add-ons:</p>
          { ingredientButtons }
        </div>
        { this.warnCustomer() }
        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button id='submit-button' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;

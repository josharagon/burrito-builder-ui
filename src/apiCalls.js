export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
    .then(allBurritos => {
      return allBurritos
    })
}


export const addOrder = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newOrder.name,
      ingredients: newOrder.ingredients
    })
  })
    .then((response) => response.json())
}

// export const deleteOrder = (id) => {
//   return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'content-type': 'application/json',
//       statusCode:204,
//     }
//   })
//     .then(response => response.json())
// }
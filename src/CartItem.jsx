import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calcula el costo total del carrito
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1)); // elimina el símbolo $
      total += item.quantity * cost;
    });
    return total.toFixed(2); // formato decimal
  };

  // Calcula el subtotal por producto
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  // Manejar botón de continuar comprando
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // Incrementar cantidad
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // Decrementar cantidad o eliminar si llega a 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Eliminar artículo completamente
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Simulación de botón de pago
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

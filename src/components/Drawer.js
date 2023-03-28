import Info from "./Info";
import React from "react";
import axios from "axios";
import { useCart } from "./hooks/useCart";

const delay = () => new Promise(resolve => {
  setTimeout(resolve, 1000);
});

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:3001/orders", { items: cartItems });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`http://localhost:3001/cart/${item.id}`);
        await delay();
      }
    } catch (error) {
      console.log("Не удалось создать заказ");
    }
    setIsLoading(false);
  };
  return (
    <div className="overlay d-flex flex">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина
          <img className="cu-p" onClick={onClose} src="/img/btn-remove.svg" alt="CloseCart" />
        </h2>

        {
          cartItems.length > 0 ?
            <div className="d-flex flex-column flex">
              <div className="items">
                {cartItems.map((obj) =>
                  <div key={obj.id} className="cartItem d-flex align-center mb-20">
                    <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg">
                    </div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg"
                         alt="Remove" />
                  </div>)}
              </div>
              <div className="cartTotalBlock">
                <ul className="cartTotalBlock">
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб</b>
                  </li>
                  <li>
                    <span>Налог 5%</span>
                    <div></div>
                    <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ<img
                  src="/img/arrow.svg"
                  alt="Arrow" /></button>
              </div>
            </div> : (
              <Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
                    image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"} />
            )
        }
      </div>
    </div>);
};

export default Drawer;


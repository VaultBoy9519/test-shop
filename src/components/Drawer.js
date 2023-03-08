function Drawer(props) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина
          <img className="cu-p" onClick={props.onClose} src="/img/btn-remove.svg" alt="CloseCart" />
        </h2>
        <div className="items">
          <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }} className="cartItemImg">
            </div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</p>
              <b>12990 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }} className="cartItemImg">

            </div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</p>
              <b>12990 руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
        </div>
        <div className="cartTotalBlock">
          <ul className="cartTotalBlock">
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21498 руб.</b>
            </li>
            <li>
              <span>Налог 5%</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">Оформить заказ<img src="/img/arrow.svg" alt="Arrow" /></button>
        </div>
      </div>
    </div>);
};

export default Drawer;
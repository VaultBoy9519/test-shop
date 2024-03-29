import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "./hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();
  return (<header className="d-flex justify-between align-center p-40">
    <Link to="">
      <div className="headerLeft d-flex align-center">
        <img width={40} height={40} src="img/logo.png" alt="Logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
    </Link>
    <ul className="d-flex">
      <li onClick={props.onClickCart} className="mr-10 cu-p">
        <img width={18} height={18} src="img/cart.svg" alt="Cart_Symbol" />
        <span>{totalPrice} руб.</span>
      </li>
      <li className="cu-p">

        <Link to="favourites">
          <img width={18} height={18} src="img/heart.svg" alt="Favourites" />
        </Link>

      </li>
      <li>
        <Link to="orders">
          <img width={18} height={18} src="img/user.svg" alt="User_Symbol" />
        </Link>
      </li>
    </ul>
  </header>);
};

export default Header;
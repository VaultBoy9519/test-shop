import React from "react";
import AppContext from "../AppContext";

const Info = ({ image, title, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={120} src={image} alt="EmptyCart" />
      <h2>{title}</h2>
      <p className="opacity-6 text-center">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img className="ml-25" src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
import styles from "./Card.module.scss";
import React from "react";

function Card({ id, onFavourite, onPlus, title, price, imageUrl, favourited = false }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavourite, setIsFavourive] = React.useState(favourited);
  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
    setIsAdded(!isAdded);
  };
  const onClickFavourite = () => {
    onFavourite({ id, title, imageUrl, price });
    setIsFavourive(!isFavourite);
  };
  return (<div className={styles.card}>
    <div className={styles.favourite} onClick={onClickFavourite}>
      <img src={isFavourite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Favourite" />
    </div>
    <img width={133} height={112} src={imageUrl} alt="Sneakers" />
    <h5>{title}</h5>
    <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <span>Цена:</span>
        <b>{price} руб.</b>
      </div>
      <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
           alt="plus" />
    </div>
  </div>);
};

export default Card;
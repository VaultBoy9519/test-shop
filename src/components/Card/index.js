import styles from "./Card.module.scss";
import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../AppContext";

function Card({
                id,
                parentId,
                onFavourite,
                onPlus,
                title,
                price,
                imageUrl,
                loading = false
              }) {

  const { isItemAdded } = React.useContext(AppContext);
  const { isItemFavourited } = React.useContext(AppContext);
  const obj = { id, parentId: id, title, imageUrl, price };
  const onClickPlus = () => {
    onPlus(obj);
  };
  const onClickFavourite = () => {
    onFavourite(obj);
  };
  return (<div className={styles.card}>
    {
      loading ?
        <ContentLoader
          speed={2}
          width={160}
          height={250}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> :
        <>
          <div className={styles.favourite} onClick={onClickFavourite}>
            {onFavourite && <img src={isItemFavourited(id) ? "img/liked.svg" : "img/unliked.svg"} alt="Favourite" />}
          </div>
          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && <img className={styles.plus} onClick={onClickPlus}
                            src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"}
                            alt="plus" />}
          </div>
        </>
    }
  </div>);
};

export default Card;
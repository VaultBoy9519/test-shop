import React from "react";
import Card from "../components/Card";
import AppContext from "../AppContext";

function Favourites() {
  const { favourites, onAddToFavourite } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>

      </div>

      <div className="d-flex flex-wrap">
        {favourites.map((item) => (
          <Card key={item.id}
                favourited={true}
                onFavourite={onAddToFavourite}
                {...item} />
        ))}
      </div>
    </div>
  );
}

export default Favourites;
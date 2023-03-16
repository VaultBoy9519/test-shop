import Card from "../components/Card";
import React from "react";

function Home({ items, onAddToFavourite, setSearchValue, searchValue, onAddToCart }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: «${searchValue}»` : "Все кроссовки"}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input onChange={(event) => {
            setSearchValue(event.target.value);
          }} value={searchValue} placeholder="Поиск..." />
          {searchValue &&
            <img onClick={() => setSearchValue("")} className="clear cu-p" src="/img/btn-remove.svg"
                 alt="ClearSearch" />}
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
          <Card key={item.id}
                onFavourite={(obj) => onAddToFavourite(obj)}
                onPlus={(obj) =>
                  onAddToCart(obj)}
                {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
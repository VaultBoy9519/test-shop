import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card";

const arr = [{
  title: "Мужские кроссовки Nike Blazer Mid Suede",
  price: 12999,
  imageUrl: "/img/sneakers/1.jpg"
},
  {
    title: "Мужские кроссовки Nike Air Max 270",
    price: 8499,
    imageUrl: "/img/sneakers/2.jpg"
  },
  {
    title: "Кроссовки Puma X Aka Boka the Legendary",
    price: 15600,
    imageUrl: "/img/sneakers/3.jpg"
  },
  {
    title: "Мужские кроссовки Nike Joka the Popularity",
    price: 8999,
    imageUrl: "/img/sneakers/4.jpg"
  }];


function App() {
  const [cardOpened, setCardOpened] = React.useState(false);
  return (
    <div className="wrapper clear">
      {cardOpened && <Drawer onClose={() => {
        setCardOpened(false);
      }} />}
      <Header onClickCart={() => {
        setCardOpened(true);
      }} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj) => (
            <Card title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  onFavourite={() => alert("Добавлено в закладки")}
                  onPlus={() => alert("Добавлено в корзину")} />
          ))}
        </div>
      </div>
    </div>

  );
}

export default App;

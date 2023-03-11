import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://640c627aa3e07380e8f336cf.mockapi.io/Items").then(res => {
      return res.json();
    }).then(json => {
      setItems(json);
    });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prevState => [...prevState, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer cartItems={cartItems}
                             setCartItems={setCartItems}
                             onClose={() => {
                               setCartOpened(false);
                             }} />}
      <Header onClickCart={() => {
        setCartOpened(true);
      }} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onFavourite={() => alert("Добавлено в закладки")}
                  onPlus={(obj) =>
                    onAddToCart(obj)} />
          ))}
        </div>
      </div>
    </div>

  );
}

export default App;

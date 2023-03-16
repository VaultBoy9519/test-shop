import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [favourites, setFavourites] = React.useState([]);

  React.useEffect(() => {

    axios.get("http://localhost:3001/items").then(res => {
      setItems(res.data);
    });
    axios.get("http://localhost:3001/cart").then(res => {
      setCartItems(res.data);
    });
    axios.get("http://localhost:3001/favourites").then(res => {
      setFavourites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find(item => item.id === obj.id)) {
      axios.delete(`http://localhost:3001/cart/${obj.id}`);
      setCartItems(prevState => prevState.filter(item => item.id !== obj.id));
    } else {
      axios.post("http://localhost:3001/cart", obj);
      setCartItems(prevState => [...prevState, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems(prevState => prevState.filter(item => item.id !== id));
  };

  const onAddToFavourite = (obj) => {
    if (favourites.find(item => item.id === obj.id)) {
      axios.delete(`http://localhost:3001/favourites/${obj.id}`);
      setFavourites(prevState => prevState.filter((item) => item.id !== obj.id));
    } else {
      axios.post("http://localhost:3001/favourites", obj);
      setFavourites(prevState => [...prevState, obj]);
    }
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer cartItems={cartItems}
                             setCartItems={setCartItems}
                             onClose={() => {
                               setCartOpened(false);
                             }}
                             onRemove={onRemoveItem} />}
      <Header onClickCart={() => {
        setCartOpened(true);
      }} />
      <Routes>
        <Route path="" element={<Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onAddToFavourite={onAddToFavourite}
          onAddToCart={onAddToCart} />}>
        </Route>
        <Route path="favourites" element={<Favourites
          items={favourites}
          onAddToFavourite={onAddToFavourite} />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

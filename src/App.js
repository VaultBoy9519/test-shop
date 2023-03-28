import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import AppContext from "./AppContext";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [favourites, setFavourites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get("http://localhost:3001/cart");
      const favouritesResponse = await axios.get("http://localhost:3001/favourites");
      const itemsResponse = await axios.get("http://localhost:3001/items");
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavourites(favouritesResponse.data);
      setItems(itemsResponse.data);
    };

    fetchData();
  }, []);


  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
        setCartItems(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post("http://localhost:3001/cart", obj);
        setCartItems(prevState => [...prevState, data]);
      }
    } catch {
      console.log(`Не удалось добавить в корзину`);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems(prevState => prevState.filter(item => item.id !== id));
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/favourites/${obj.id}`);
        setFavourites(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)));

      } else {
        const { data } = await axios.post("http://localhost:3001/favourites", obj);
        setFavourites(prevState => [...prevState, data]);
      }
    } catch (error) {
      console.log(`не удалось сохранить в избранное`);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id));
  };

  const isItemFavourited = (id) => {
    return favourites.some(obj => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favourites,
        isItemAdded,
        isItemFavourited,
        onAddToFavourite,
        setCartOpened,
        setCartItems
      }}>
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
            favouritesItems={favourites}
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onAddToFavourite={onAddToFavourite}
            isLoading={isLoading}
            onAddToCart={onAddToCart} />}>
          </Route>
          <Route path="favourites" element={<Favourites />}>
          </Route>
          <Route path="orders" element={<Orders />}>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>

  );
}

export default App;

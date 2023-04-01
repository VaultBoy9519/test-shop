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
      try {

        const [cartResponse, favouritesResponse, itemsResponse] = await Promise.all([
          axios.get("http://localhost:3001/cart"),
          axios.get("http://localhost:3001/favourites"),
          axios.get("http://localhost:3001/items")
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log(`Ошибка при загрузке данных`);
        console.error(error);
      }
    }

    fetchData();
  }, []);


  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prevState => prevState.filter(item => Number(item.parentId) !== Number(obj.id)));
        axios.delete(`http://localhost:3001/cart/${findItem.id}`);
      } else {
        setCartItems(prevState => [...prevState, obj]);
        const { data } = await axios.post("http://localhost:3001/cart", obj);
        setCartItems((prevState => prevState.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        })));
      }
    } catch (error) {
      console.log(`Ошибка при добавлении в корзину`);
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      setCartItems(prevState => prevState.filter(item => Number(item.id) !== Number(id)));
      axios.delete(`http://localhost:3001/cart/${id}`);
    } catch (error) {
      console.log(`Ошибка при удалении из корзины`);
      console.error(error);
    }
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(item => Number(item.id) === Number(obj.id))) {
        setFavourites(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)));
        await axios.delete(`http://localhost:3001/favourites/${obj.id}`);

      } else {
        const { data } = await axios.post("http://localhost:3001/favourites", obj);
        setFavourites(prevState => [...prevState, data]);
      }
    } catch (error) {
      console.log(`Ошибка при сохранении в избранное`);
      console.error(error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
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
        <Drawer cartItems={cartItems}
                setCartItems={setCartItems}
                onClose={() => {
                  setCartOpened(false);
                }}
                onRemove={onRemoveItem}
                opened={cartOpened} />
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

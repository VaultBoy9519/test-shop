import React from "react";
import Card from "../components/Card";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        console.log("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>

      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
import styles from "./styles.module.css";
import { OrderCreated } from "../../types";
import { useEffect, useState } from "react";

const OrderButton: React.FC = () => {
  const [order, setOrder] = useState<OrderCreated | undefined>(undefined);

  const handleCreateOrder = async () => {
    const res = await fetch(`http://localhost:3000/api/order`, {
      method: "POST",
    });

    alert(`Creating order...`);

    if (!res.ok) {
      alert("Error creating order");
      return;
    }

    const data = await res.json();
    setOrder(data);
  };

  useEffect(() => {
    if (order) alert(`Order created ${order._id}`);
  }, [order]);

  return (
    <>
      <button className={styles.buttonOrder} onClick={handleCreateOrder}>
        New Order
      </button>
    </>
  );
};

export default OrderButton;

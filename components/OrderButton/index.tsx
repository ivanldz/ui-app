import styles from "./styles.module.css";
import { OrderCreated } from "../../types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderButton: React.FC = () => {
  const [order, setOrder] = useState<OrderCreated | undefined>(undefined);

  const handleCreateOrder = async () => {
    const res = await fetch(`http://kitchen-app:3000/api/order`, {
      method: "POST",
    });

    if (!res.ok) {
      toast.error("Error creating order");
      return;
    }

    const data = await res.json();
    setOrder(data);
  };

  useEffect(() => {
    if (order) toast.info(`Order created ${order._id}`);
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

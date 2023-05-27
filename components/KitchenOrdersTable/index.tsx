import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Order, Page } from "../../types";
import { toast } from "react-toastify";

enum Action {
  PREPARE = "prepare",
  FINISH = "finish",
}

const KitchenOrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (page: number) => {
    const res = await fetch(
      `https://kitchen-app-xs7t.onrender.com/api/order/${page}?status=preparing,queued,waiting`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      return;
    }

    const data: Page<Order> = await res.json();
    setOrders(data.records);
    setTotalPages(data.totalPages);
  };

  const handlePageChange = (page: number) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  const handleAction = async (orderId: string, action: Action) => {

    toast.info(`Changing status to ${orderId}`)

    const res = await fetch(`https://kitchen-app-xs7t.onrender.com/api/order/${action}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: orderId }),
    });

    const order: Order = await res.json();
    console.log(order)
    if (order.status === "waiting") {
      toast.warn("Out of stock, try again later");
    }

    if (order._id) {
      fetchOrders(currentPage);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const COLUMS = ["Order ID", "Recipe", "Status", "Action"];

  return (
    <div className={styles.table}>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            {COLUMS.map((columna, index) => (
              <th key={index}>{columna}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order._id}</td>
              <td>{order.recipe.name}</td>
              <td>{order.status}</td>
              <td>
                {["queued", "waiting"].includes(order.status) ? (
                  <button
                    onClick={() => handleAction(order._id, Action.PREPARE)}
                  >
                    Prepare
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction(order._id, Action.FINISH)}
                  >
                    Finish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length ? (
        <div className={styles.navigation}>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>←</button>
          )}
          {currentPage != totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>→</button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default KitchenOrdersTable;

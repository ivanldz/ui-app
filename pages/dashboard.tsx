import styles from "../styles/Page.module.css";
import OrderButton from "../components/OrderButton";
import OrdersTable from "../components/OrdersTable";
import PurchaseTable from "../components/PurchasesTable";
import IngredientsTable from "../components/IngredientsTable";

const Dashboard = () => {
  return (
    <main>
      <section>
        <h1>Dashboard Section</h1>
        <p>
          Here you can monitor the history of orders and purchases from the
          warehouse, as well as create orders.
        </p>
        <OrderButton />
      </section>
      <section className={styles.tables}>
        <OrdersTable />
        <IngredientsTable />
        <PurchaseTable />
      </section>
    </main>
  );
};

export default Dashboard;

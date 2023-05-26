import styles from "../styles/Page.module.css";
import IngredientsTable from "../components/IngredientsTable";
import KitchenOrdersTable from "../components/KitchenOrdersTable";
import RecipesTable from "../components/RecipesTable";

const Orders = () => {
  return (
    <main>
      <section>
        <h1>Orders Section</h1>
        <p>
          Here you can manage the status of orders, observe the stock and
          remember delicious recipes.
        </p>
      </section>
      <section className={styles.tables}>
        <KitchenOrdersTable />
        <RecipesTable />
        <IngredientsTable />
      </section>
    </main>
  );
};

export default Orders;

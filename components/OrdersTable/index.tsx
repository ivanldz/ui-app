import React, { useState, useEffect } from "react";
import { Order, Page } from "../../types";
import Table from "../Table";

const OrdersTable = () => {
  const [rows, setRows] = useState<string[][]>([[]]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (page: number) => {
    const res = await fetch(`http://kitchen-app:3000/api/order/${page}`, {
      method: "GET",
    });
    if (!res.ok) {
      return;
    }

    const data: Page<Order> = await res.json();
    setRows(
      data.records.map((order) => [order._id, order.recipe.name, order.status])
    );
    setTotalPages(data.totalPages);
  };

  const handlePageChange = (page: number) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  return (
      <Table
        title={"History Orders"}
        colums={["Order ID", "Status", "Recipe"]}
        data={rows}
        page={currentPage}
        setPage={handlePageChange}
        totalPages={totalPages}
      />
  );
};

export default OrdersTable;

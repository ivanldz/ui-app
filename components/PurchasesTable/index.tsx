import React, { useState, useEffect } from "react";
import { Page, Purchase } from "../../types";
import Table from "../Table";

const PurchaseTable = () => {
  const [rows, setRows] = useState<string[][]>([[]]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPurchases = async (page: number) => {
    const res = await fetch(`http://24.199.76.196/warhouse/api/purchases/${page}`, {
      method: "GET",
    });
    if (!res.ok) {
      return;
    }

    const data: Page<Purchase> = await res.json();
    setRows(
      data.records.map((purchase) => [
        purchase.createdAt.split("T")[0],
        purchase.ingredient.name,
        String(purchase.quantity),
      ])
    );
    setTotalPages(data.totalPages);
  };

  const handlePageChange = (page: number) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchPurchases(currentPage);
  }, [currentPage]);

  return (
    <Table
      title={"Purchases at marketplace"}
      colums={["Date", "Ingredient", "Quantity"]}
      data={rows}
      page={currentPage}
      setPage={handlePageChange}
      totalPages={totalPages}
    />
  );
};

export default PurchaseTable;

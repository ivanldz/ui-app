import React, { useState, useEffect } from "react";
import { Ingredient, Page } from "../../types";
import Table from "../Table";

const IngredientsTable = () => {
  const [rows, setRows] = useState<string[][]>([[]]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchIngredients = async (page: number) => {
    const res = await fetch(`http://24.199.76.196/warhouse/api/ingredients/${page}`, {
      method: "GET",
    });
    if (!res.ok) {
      return;
    }

    const data: Page<Ingredient> = await res.json();
    setRows(
      data.records.map((ingredient) => [
        ingredient.icon,
        ingredient.name,
        ingredient.quantity.toString(),
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
    fetchIngredients(currentPage);
  }, [currentPage]);

  return (
      <Table
        title={"Ingredients"}
        colums={["Ingredient", "Name", "Quantity"]}
        data={rows}
        page={currentPage}
        setPage={handlePageChange}
        totalPages={totalPages}
      />
  );
};

export default IngredientsTable;

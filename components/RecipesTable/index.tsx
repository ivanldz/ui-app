import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Recipe, Page } from "../../types";


const RecipesTable: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRecipes = async (page: number) => {
    const res = await fetch(`http://kitchen-app:3000/api/recipe/${page}`, {
      method: "GET",
    });
    if (!res.ok) {
      return;
    }

    const data: Page<Recipe> = await res.json();
    setRecipes(data.records);
    setTotalPages(data.totalPages);
  };

  const handlePageChange = (page: number) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const COLUMS = ["Name", "Ingredients"];

  return (
    <div className={styles.table}>
      <h2>Recipes</h2>
      <table>
        <thead>
          <tr>
            {COLUMS.map((columna, index) => (
              <th key={index}>{columna}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr key={index}>
              <td>{recipe.name}</td>
              <td>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => {
                    return (
                      <li key={index}>
                        {ingredient.ingredient.icon}
                        {ingredient.ingredient.name}:{ingredient.quantity}
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {recipes.length ? (
        <div className={styles.navigation}>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>←</button>
          )}
          {currentPage >= totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>→</button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecipesTable;

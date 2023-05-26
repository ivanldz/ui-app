export interface OrderCreated {
    status: string;
    recipe: string;
    _id: string;
}

export interface IngredientData {
    ingredient: Ingredient;
    quantity: number;
    _id: string;
}

export interface Recipe {
    _id: string;
    name: string;
    ingredients: IngredientData[];
}

export interface Order {
    _id: string;
    status: string;
    recipe: Recipe;
}

export interface Page<T> {
    records: T[];
    totalPages: number;
    perPage: number;
    currentPage: number;
}

export interface Purchase {
    _id: string;
    ingredient: Ingredient;
    quantity: number;
    createdAt: string;
}

export interface Ingredient {
    _id: string;
    name: string;
    icon: string;
    quantity: number;
}
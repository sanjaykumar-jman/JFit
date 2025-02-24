import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

interface FoodItem {
  product_name: string;
  nutriments?: {
    "energy-kcal"?: number;
    proteins?: number;
    carbohydrates?: number;
    fat?: number;
  };
  image_url?: string; // Add image URL field
  date?: string; // Add date field
}

const FoodSearch: React.FC = () => {
  const [foodName, setFoodName] = useState("");
  const [foodResults, setFoodResults] = useState<FoodItem[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 8;

  const searchFood = async () => {
    if (!foodName.trim()) return;

    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${foodName}&json=true`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Filter out results with all nutriments as N/A and those with inaccessible images
      const filteredResults = data.products.filter((product: FoodItem) => {
        return product.nutriments &&
          (product.nutriments["energy-kcal"] !== undefined ||
          product.nutriments.proteins !== undefined ||
          product.nutriments.carbohydrates !== undefined ||
          product.nutriments.fat !== undefined) &&
          product.image_url;
      });

      // Check if image URLs are accessible
      const accessibleResults = await Promise.all(filteredResults.map(async (product: FoodItem) => {
        if (product.image_url) {
          const imageResponse = await fetch(product.image_url);
          if (imageResponse.ok) {
            return product;
          }
        }
        return null;
      
      }));

      const validResults = accessibleResults.filter(product => product !== null) as FoodItem[];

      if (validResults.length > 0) {
        setFoodResults(validResults);
        setError(null);
        setCurrentPage(1); // Reset to first page
      } else {
        setFoodResults([]);
        setError("No food found!");
      }
    } catch {
      setError("Error fetching data!");
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    // Add current date to the selected food item
    const currentDate = new Date().toISOString().split('T')[0]; // Get only the date part
    const foodWithDate = { ...food, date: currentDate };
    setSelectedFoods((prev) => [...prev, foodWithDate]);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const aggregatedData = selectedFoods.reduce(
    (acc, food) => {
      acc.names.push(food.product_name);
      acc.calories += food.nutriments?.["energy-kcal"] ?? 0;
      acc.proteins += food.nutriments?.proteins ?? 0;
      acc.carbs += food.nutriments?.carbohydrates ?? 0;
      acc.fats += food.nutriments?.fat ?? 0;
      return acc;
    },
    {
      names: [] as string[],
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
    }
  );

  const totalPages = Math.ceil(foodResults.length / resultsPerPage);
  const displayedResults = foodResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  return (
    <>
    <Sidebar/>
    <div className="flex flex-col items-center p-6">
      
      <h2 className="text-2xl font-bold mb-4">Food Nutrition Search</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Enter food name"
          className="border p-2 rounded shadow-md"
        />
        <button
          onClick={searchFood}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl mt-4">
        {displayedResults.map((product, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow bg-white transform transition-all duration-200 hover:scale-105 cursor-pointer"
            onClick={() => handleSelectFood(product)}
          >
            <img src={product.image_url} alt={product.product_name} className="w-full h-32 object-cover mb-2 rounded" />
            <strong>{product.product_name || "Unknown Name"}</strong>
            <p>🔥 Calories: {product.nutriments?.["energy-kcal"] ?? "N/A"} kcal</p>
            <p>💪 Proteins: {product.nutriments?.proteins ?? "N/A"} g</p>
            <p>🍞 Carbs: {product.nutriments?.carbohydrates ?? "N/A"} g</p>
            <p>🛢️ Fats: {product.nutriments?.fat ?? "N/A"} g</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded shadow-md ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {selectedFoods.length > 0 && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-100 w-full max-w-md">
          <h3 className="text-xl font-semibold">Selected Foods</h3>
          <p><strong>Names:</strong> {aggregatedData.names.join(", ")}</p>
          <p><strong>Total Calories:</strong> {aggregatedData.calories} kcal</p>
          <p><strong>Total Proteins:</strong> {aggregatedData.proteins} g</p>
          <p><strong>Total Carbs:</strong> {aggregatedData.carbs} g</p>
          <p><strong>Total Fats:</strong> {aggregatedData.fats} g</p>
          <ul>
            {selectedFoods.map((food, index) => (
              <li key={index}>
                <strong>{food.product_name}</strong> - Date: {food.date}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
    </>
  );
};

export default FoodSearch;
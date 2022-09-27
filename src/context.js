import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();

let allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
let randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      let { data } = await axios.get(url);
      setMeals(data.meals);
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  var [loading, setLoading] = useState(false);
  let [meals, setMeals] = useState([]);
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  return (
    <AppContext.Provider value={{ meals, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

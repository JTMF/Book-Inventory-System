import { createContext, useReducer } from "react";

export const StockTakeContext = createContext();

export const stockTakeReducer = (state, action) => {
  switch (action.type) {
    case "SET_STOCKTAKES":
      return { stockTakes: action.payload || [] };

    case "CREATE_STOCKTAKE":
      return { stockTakes: [action.payload, ...state.stockTakes] };

    case "UPDATE_STOCKTAKE":
      return {
        stockTakes: state.stockTakes.map(s =>
          s._id === action.payload._id ? action.payload : s
        ),
      };

    case "DELETE_STOCKTAKE":
      return {
        stockTakes: state.stockTakes.filter(s => s._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const StockTakeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stockTakeReducer, { stockTakes: [] });

  return (
    <StockTakeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StockTakeContext.Provider>
  );
};
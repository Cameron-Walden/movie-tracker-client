import { createContext, useState, useContext } from "react";
export const LoadingContext = createContext();

export default function LoadingProvider({ children }) {
  const [isRecsLoading, setIsRecsLoading] = useState(false);
  const [isFirstFiveLoading, setIsFirstFiveLoading] = useState(false);
  const [isPopLoading, setIsPopLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{
        isRecsLoading,
        setIsRecsLoading,
        isFirstFiveLoading,
        setIsFirstFiveLoading,
        isPopLoading,
        setIsPopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

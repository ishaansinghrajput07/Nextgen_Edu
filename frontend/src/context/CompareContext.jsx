import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const saved = localStorage.getItem("compareUniversities");

      if (!saved) return [];

      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to load compare data:", error);
      return [];
    }
  });

  const addToCompare = (university) => {
    if (!university?._id) {
      return false;
    }

    const exists = compareItems.some(
      (item) => item?._id === university._id
    );

    if (exists) {
      return false;
    }

    if (compareItems.length >= 4) {
      return false;
    }

    // COMPLETE BACKEND OBJECT STORE HOGA
    setCompareItems((prev) => [
      ...prev,
      university,
    ]);

    return true;
  };

  const removeFromCompare = (_id) => {
    setCompareItems((prev) =>
      prev.filter(
        (university) => university?._id !== _id
      )
    );
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  useEffect(() => {
    try {
      localStorage.setItem(
        "compareUniversities",
        JSON.stringify(compareItems)
      );
    } catch (error) {
      console.error(
        "Failed to save compare data:",
        error
      );
    }
  }, [compareItems]);

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  return context;
}
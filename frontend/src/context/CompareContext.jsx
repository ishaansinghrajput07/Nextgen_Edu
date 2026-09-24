import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CompareContext =
  createContext();

export function CompareProvider({
  children,
}) {
  const [compareItems, setCompareItems] = useState(() => {
  const saved = localStorage.getItem("compareUniversities");
  return saved ? JSON.parse(saved) : [];
});

  const addToCompare = (
    university
  ) => {
    if (
      compareItems.find(
        (u) =>
          u._id === university._id
      )
    )
      return;

    if (compareItems.length >= 4)
      return;

    setCompareItems([
      ...compareItems,
      university,
    ]);
  };

  const removeFromCompare = (
    _id
  ) => {
    setCompareItems(
      compareItems.filter(
        (u) => u._id !== _id
      )
    );
  };

  useEffect(() => {
  localStorage.setItem(
    "compareUniversities",
    JSON.stringify(compareItems)
  );
}, [compareItems]);

  const clearCompare = () => {
    setCompareItems([]);
  };

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

export const useCompare = () =>
  useContext(CompareContext);
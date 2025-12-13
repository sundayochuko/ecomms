"use client";

import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

type storetype = {
  name: string;
  address: string;
};

type GlobalContexType = {
  //   cart: ItemsData[];
  //   productData: ItemsData[];
  //   filteredProducts: ItemsData[];
  //   addToCart: (item: cardData) => void;
  //   removeFromCart: (id: number) => void;
  //   updateQuantity: (id: number, amount: number) => void;
  //   clearCart: () => void;

  showMenu: boolean;
  showCart: boolean;
  dropdown: boolean;
  onToggle: (modal: string) => void;
  setShowCart: (value: boolean) => void;
  handleSelect: (location: any) => void;
  selectLocation: storetype;
  storeLocations: storetype[];

  //   filter: ItemsData[];
};

const GlobalContext = createContext<GlobalContexType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [selectLocation, setSelectLocation] = useState<any>(null);

  const storeLocations = [
    {
      name: "Cactus Belle Etoile ",
      address: "Route d'Arlon, 8050 Bertrange",
    },
    {
      name: "Cactus Windhof",
      address: "1 Route d'Arlon, 8399 Windhof Koerich",
    },
    {
      name: "Cactus Howald",
      address: "40 Rue des Scillas, 2529 Howald Hesperange",
    },

    {
      name: " Cactus hobbi Diekirch",
      address: "Rte d'Ettelbruck, 9230 Diekirch",
    },
  ];

  const onToggle = (modal: string) => {
    switch (modal) {
      case "cartegories_modal":
        setShowMenu(true);
        setShowCart(false);
        break;

      case "close_categories":
        setShowMenu(false);
        break;

      case "cart_modal":
        setShowCart(true);
        setShowMenu(false);
        break;

      case "close_modal":
        setShowCart(false);

        break;

      case "dropdown":
        setDropdown((prev) => !prev);

        break;

      default:
        setShowCart(false);
        setShowMenu(false);
        setDropdown(false);
    }
  };

  const handleSelect = (loaction: any) => {
    setSelectLocation(loaction);
  };

  return (
    <GlobalContext.Provider
      value={{
        showMenu,
        showCart,
        dropdown,
        onToggle,
        setShowCart,
        handleSelect,
        selectLocation,
        storeLocations,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error(
      "useGlobalContext must be used within GlobalContextProvider"
    );
  return context;
};

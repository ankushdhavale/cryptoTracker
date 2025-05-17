import { createContext, useState } from "react";

const WishListContext = createContext();

export const WishListContextProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);

  return (
    <WishListContext.Provider value={{ wishList}}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListContext;
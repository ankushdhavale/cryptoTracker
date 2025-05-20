import { createContext, useState } from "react";

const WishListContext = createContext();

export const WishListContextProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);

  const handelWishlist = (coin) => {
    setWishList((prev) => [...prev, coin]);
    console.log(coin);
  }
  // console.log(wishList);
  
  return (
    <WishListContext.Provider value={{ wishList,handelWishlist}}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListContext;
import React, { useContext } from "react";
import WishListContext from "../context/WishListContext";
import { NavLink } from "react-router-dom";
import Tabs from "../components/Dashboard/Tabs/Tabs";
import Button from "../components/Common/Button/Button";

const WishListPage = () => {
	const { wishList } = useContext(WishListContext);
	console.log("hello wishlist page", wishList);
	
    
	return (
		<>
			{ wishList.length > 0 ? (
				<div>
					<Tabs coin={wishList} />
				</div>
			) : (
				 <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
			)}
		</>
	);
};

export default WishListPage;

import React, { useContext, useEffect, useState } from "react";
import WishListContext from "../context/WishListContext";
import { NavLink } from "react-router-dom";
import Tabs from "../components/Dashboard/Tabs/Tabs";
import Button from "../components/Common/Button/Button";
import { get100Coins } from "../functions/get100Coins";

const WishListPage = () => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);

  useEffect(() => { 
    if (watchlist) {
      getData();
    }
  }, []);

  const getData = async () => {
    const allCoins = await get100Coins();
    if (allCoins) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  }

  console.log(watchlist,coins);
  

	return (
		<>
			{ watchlist?.length > 0 ? (
				<div>
					<Tabs coins={coins} />
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

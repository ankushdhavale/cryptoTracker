import axios from "axios";
import React, { useEffect, useState } from "react";
import Tabs from "../components/Dashboard/Tabs/Tabs";

const DashboardPage = () => {
	const [coin, setCoin] = useState([]);

	useEffect(() => {
		axios
			.get(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
			)
			.then((response) => {
				// console.log("Respone>>", response?.data);
				setCoin(response?.data);
			})
			.catch((error) => {
				console.log("Error", error);
			});
	}, []);
	
	return (
		<div>
			<Tabs coin={coin} />
		</div>
	);
};

export default DashboardPage;

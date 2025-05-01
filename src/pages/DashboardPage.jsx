import axios from "axios";
import React, { useEffect, useState } from "react";
import Tabs from "../components/Dashboard/Tabs/Tabs";
import SearchBar from "../components/Dashboard/Search/SearchBar";
import PaginationComponents from "../components/Dashboard/Peginations/Pagination";

const DashboardPage = () => {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState("");

	const onSearchChange = (e) => {
		setSearch(e.target.value);
	};

	var filteredCoins = coins.filter(
		(coin) =>
			coin.name.toLowerCase().includes(search.toLowerCase()) ||
			coin.symbol.toLowerCase().includes(search.toLowerCase())
	);

	console.log(search);

	useEffect(() => {
		axios
			.get(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
			)
			.then((response) => {
				// console.log("Response>>", response?.data);
				setCoins(response?.data);
			})
			.catch((error) => {
				console.log("Error", error);
			});
	}, []);

	return (
		<div>
			<SearchBar
				search={search}
				setSearch={setSearch}
				onSearchChange={onSearchChange}
			/>
			<Tabs coins={filteredCoins} />
			<PaginationComponents/>
		</div>
	);
};

export default DashboardPage;

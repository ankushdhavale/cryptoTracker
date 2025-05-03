import axios from "axios";
import React, { useEffect, useState } from "react";
import Tabs from "../components/Dashboard/Tabs/Tabs";
import SearchBar from "../components/Dashboard/Search/SearchBar";
import PaginationComponents from "../components/Dashboard/Paginations/Pagination";
import Loader from "../components/Common/Loader/Loader";
import BackToTop from "../components/Common/BackToTop/BackToTop";

const DashboardPage = () => {
	const [coins, setCoins] = useState([]);
	const [paginatedCoins, setPaginatedCoins] = useState([]);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	const handlePageChange = (event, value) => {
		setPage(value);
		var previousIndex = (value - 1) * 10;
		setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
	};

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
				setPaginatedCoins(response?.data.slice(0, 10));
				setIsLoading(false);
			})
			.catch((error) => {
				console.log("Error", error);
				setIsLoading(true);
			});
	}, []);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
					<div>
						<BackToTop/>
					<SearchBar
						search={search}
						setSearch={setSearch}
						onSearchChange={onSearchChange}
					/>
					<Tabs coins={search ? filteredCoins : paginatedCoins} />
					{!search && (
						<PaginationComponents
							page={page}
							handlePageChange={handlePageChange}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default DashboardPage;

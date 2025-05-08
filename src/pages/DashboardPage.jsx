import axios from "axios";
import React, { useEffect, useState } from "react";
import Tabs from "../components/Dashboard/Tabs/Tabs";
import SearchBar from "../components/Dashboard/Search/SearchBar";
import PaginationComponents from "../components/Dashboard/Paginations/Pagination";
import Loader from "../components/Common/Loader/Loader";
import BackToTop from "../components/Common/BackToTop/BackToTop";
import { get100Coins } from "../functions/get100Coins";

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
		getData();
	}, []);

	const getData = async () => {
		const mydata = await get100Coins();
		if (mydata) {
			setCoins(mydata);
			setPaginatedCoins(mydata.slice(0, 10));
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<BackToTop />
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

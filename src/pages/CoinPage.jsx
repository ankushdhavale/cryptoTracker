import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Common/Loader/Loader";
import axios from "axios";
import { coinObject } from "../functions/convertObject";
import List from "../components/Dashboard/List/List";
import "../index.css";
import CoinInfo from "../components/Coin/CoinInfo/CoinInfo";

const CoinPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [coinData, setCoinData] = useState([]);
	const { coinId } = useParams();

	useEffect(() => {
		if (coinId) {
			axios
				.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
				.then((response) => {
					console.log("Response>>", response?.data);
					coinObject(setCoinData, response.data);
					setIsLoading(false);
				})
				.catch((error) => {
					console.log("Error", error);
					setIsLoading(true);
				});

			axios.get(
				`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily`
			).then((response) => {
				console.log("Response>>>>>>",response.data.prices);
				
			})
		}
	}, [coinId]);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className='grey-wrapper'>
						<List coin={coinData} />
					</div>
					<CoinInfo heading={coinData.name} desc={coinData.desc} />
				</>
			)}
		</div>
	);
};

export default CoinPage;

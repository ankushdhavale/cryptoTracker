import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Common/Loader/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/Dashboard/List/List";
import "../index.css";
import CoinInfo from "../components/Coin/CoinInfo/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../components/Coin/LineChart/LineChart";
import TogglePriceType from "../components/Coin/PriceType/TogglePriceType";
import SelectDays from "../components/Coin/SelectDays/SelectDays";
import { settingChartData } from "../functions/settingChartData";

const CoinPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [coinData, setCoinData] = useState([]);
	const [days, setDays] = useState(30);
	const [chartData, setChartData] = useState({});
	const [priceType, setPriceType] = useState("prices");

	const { coinId } = useParams();

	useEffect(() => {
		if (coinId) {
			getData();
		}
	}, [coinId]);

	async function getData() {
		const data = await getCoinData(coinId);
		if (data) {
			coinObject(setCoinData, data);
			const prices = await getCoinPrices(coinId, days, priceType);
			if (prices?.length > 0) {
				settingChartData(setChartData, prices);
				setIsLoading(false);
			}
		}
	}

	const handelDaysChange = async (event) => {
		setIsLoading(true);
		setDays(event.target.value);
		console.log(event.target.value);
		
		const prices = await getCoinPrices(coinId, event.target.value, priceType);
		if (prices?.length > 0) {
			settingChartData(setChartData, prices);
			setIsLoading(false);
		}
	};

	const handlePriceTypeChange = async (event, newAlignment) => {
		setPriceType(newAlignment);
		console.log(newAlignment);

		setIsLoading(true);
		setDays(event.target.value);
		const prices = await getCoinPrices(coinId, days, priceType);
		if (prices?.length > 0) {
			settingChartData(setChartData, prices);
			setIsLoading(false);
		}
	};

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className='grey-wrapper'>
						<List coin={coinData} />
					</div>   
					<div className='grey-wrapper'>
						<SelectDays days={days} handelDaysChange={handelDaysChange} />
						<TogglePriceType
							priceType={priceType}
							handlePriceTypeChange={handlePriceTypeChange}
						/>
						<LineChart chartData={chartData} priceType={priceType} />
					</div>
					<CoinInfo heading={coinData.name} desc={coinData.desc} />
				</>
			)}
		</div>
	);
};

export default CoinPage;

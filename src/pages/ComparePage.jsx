import React, { useEffect, useState } from "react";
import SelectCoins from "../components/Compare/SelectCoins/SelectCoins";
import SelectDays from "../components/Coin/SelectDays/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import Loader from "../components/Common/Loader/Loader";
import List from "../components/Dashboard/List/List";
import CoinInfo from "../components/Coin/CoinInfo/CoinInfo";
import LineChart from "../components/Coin/LineChart/LineChart";
import { settingChartData } from "../functions/settingChartData";

const ComparePage = () => {
	const [crypto1, setCrypto1] = useState("bitcoin");
	const [crypto2, setCrypto2] = useState("ethereum");
	const [crypto1Data, setCrypto1Data] = useState({});
	const [crypto2Data, setCrypto2Data] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [priceType, setPriceType] = useState("prices");
	const [chartData, setChartData] = useState({});
	const [days, setDays] = useState(30);

	const handelDaysChange = async (event) => {
		setIsLoading(true);
		setDays(event.target.value);
		const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
		const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);
		settingChartData(setChartData, prices1, prices2);
		setIsLoading(false);
	};

	const getData = async () => {
		try {
			setIsLoading(true);
			const data1 = await getCoinData(crypto1);
			const data2 = await getCoinData(crypto2);

			if (data1 && data2) {
				coinObject(setCrypto1Data, data1);
				coinObject(setCrypto2Data, data2);

				const prices1 = await getCoinPrices(crypto1, days, priceType);
				const prices2 = await getCoinPrices(crypto2, days, priceType);

				if (prices1 && prices2) {
					settingChartData(setChartData, prices1, prices2);
					console.log("Both Prices fetched", prices1, prices2);
				}
			}
		} catch (error) {
			console.error("Error fetching coin data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [crypto1, crypto2, days, priceType]);

	const handelCoinChange = async (event, isCoin2) => {
		try {
			setIsLoading(true);
			const selectedCoin = event.target.value;

			if (isCoin2) {
				setCrypto2(selectedCoin);
				const data = await getCoinData(selectedCoin);
				if (data) coinObject(setCrypto2Data, data);
				const prices1 = await getCoinPrices(crypto1, days, priceType);
				const prices2 = await getCoinPrices(selectedCoin, days, priceType);
				if (prices1 && prices2) {
					settingChartData(setChartData, prices1, prices2);
				}
			} else {
				setCrypto1(selectedCoin);
				const data = await getCoinData(selectedCoin);
				if (data) coinObject(setCrypto1Data, data);
				const prices1 = await getCoinPrices(selectedCoin, days, priceType);
				const prices2 = await getCoinPrices(crypto2, days, priceType);
				if (prices1 && prices2) {
					settingChartData(setChartData, prices1, prices2);
				}
			}
		} catch (error) {
			console.error("Error handling coin change:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className='compare-flex grey-wrapper'>
						<SelectCoins
							crypto1={crypto1}
							crypto2={crypto2}
							handelCoinChange={handelCoinChange}
						/>
						<SelectDays
							days={days}
							handelDaysChange={handelDaysChange}
							noPTag={true}
						/>
					</div>

					<div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
						<List coin={crypto1Data} />
					</div>
					<div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
						<List coin={crypto2Data} />
					</div>
					<div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
						{chartData &&
							chartData.datasets &&
							chartData.datasets.length > 0 && (
								<LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
							)}
					</div>

					<CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
					<CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
				</>
			)}
		</>
	);
};

export default ComparePage;

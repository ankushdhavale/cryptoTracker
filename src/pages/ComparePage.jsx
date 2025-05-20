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
import TogglePriceType from "../components/Coin/PriceType/TogglePriceType";

const ComparePage = () => {
	const [crypto1, setCrypto1] = useState("bitcoin");
	const [crypto2, setCrypto2] = useState("ethereum");
	const [crypto1Data, setCrypto1Data] = useState({});
	const [crypto2Data, setCrypto2Data] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [priceType, setPriceType] = useState("prices");
	const [chartData, setChartData] = useState({});
	const [days, setDays] = useState(30);

	const handleDaysChange = async (event) => {
		try {
			setIsLoading(true);
			const selectedDays = event.target.value;
			setDays(selectedDays);

			const [prices1, prices2] = await Promise.all([
				getCoinPrices(crypto1, selectedDays, priceType),
				getCoinPrices(crypto2, selectedDays, priceType),
			]);

			console.log("Prices1:", prices1);
			console.log("Prices2:", prices2);

			if (prices1?.length && prices2?.length) {
				settingChartData(setChartData, prices1, prices2);
			}
		} catch (error) {
			console.error("Error changing days:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePriceTypeChange = async (event, newType) => {
		try {
			setPriceType(newType);
			setIsLoading(true);

			const price1 = await getCoinPrices(crypto1, days, newType);
			const price2 = await getCoinPrices(crypto2, days, newType);

			settingChartData(setChartData, price1, price2);
		} catch (error) {
			console.error("Error fetching coin prices:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCoinChange = async (event, isCoin2) => {
		try {
			setIsLoading(true);
			const selectedCoin = event.target.value;

			if (isCoin2) {
				setCrypto2(selectedCoin);
				const data2 = await getCoinData(selectedCoin);
				if (data2) coinObject(setCrypto2Data, data2);

				const [prices1, prices2] = await Promise.all([
					getCoinPrices(crypto1, days, priceType),
					getCoinPrices(selectedCoin, days, priceType),
				]);

				if (prices1?.length && prices2?.length) {
					settingChartData(setChartData, prices1, prices2);
				}
			} else {
				setCrypto1(selectedCoin);
				const data1 = await getCoinData(selectedCoin);
				if (data1) coinObject(setCrypto1Data, data1);

				const [prices1, prices2] = await Promise.all([
					getCoinPrices(selectedCoin, days, priceType),
					getCoinPrices(crypto2, days, priceType),
				]);

				if (prices1?.length && prices2?.length) {
					settingChartData(setChartData, prices1, prices2);
				}
			}
		} catch (error) {
			console.error("Error changing coin:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const getData = async () => {
		try {
			setIsLoading(true);

			const [data1, data2] = await Promise.all([
				getCoinData(crypto1),
				getCoinData(crypto2),
			]);

			if (data1 && data2) {
				coinObject(setCrypto1Data, data1);
				coinObject(setCrypto2Data, data2);

				const [prices1, prices2] = await Promise.all([
					getCoinPrices(crypto1, days, priceType),
					getCoinPrices(crypto2, days, priceType),
				]);

				console.log("Prices1:", prices1);
				console.log("Prices2:", prices2);

				if (prices1?.length && prices2?.length) {
					settingChartData(setChartData, prices1, prices2);
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
							handelCoinChange={handleCoinChange}
						/>
						<SelectDays
							days={days}
							handelDaysChange={handleDaysChange}
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
							<TogglePriceType
							priceType={priceType}
							handlePriceTypeChange={handlePriceTypeChange}
						/>
						{chartData?.datasets?.length > 0 &&
							chartData.datasets[0]?.data?.length > 0 && (
								<LineChart
									chartData={chartData}
									priceType={priceType}
									multiAxis={true}
								/>
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

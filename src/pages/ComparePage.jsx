import React, { useEffect, useState } from "react";
import SelectCoins from "../components/Compare/SelectCoins/SelectCoins";
import SelectDays from "../components/Coin/SelectDays/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import Loader from "../components/Common/Loader/Loader";

const ComparePage = () => {
	const [crypto1, setCrypto1] = useState("bitcoin");
	const [crypto2, setCrypto2] = useState("ethereum");
	const [crypto1Data, setCrypto1Data] = useState({});
	const [crypto2Data, setCrypto2Data] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [days, setDays] = useState(30);


	console.log("crypto1Data",crypto1Data);
	
	const handelDaysChange = (event) => {
		setDays(event.target.value);
	};

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		setIsLoading(true);
		const data1 = await getCoinData(crypto1);
		const data2 = await getCoinData(crypto2);
		console.log("data 1 and data 2",data1,data2);
		
		if (data1) {
			coinObject(setCrypto1Data, data1);
		}
		if (data2) {
			coinObject(setCrypto2Data, data2);
		}
		if (data1 && data2) {
			const price1 = await getCoinPrices(crypto1, days, "prices");
			const price2 = await getCoinPrices(crypto2, days, "prices");
			if (price1.length > 0 && price2.length > 0) {
			// settingChartData(setChartData, prices);
			console.log("Both Prices fetch ", price1, price2);
			setIsLoading(false);
		}
		}
	};
	const handelCoinChange = async (event, isCoin2) => {
		setIsLoading(true);
		if (isCoin2) {
			setCrypto2(event.target.value);
			const data = await getCoinData(event.target.value);
			if (data) {
				coinObject(setCrypto2Data, data);
				const prices = await getCoinPrices(event.target.value, days, "prices");
				if (prices?.length > 0) {
					// settingChartData(setChartData, prices);
					setIsLoading(false);
				}
			}
		} else {
			setCrypto1(event.target.value);
			const data = await getCoinData(event.target.value);
			if (data) {
				coinObject(setCrypto1Data, data);
				const prices = await getCoinPrices(event.target.value, days, "prices");
				if (prices?.length > 0) {
					// settingChartData(setChartData, prices);
					setIsLoading(false);
				}
			}
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className='compare-flex'>
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
				</>
			)}
		</>
	);
};

export default ComparePage;

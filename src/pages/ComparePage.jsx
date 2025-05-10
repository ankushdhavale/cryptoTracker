import React, { useEffect, useState } from "react";
import SelectCoins from "../components/Compare/SelectCoins/SelectCoins";
import SelectDays from "../components/Coin/SelectDays/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import Loader from "../components/Common/Loader/Loader";
import List from "../components/Dashboard/List/List";
import CoinInfo from "../components/Coin/CoinInfo/CoinInfo";

const ComparePage = () => {
	const [crypto1, setCrypto1] = useState("bitcoin");
	const [crypto2, setCrypto2] = useState("ethereum");
	const [crypto1Data, setCrypto1Data] = useState({});
	const [crypto2Data, setCrypto2Data] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [priceType, setPriceType] = useState("prices");

	const [days, setDays] = useState(30);

	console.log("crypto1Data", crypto1Data);

	const handelDaysChange = (event) => {
		setDays(event.target.value);
	};

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		setIsLoading(true);
		const data1 = await getCoinData(crypto1);
		if (data1) {
			const data2 = await getCoinData(crypto2);
			coinObject(setCrypto1Data, data1);
			if (data2) {
				coinObject(setCrypto2Data, data2);
				const price1 = await getCoinPrices(crypto1, days, priceType);
				const price2 = await getCoinPrices(crypto2, days, priceType);
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
			coinObject(setCrypto2Data, data);
		} else {
			setCrypto1(event.target.value);
			const data = await getCoinData(event.target.value);
			coinObject(setCrypto1Data, data);
		}

		const prices1 = await getCoinPrices(crypto1, days, priceType);
		const prices2 = await getCoinPrices(crypto2, days, priceType);
		if (prices1?.length > 0 && prices2?.length > 0) {
			// settingChartData(setChartData, prices);
			console.log("Both Prices fetch ", prices1,prices2);
			setIsLoading(false);
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
							handelCoinChange={handelCoinChange}
							crypto2={crypto2}
						/>
						<SelectDays
							days={days}
							handelDaysChange={handelDaysChange}
							noPTag={true}
						/>
						</div>
						<div className="grey-wrapper" style={{padding:"0rem 1rem"}}>
							<List coin={crypto1Data } />
						</div>
						<div className="grey-wrapper" style={{padding:"0rem 1rem"}}>
							<List coin={crypto2Data } />
						</div>
						<CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
						<CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
				</>
			)}
		</>
	);
};

export default ComparePage;

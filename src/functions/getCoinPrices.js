import axios from "axios";

export const getCoinPrices = (coinId,days,priceType) => {
	const pricesData = axios
		.get(
			`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
		)
		.then((response) => {
			console.log("Response>>>>>> prices", response.data.prices.length);
			return response.data[priceType];
		})
		.catch((error) => {
			console.log("Error", error);
		});
	return pricesData;
};

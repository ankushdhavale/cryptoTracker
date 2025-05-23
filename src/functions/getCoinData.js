import axios from "axios";

export const getCoinData = (coinId) => {
	const myData = axios
		.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
		.then((response) => {
			console.log("Response>>", response?.data);
			return response.data;
		})
		.catch((error) => {
			console.log("Error", error);
		});
	return myData;
};

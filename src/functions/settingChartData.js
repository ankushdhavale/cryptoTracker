import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices1, prices2) => {
	const labels = prices1.map((price) => convertDate(price[0]));

	if (prices2) {
		return setChartData({
			labels,
			datasets: [
				{
					label: "crypto1",
					data: prices1.map((price) => price[1]),
					borderColor: "#3a80e9",
					borderWidth: 2,
					fill: false,
					tension: 0.25,
					pointRadius: 0,
					yAxisID: "crypto1",
				},
				{
					label: "crypto2",
					data: prices2.map((price) => price[1]),
					borderColor: "#61c96f",
					borderWidth: 2,
					fill: true,
					tension: 0.25,
					pointRadius: 1,
					yAxisID: "crypto2",
				},
			],
		});
	} else {
		return setChartData({
			labels,
			datasets: [
				{
					label: "crypto1",
					data: prices1.map((price) => price[1]),
					borderColor: "#3a80e9",
					backgroundColor: "rgba(58,128,233,0.1)",
					borderWidth: 2,
					fill: true,
					tension: 0.25,
					pointRadius: 1,
					yAxisID: "crypto1", 
				},
			],
		});
	}
};

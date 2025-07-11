import { toast } from "react-toastify";

export const removeItemToWatchlist = (e, id, setIsCoinAdded) => {
	e.preventDefault();
	if (window.confirm("Are you sure you want to remove this coin?")) {
		let watchlist = JSON.parse(localStorage.getItem("watchlist"));
		const newList = watchlist.filter((coin) => coin != id);
		setIsCoinAdded(false);
		localStorage.setItem("watchlist", JSON.stringify(newList));
		// toast success remove item
		toast.success(
			`${(id.substring(0, 1).toUpperCase() + id.substring(1))}-has been remove`
		);
		window.location.reload();
	} else {
		//toast error
		toast.error(
			`${(id.substring(0, 1).toUpperCase() + id.substring(
				1
			))}- could not be remove.`
		);
		setIsCoinAdded(true);
	}
};

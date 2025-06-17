import { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";

function Grid({ coin }) {
	const watchlist = JSON.parse(localStorage.getItem("watchlist"));
	const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
	console.log("is coinAdded",isCoinAdded);
	

	console.log("hello1", coin);
	return (
		<a href={`/coin/${coin.id}`}>
		<div
			className={`grid-container ${
				coin?.price_change_percentage_24h < 0 && "grid-container-red"
			}`}
		>
			{coin <= 0 && <div>hello</div>}
			<div className='info-flex'>
				<img src={coin.image} className='coin-logo' />
				<div className='name-col'>
					<p className='coin-symbol'>{coin.symbol}</p>
					<p className='coin-name'>{coin?.name?.slice(1, 17)}</p>
				</div>
				{coin.price_change_percentage_24h > 0 ? (
					<div className='info-flex-wishList-icon'>
						<div onClick={(e) => {
									if (isCoinAdded) {
										//remove coin

										removeItemToWatchlist(e, coin.id,setIsCoinAdded);
									} else {
										setIsCoinAdded(e, coin.id);
										saveItemToWatchlist(e, coin.id);
									}
								}}>
							<StarBorderRoundedIcon />
						</div>
					</div>
				) : (
					<div className='info-flex-wishList-icon-red'>
								<div onClick={(e) => {
									if (isCoinAdded) {
										//remove coin

										removeItemToWatchlist(e, coin.id);
									} else {
										setIsCoinAdded(e, coin.id);
										saveItemToWatchlist(e, coin.id);
									}
								}}>
							<StarBorderRoundedIcon />
						</div>
					</div>
				)}
			</div>

			{coin.price_change_percentage_24h > 0 ? (
				<div className='chip-flex'>
					<div className='price-chip'>
						{coin?.price_change_percentage_24h?.toFixed(2) + "%"}
					</div>
					<div className='icon-chip'>
						<TrendingUpRoundedIcon />
					</div>
				</div>
			) : (
				<div className='chip-flex'>
					<div className='price-chip price-chip-red'>
						{coin?.price_change_percentage_24h?.toFixed(2) + "%"}
					</div>
					<div className='icon-chip chip-red'>
						<TrendingUpRoundedIcon />
					</div>
				</div>
			)}
			<div className='coin-info'>
				<h3
					className='coin-price'
					style={{
						color:
							coin?.price_change_percentage_24h > 0
								? "var(--green)"
								: "var(--red)",
					}}
				>
					${coin?.current_price?.toLocaleString()}
				</h3>
				<p className='total-volume'>
					Total Volume : {coin?.total_volume?.toLocaleString()}
				</p>
				<p className='total-volume'>
					Market Cap : ${coin?.market_cap?.toLocaleString()}
				</p>
			</div>
		</div>
	</a>
	);
}

export default Grid;

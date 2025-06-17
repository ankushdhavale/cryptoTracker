import React, { useContext } from "react";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import Tooltip from "@mui/material/Tooltip";
import "./styles.css";
import { convertNumbers } from "../../../functions/convertNumbers";
import { NavLink } from "react-router-dom";
import WishListContext from "../../../context/WishListContext";

const List = ({ coin }) => {
	console.log("List",coin);
	return (
		<tr className='list-row'>
			<Tooltip title='Coin Logo' placement='bottom-end'>
				<td className='td-image td-img-res'>
					<img src={coin?.image} className='coin-logo logo-res' />
				</td>
			</Tooltip>
			<Tooltip title='Coin Info' placement='bottom-start'>
				<td>
					<div className='name-col name-col-res'>
						<p className='coin-symbol coin-symbol-res'>{coin?.symbol}</p>
						<p className='coin-name coin-name-res'>{coin?.name?.slice(1, 17)}</p>
					</div>
				</td>
			</Tooltip>
			<Tooltip title='Price Change in 24H' placement='bottom-end'>
				{coin?.price_change_percentage_24h > 0 ? (
					<td className='chip-flex chip-flex-res'>
						<div className='price-chip price-chip-res'>
							{coin.price_change_percentage_24h?.toFixed(2) + "%"}
						</div>
						<div className='icon-chip icon-chip-res'>
							<TrendingUpRoundedIcon />
						</div>
					</td>
				) : (
					<td className='chip-flex chip-flex-res'>
						<div className='price-chip price-chip-red price-chip-res'>
							{coin?.price_change_percentage_24h?.toFixed(2) + "%"}
						</div>
						<div className='icon-chip chip-red icon-chip-res'>
							<TrendingUpRoundedIcon />
						</div>
					</td>
				)}
			</Tooltip>
			<Tooltip title='Coin Price' placement='bottom-end'>
				<td className='coin-info coin-info-res'>
					<h1
						className='coin-price td-center-right coin-price-res'
						style={{
							color:
							coin?.price_change_percentage_24h > 0
									? "var(--green)"
									: "var(--red)",
						}}
					>
						${coin?.current_price?.toLocaleString()}
					</h1>
				</td>
			</Tooltip>
			<Tooltip title='Total Volume' placement='bottom-end'>
				<td className="total-volume-res">
					<p className='total-volume td-align-right'>
						{coin?.total_volume?.toLocaleString()}
					</p>
				</td>
			</Tooltip>
			<Tooltip title='Market Cap' placement='bottom-end'>
				<td className='desktop-td-mkt market-cap-res'>
					<p className='total-cap td-align-right market-cap-res'>
						${coin?.market_cap?.toLocaleString()}
					</p>
				</td>
			</Tooltip>
			<Tooltip title='Market Cap' placement='bottom-end'>
				<td className='mobile-td-mkt '>
					<p className='total-cap td-align-right total-cap-res'>
						${convertNumbers(coin?.market_cap)}
					</p>
				</td>
			</Tooltip>
			{coin?.price_change_percentage_24h > 0 ? (
					<div className='info-flex-wishList-icon'>
							<button>
								<StarBorderRoundedIcon />
							</button>
					</div>
				) : (
					<div className='info-flex-wishList-icon-red'>
							<button>
								<StarBorderRoundedIcon />
							</button>
					</div>
				)}
		</tr>
	);
};

export default List;

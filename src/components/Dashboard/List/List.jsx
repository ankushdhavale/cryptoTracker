import React from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import Tooltip from "@mui/material/Tooltip";
import "./styles.css";
import { convertNumbers } from "../../../functions/convertNumbers";

const List = ({ coin }) => {
	return (
		<tr className='list-row'>
			<Tooltip title='Coin Logo' placement='bottom-end'>
				<td className='td-image'>
					<img src={coin?.image} className='coin-logo' />
				</td>
			</Tooltip>
			<Tooltip title='Coin Info' placement='bottom-start'>
				<td>
					<div className='name-col'>
						<p className='coin-symbol'>{coin?.symbol}</p>
						<p className='coin-name'>{coin?.name?.slice(1, 17)}</p>
					</div>
				</td>
			</Tooltip>
			<Tooltip title='Price Change in 24H' placement='bottom-end'>
				{coin?.price_change_percentage_24h > 0 ? (
					<td className='chip-flex'>
						<div className='price-chip'>
							{coin.price_change_percentage_24h?.toFixed(2) + "%"}
						</div>
						<div className='icon-chip'>
							<TrendingUpRoundedIcon />
						</div>
					</td>
				) : (
					<td className='chip-flex'>
						<div className='price-chip price-chip-red'>
							{coin?.price_change_percentage_24h?.toFixed(2) + "%"}
						</div>
						<div className='icon-chip chip-red'>
							<TrendingUpRoundedIcon />
						</div>
					</td>
				)}
			</Tooltip>
			<Tooltip title='Coin Price' placement='bottom-end'>
				<td className='coin-info'>
					<h3
						className='coin-price td-center-right'
						style={{
							color:
							coin?.price_change_percentage_24h > 0
									? "var(--green)"
									: "var(--red)",
						}}
					>
						${coin?.current_price?.toLocaleString()}
					</h3>
				</td>
			</Tooltip>
			<Tooltip title='Total Volume' placement='bottom-end'>
				<td>
					<p className='total-volume td-align-right'>
						{coin?.total_volume?.toLocaleString()}
					</p>
				</td>
			</Tooltip>
			<Tooltip title='Market Cap' placement='bottom-end'>
				<td className='desktop-td-mkt'>
					<p className='total-cap td-align-right'>
						${coin?.market_cap?.toLocaleString()}
					</p>
				</td>
			</Tooltip>
			<Tooltip title='Market Cap' placement='bottom-end'>
				<td className='mobile-td-mkt'>
					<p className='total-cap td-align-right'>
						${convertNumbers(coin?.market_cap)}
					</p>
				</td>
			</Tooltip>
		</tr>
	);
};

export default List;

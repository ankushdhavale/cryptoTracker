import React from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import Tooltip from "@mui/material/Tooltip";
import "./styles.css";

const List = ({ item }) => {
	return (
		<tr className='list-row'>
			<Tooltip title='Coin Logo' placement="bottom-end">
				<td className='td-image'>
					<img src={item.image} className='coin-logo' />
				</td>
			</Tooltip>
			<Tooltip title='Coin Info' placement="bottom-start">
				<td>
					<div className='name-col'>
						<p className='coin-symbol'>{item.symbol}</p>
						<p className='coin-name'>{item.name.slice(1, 17)}</p>
					</div>
				</td>
			</Tooltip>
			<Tooltip title='Price Change in 24H' placement="bottom-end">
				{item.price_change_percentage_24h > 0 ? (
					<td className='chip-flex'>
						<div className='price-chip'>
							{item.price_change_percentage_24h.toFixed(2) + "%"}
						</div>
						<div className='icon-chip'>
							<TrendingUpRoundedIcon />
						</div>
					</td>
				) : (
					<td className='chip-flex'>
						<div className='price-chip price-chip-red'>
							{item.price_change_percentage_24h.toFixed(2) + "%"}
						</div>
						<div className='icon-chip chip-red'>
					 		<TrendingUpRoundedIcon />
						</div>
					</td>
				)}
			</Tooltip>
			<Tooltip title='Coin Price' placement="bottom-end">
				<td className='coin-info'>
					<h3
						className='coin-price td-center-right'
						style={{
							color:
								item.price_change_percentage_24h > 0
									? "var(--green)"
									: "var(--red)",
						}}
					>
						${item.current_price.toLocaleString()}
					</h3>
				</td>
			</Tooltip>
			<Tooltip title='Total Volume' placement="bottom-end">
				<td>
					<p className='total-volume td-align-right'>
						{item.total_volume.toLocaleString()}
					</p>
				</td>
			</Tooltip>
			<Tooltip title='Market Cap' placement="bottom-end">
				<td>
					<p className='total-volume td-align-right'>
						${item.market_cap.toLocaleString()}
					</p>
				</td>
			</Tooltip>
		</tr>
	);
};

export default List;

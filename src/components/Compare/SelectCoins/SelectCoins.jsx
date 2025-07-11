import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { get100Coins } from "../../../functions/get100Coins";
import "./styles.css";

const SelectCoins = ({
	crypto1,
	setCrypto1,
	crypto2,
	setCrypto2,
}) => {
	const [allCoins, setAllCoins] = useState([]);
	const styles = {
		height: "2.5rem",
		color: "var(--white)",
		"& .MuiOutlinedInput-notchedOutline": {
			borderColor: "var(--white)",
		},
		"& .MuiSvgIcon-root": {
			color: "var(--white)",
		},
		"&:hover": {
			"&& fieldset": {
				borderColor: "#3a80e9",
			},
		},
	};

	 const handelCoinChange = (event, isCoin2) => {
		console.log(event.target.value,isCoin2,"hello");
		
		 if (!isCoin2) {
			 setCrypto1(event.target.value);
		 } else {
			 setCrypto2(event.target.value);
		 }
		 
		 
	 	// if(isCoin2) {
	 	// 	setCrypto2(event.target.value);
	 	// 	console.log("crypto 2",event.target.value);
		// }else {
		// 	setCrypto1(event.target.value);
		// 	console.log("crypto 1",event.target.value);
		// }
	};


	const getData = async () => {
		const myData = await get100Coins();
		setAllCoins(myData);
	};

	useEffect(() => {
		getData();
	}, []);


	return (
		<div className='coin-flex'>
			<div className="coin-flex-select-1">
				<p>Crypto 1</p>
				<Select
					sx={styles}
					value={crypto1}
					label='Crypto1'
					onChange={(event) => handelCoinChange(event, false)}
				>
					{allCoins?.map((coin) => (
						<MenuItem key={coin.id} value={coin.id}>
							{coin.name}
						</MenuItem>
					))}
				</Select>
			</div>
			<div className="coin-flex-select-2">
				<p>Crypto 2</p>
				<Select
					sx={styles}
					value={crypto2}
					label='Crypto2'
					onChange={(event) => handelCoinChange(event, true)}
				>
					{allCoins?.map((coin) => (
						<MenuItem key={coin.id} value={coin.id}>
							{coin.name}
						</MenuItem>
					))}
				</Select>
			</div>
		</div>
	);
};

export default SelectCoins;

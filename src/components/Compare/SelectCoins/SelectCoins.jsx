import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { get100Coins } from "../../../functions/get100Coins";
import "./styles.css";

const SelectCoins = ({ crypto1, setCrypto1,crypto2, setCrypto2}) => {
	
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
		if (isCoin2) {
			setCrypto2(event.target.value);	
			console.log("crypto 2",event.target.value);
			
		} else {
			setCrypto1(event.target.value);
			console.log("crypto 1",event.target.value);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const myData = await get100Coins();
		setAllCoins(myData);
	};
	console.log(allCoins);

	return (
		<div className="coin-flex">
			<p>Crypto 1</p>
			<Select
				sx={styles}
				value={crypto1}
				label='Crypto 1'
				onChange={(event)=>handelCoinChange(event,false)}
			>
				{allCoins.map((coin) => (
					<MenuItem value={coin.id}>{coin.name}</MenuItem>
				))}
			</Select>

			<p>Crypto 2</p>
			<Select
				sx={styles}
				value={crypto2}
				label='Crypto 2'
				onChange={(event)=>handelCoinChange(event,true)}
			>
				{allCoins.map((coin) => (
					<MenuItem value={coin.id}>{coin.name}</MenuItem>
				))}
			</Select>
		</div>
	);
};

export default SelectCoins;

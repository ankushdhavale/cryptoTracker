import * as React from "react";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./styles.css";
export default function TogglePriceType() {
	const [priceType, setPriceType] = useState("prices");

	const handlePriceTypeChange = (event, newAlignment) => {
		setPriceType(newAlignment);
	};

	return (
		<ToggleButtonGroup
			value={priceType}
			exclusive
			onChange={handlePriceTypeChange}
		>
			<ToggleButton value='prices' aria-label='left aligned'>
				Price
			</ToggleButton>
			<ToggleButton value='market_caps' aria-label='centered'>
				Market Cap
			</ToggleButton>
			<ToggleButton value='total_volumes' aria-label='right aligned'>
				Total Volume
			</ToggleButton>
		</ToggleButtonGroup>
	);
}

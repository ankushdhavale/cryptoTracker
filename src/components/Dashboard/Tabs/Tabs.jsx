import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import Grid from "../Grid/Grid";
import "./styles.css";
import List from "../List/List";

export default function Tabs({ coins }) {
	const [value, setValue] = React.useState("Grid");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	console.log(coins);

	const style = {
		color: "var(--white)",
		width: "50vh",
		fontSize: "1.2rem",
		fontWeight: 600,
		fontFamily: "Inter",
		textTransform: "capitalize",
	};

	const theme = createTheme({
		palette: {
			primary: {
				main: "#3a80e9",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<TabContext value={value}>
				<TabList onChange={handleChange} variant='fullWidth'>
					<Tab label='Grid' value='Grid' sx={style} />
					<Tab label='List' value='List' sx={style} />
				</TabList>
				<TabPanel value='Grid'>
					<div className='grid-flex'>
						{coins.map((coin, i) => {
							return <Grid coin={coin} key={i} />;
						})}
					</div>
				</TabPanel>
				<TabPanel value='List'>
				<div className='list-table'>
						{coins.map((item, i) => {
							return <List item={item} key={i} />;
						})}
					</div>
				</TabPanel>
			</TabContext>
		</ThemeProvider>
	);
}

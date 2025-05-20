import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function AnchorTemporaryDrawer() {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<IconButton onClick={() => setOpen(true)}>
				<MenuRoundedIcon className='link' />
			</IconButton>
			<Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
				<div className='drawer-div'>
					<Link to='/'>
						<p className='link'>Home</p>
					</Link>
					<Link to='/compare'>
						<p className='link'>Compare</p>
					</Link>
					<Link to='/wishlist'>
						<p className='link'>WatchList</p>
					</Link>
					<Link to='/dashboard'>
						<Button
							text={"Dashboard"}
							outlined={false}
							onClick={() => console.log("click")}
						/>
					</Link>
				</div>
			</Drawer>
		</div>
	);
}

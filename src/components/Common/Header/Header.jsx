import React from "react";
import "./styles.css";
import TemporaryDrawer from "./Drawer";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className='navbar'>
			<h1 className='logo'>
				<Link to="/">CryptoTracker<span style={{ color: "var(--blue)" }}>.</span></Link>
			</h1>
			<div className='links'>
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
			<div className='mobile-drawer'>
				<TemporaryDrawer />
			</div>
		</div>
	);
};

export default Header;

import React from "react";
import "./styles.css";
import TemporaryDrawer from "./Drawer";
import Button from "../Button/Button";

const Header = () => {
	return (
		<div className='navbar'>
			<h1 className='logo'>
				CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
			</h1>
			<div className='links'>
				<a href='/'>
					<p className='link'>Home</p>
				</a>
				<a href='/'>
					<p className='link'>Compare</p>
				</a>
				<a href='/'>
					<p className='link'>WatchList</p>
				</a>
				<a href='/'>
					<Button
						text={"Dashboard"}
						outlined={false}
						onClick={()=>console.log("click")
						}/>
				</a>
			</div>
			<div className="mobile-drawer">
				<TemporaryDrawer />
			</div>
		</div>
	);
};

export default Header;

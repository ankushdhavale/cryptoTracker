import "./style.css";

const Button = ({ text, outlined, onClick }) => {
	return (
		<div
			className={outlined ? "outlined-btn" : "btn"}
			onClick={() => onClick()}
		>
			{text}
		</div>
	);
};

export default Button;

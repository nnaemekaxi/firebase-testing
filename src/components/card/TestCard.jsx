import React from "react";
import { Link } from "react-router-dom";
import subjectPreview from "../../assets/images/subjectPreview.png";
import Coin from "../coin/Coin";
import ColorBgBtn from "../button/ColorBgBtn";

const TestCard = (props) => {
	const handleTestReset = () => {
		localStorage.clear();
	}
	
	const { coinValue, imagePreview, time, topic } = props;
	return (
		<div className="test-card">
			<div className="details">
				<Coin value={coinValue} />
				<div className="topic-wrapper">
					<h5>{topic}</h5>
					<p>{time} minutes</p>
				</div>
				<Link to="/test" onClick={handleTestReset}><ColorBgBtn text="start" padding="0.38rem 0.39rem" /></Link>
			</div>
			<div className="image-wrapper">
				<img src={imagePreview} alt={topic} />
			</div>
		</div>
	);
};

export default TestCard;

TestCard.defaultProps = {
	coinValue: 50,
	imagePreview: subjectPreview,
	time: 30,
	topic: "use of english",
};

import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import ColorBgBtn from "../button/ColorBgBtn";

const CallToAction = () => {
	const { user } = UserAuth();
	return (
		<section className="call-to-action banner">
			<h2>Do You Want To Ace Your Exams With Confidence?</h2>
			<div className="mobile-view-btn">
			{
				user ? 
					<Link to="/take-a-test">
						<ColorBgBtn	
						borderRadius="0.313rem" 
						padding="0.625rem 2.188rem"
						/></Link> 
				: 
					<Link to="/signup">
						<ColorBgBtn	
						borderRadius="0.313rem" 
						padding="0.625rem 2.188rem"
						/></Link>
			}
			</div>
			<div className="desktop-view-btn">
			{
				user ?	
					<Link to="/take-a-test">
						<ColorBgBtn 
						padding="1.25rem 2.625rem" 
						/></Link> 
				: 
					<Link to="/signup">
						<ColorBgBtn 
						padding="1.25rem 2.625rem" 
						/></Link>
			}
			</div>
		</section>
	);
};

export default CallToAction;

import React, {useState } from "react";
import axios from "axios";
import styles from "./test.module.css";
import Timer from "./clock";

const Test = () => {
	const [subject, setSubject] = useState("");
	const [start, setStart] = useState(true);
	const [allQuestions, setAllQuestions] = useState(null)
	const [choice, setChoice] = useState(JSON.parse(localStorage.getItem("choice")) || {})
	const [choices, setChoices] = useState([]);
	const [count, setCount] = useState(0);
	const [finalScore, setFinalScore] = useState(0);
	const [publish, setPublish] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState(false);
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		31, 32, 33, 34, 35, 36, 37, 38, 39, 40
	];

	
	async function handleTest(e){
		e.preventDefault();
		
		if (localStorage.getItem("choice")){
			localStorage.clear();
			location.reload();
		}

		const mysubject = subject
		setStart(false)	
		setIsLoading("Please Wait...");			
		try {
			const questions = await axios.get(`https://questions.aloc.com.ng/api/v2/m?subject=${mysubject}`,
			{
				headers: {
				"AccessToken": "QB-91e2cfa590f5e7fcd4c8"
				}
		})
		setAllQuestions(questions.data.data);				
			setTimeout(() => {
				handleSubmit();;
				}, 1800000)
		} catch (error) {
			console.log(error.message);
			setStart(true);
			setResponse("Network Error! Try Again");
		}
		setIsLoading(false)
	}

	const handleSubmit = () => {
		let choices = JSON.parse(localStorage.getItem("choices") || "{}")
		let values = Object.values(choices);
		let score = 0;
		for (let index = 0; index < values.length; index++) {
			if (values[index] === true){
				score +=1;
			};
				
		}
		setFinalScore(score);
		setPublish(true);
		setAllQuestions(null);
	}
	const handleChange = (e) => {
		e.preventDefault();
		setChoices((prev) => {
			let data = {...prev, [e.target.name]: e.target.value === e.target.title}
			localStorage.setItem("choices", JSON.stringify(data));
			return data;
	})
		setChoice((prev) => {
			let data = {...prev, [e.target.name]: e.target.value}
			localStorage.setItem("choice", JSON.stringify(data));
			return data;
	})

}
	const getPreviousQuestion = () => {
		handleChange;
		if (count <= 0){
			setCount(0)
		} else{
			setCount(count-1);
		}
	}
	const getNextQuestion = () => {
		handleChange;
		if (count >=39){
			setCount(39)
			handleSubmit();
		} else {
			setCount(count+1);
		}
	}
	const ResetTest = () =>{
		setStart(true);
		setCount(0);
		localStorage.clear();
		location.reload();
		setPublish(false);
	}

	function TestProp() {
		return (
		  <div>
			{ 
			  allQuestions.map((question, index) => {
				if (index == count)
				return  <div key={question.id}>
				  <p className={styles.Question}>{index + 1}. {question.question}</p>
				  {
					question.image &&
					<img src={question.image} alt="photo" />
				  }
				  <form>
				  <p><input type="radio" name={question.id} title={question.answer} id="optiona"  checked={choice[question.id] == "a"} onChange={handleChange} value="a" className={styles.SelectRadio}/> <label htmlFor="optiona"  className={styles.RadioLabel}>a. {question.option.a}</label></p>
				  <p><input type="radio" name={question.id} title={question.answer} id="optionb"  checked={choice[question.id] == "b"} onChange={handleChange} value="b" className={styles.SelectRadio}/> <label htmlFor="optionb"  className={styles.RadioLabel}>b. {question.option.b}</label></p>
				  <p><input type="radio" name={question.id} title={question.answer} id="optionc"  checked={choice[question.id] == "c"} onChange={handleChange} value="c" className={styles.SelectRadio}/> <label htmlFor="optionc"  className={styles.RadioLabel}>c. {question.option.c}</label></p>
				  <p><input type="radio" name={question.id} title={question.answer} id="optiond"  checked={choice[question.id] == "d"} onChange={handleChange} value="d" className={styles.SelectRadio}/> <label htmlFor="optiond"  className={styles.RadioLabel}>d. {question.option.d}</label></p>
				  </form>
				  </div>			   
	  })}	  
	  </div>
		)
	  }
	
	return <div className={styles.TestMain}>
		{
			start &&
			<form onSubmit={handleTest} className={styles.TestForm}>
				<label htmlFor="subjects">Select a Subject</label>
				<select name="subjects" id="subjects" onChange={((e)=> setSubject(e.target.value))} required>
					<option value="">-- Subjects --</option>
					<option value="english">English</option>
					<option value="physics">Physics</option>
					<option value="chemistry">Chemistry</option>
					<option value="biology">Biology</option>
					<option value="mathematics">Mathematics</option>
					<option value="commerce">Commerce</option>
					<option value="accounting">Accounting</option>
					<option value="englishlit">Literature in English</option>
					<option value="government">Government</option>
					<option value="crk">Christian Religious Knowledge</option>
					<option value="geography">Geography</option>
					<option value="economics">Economics</option>
					<option value="irk">IRK</option>
					<option value="civiledu">Civic Education</option>
					<option value="insurance">Insurance</option>
					<option value="currentaffairs">Current Affairs</option>
					<option value="history">Histoty</option>
				</select>
				<button type="submit">Start</button>

				<p>{response}</p>
			</form>
			
		}
		{
			isLoading && 
			<h2 className={styles.Loading}>{isLoading}</h2>
		}
		{
			allQuestions &&
			
			<div className={styles.TestMainContainer}>	
			<section className={styles.TestSide}>
			<div>
			<section className={styles.Subject}> <h1>{subject}</h1><h1><Timer duration={30 * 60 * 1000}/></h1></section>
			<TestProp
				allQuestions={allQuestions}
			/>
			<div className={styles.ButtonContainer}>
			<button onClick={getPreviousQuestion} className={styles.SubmissionFormButton}><span>&laquo; </span>Previous</button>
			{ count <= 38 ? (<button onClick={getNextQuestion} className={styles.SubmissionFormButton}>Next<span> &raquo;</span></button>) : (<button onClick={getNextQuestion} className={styles.SubmissionFormButton}>Submit<span></span></button>)}
			</div>
			</div>
			</section>
			<section className={styles.NumbersButton}>
				<div className={styles.NumbersSide}>
			{
				numbers.map((num)=>{
					return <span><input type="radio" name="number" id={`number${num}`} onChange={((e) => setCount(num-1))} className={styles.Numbers} /> <label htmlFor={`number${num}`} className={styles.NumberButton}>{num}</label></span>
            	})
			}	</div>
			<button onClick={handleSubmit} className={styles.SubmitTest}>Finish Test</button>
			</section>
			</div>
			
		}
		{
			publish &&
			<h3 className={styles.FinalScore}>Total Score: {finalScore}/40
			<form onSubmit={ResetTest} className={styles.ResetForm}><button type="submit" className={styles.ResetButton}>Try Again</button></form>
			</h3>
		}
		
	</div>;
};

export default Test;



import '../App.css'
import mood from './mood.png'
import icecream from './icecream.png'
import seasons from './seasons.png'

import { useEffect, useState } from "react";
var random = Math.floor(Math.random() * 100);

const Quiz = () => {
    const [results, setResults] = useState("");
    const questions = [
		{
			questionText: 'How are you today?',
			answerOptions: [
				{ answerText: 'Happy', answer: 5 },
				{ answerText: 'Neutral', answer: 3 },
				{ answerText: 'Sad', answer: 1 },
			],
		},
		{
			questionText: 'What is your favorite ice cream flavor?',
			answerOptions: [
				{ answerText: 'Chocolate', answer: 5 },
				{ answerText: 'Vanilla', answer: 1 },
				{ answerText: 'Strawberry', answer: 3 },
			],
		},
		{
			questionText: 'What is your favorite season?',
			answerOptions: [
				{ answerText: 'Spring', answer: 5 },
				{ answerText: 'Summer', answer: 5 },
				{ answerText: 'Winter', answer: 1 },
				{ answerText: 'Fall', answer: 3 },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [img, setImg] = useState(0);
    
    useEffect(() => { //stops listenings when settting user
        setImg(mood);
      }, [])

    //for when user is sad, score is less than 6
    const fetchname = async () => {
            const response = await fetch(
              `http://localhost:4200/quiz/happy/${random}`
            );
            const json = await response.json();
            if (response.ok) {
              setResults(json[0]);
              console.log(score)
            }
      
    };
    //for when user is neutral, score is less than 9, more than 5
    const fetchname1 = async () => {
        const response = await fetch(
          `http://localhost:4200/quiz/family/${random}`
        );
        const json = await response.json();
        if (response.ok) {
          setResults(json[0]);
          console.log(json[0].title)
        }
  
    };
    //for when user is sad, score is less than 6
    const fetchname2 = async () => {
        const response = await fetch(
          `http://localhost:4200/quiz/drama/${random}`
        );
        const json = await response.json();
        if (response.ok) {
          setResults(json[0]);
          //console.log(json[0].title)
        }
  
    };
    //to show resulting recommendation according to score based off of user mood
    if (showScore) {
        if (score < 6) {
            fetchname();
        }
        else if (score >5 && score < 10) {
            fetchname1();
        }
        else if (score > 9) {
            fetchname2();
        }
    }

	const handleAnswerOptionClick = (answer) => {
        //happy would give that the recommendation is drama, neutral is family, sad is comedy
		setScore(score + answer );

        //for moving to next questions
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}

        //for changing image for each question
        if (currentQuestion == 0) {
			setImg(icecream);
		}
        else if (currentQuestion == 1) {
			setImg(seasons);
		}
        else if (currentQuestion == 2) {
			setImg(mood);
		}
        
	};

    

  return (
    <div>
      <h1>Quiz</h1>
      <div className='app'>
			{showScore ? (
				<div className='app'>
                    <ul className="box" key={results.movieID}>
                    <li>
                        <p>You recommendation: </p>
                        <h2>{results.title}</h2>
                        <p>Release Year: {results.releaseYear}<br></br></p>
                        <p>Length: {results.runningTime} minutes<br></br></p>
                        <p>Genre: {results.genreName}</p>
                    </li>
                    </ul>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.answer)}>{answerOption.answerText}</button>
						))}
					</div>
                    <div>
                        <img src={img}/>
                    </div>
				</>
			)}
		</div>
        {
        
        }
        
    </div>
  );
};

export default Quiz;

'use client'
import { useEffect, useState, useRef } from 'react';
import '@styles/global.css'
import '@styles/quiz.css'
import QuestionCard from '@components/QuestionCard';

const PraticePage = ({ params }) => {
    const [quiz, setQuiz] = useState({})
    const firstUpdate = useRef(true);
    const quizFetch = useRef(false);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [answers, setAnswers] = useState({});
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(null);
    const [totalScore, setTotalScore] = useState(null);
    console.log(params.id)
    const quizId = parseInt(params.id);

    useEffect(() => {
        const retriveData = async () => {
            try {
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON file');
                }
                let data = await response.json();
                console.log(data)
                data = data.filter(quiz => quiz.id === quizId)
                console.log(data)
                console.log(data[0].sections)
                let totalQuestions = 0;
                data[0].sections.forEach((section) => {
                    totalQuestions += section.questions.length;
                });

                let initialAnswers;
                const savedAnswers = localStorage.getItem('answers');
                if (savedAnswers) {
                    initialAnswers = JSON.parse(savedAnswers);
                }
                else {
                    /**
                        * Initializes `initialAnswers` to store user's answers.
                        * 
                        * 1. `reduce` is used on `data[0].Sections` to create an object from the array.
                        * 2. In each iteration, the callback returns a new object that merges the accumulator object (`acc`) and a new property, where key is the section index (`[i]`), and value is another object.
                        * 3. The value object is created by reducing the `questions` array of the current section. It returns an object with an empty string for each unanswered question. 
                        * 4. `acc, _, j` in the inner `reduce` represents the accumulator (object being built), the current question (ignored - `_`), and the question index (`j`).
                        * 5. `initialAnswers` structure is { sectionIndex: { questionIndex: answer }, ...}, where answer is an empty string for an unanswered question.
                    */
                    initialAnswers = data[0].sections.reduce(
                        (acc, section, i) => ({
                            ...acc,
                            [i]: section.questions.reduce(
                                (acc, _, j) => ({ ...acc, [j]: '' }),
                                {}
                            ),
                        }),
                        {}
                    );
                }


                console.log(initialAnswers)
                setQuiz(data[0]);
                setTotalScore(totalQuestions)
                setAnswers(initialAnswers);
                quizFetch.current = true;
            } catch (error) {
                console.error('Error fetching quiz data: ', error);
            }
        }
        retriveData();

    }, [quizId])
    const handleOptionChange = (answer, sectionIndex, questionIndex) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [sectionIndex]: {
                ...prevAnswers[sectionIndex],
                [questionIndex]: answer
            }
        }));
    };

    const toggleRadio = (event, sectionIndex, questionIndex) => {
        const clickedElement = event.target;
        const radioButton = clickedElement.querySelector('input[type="radio"]');
        if (radioButton) {
            // Select the radio button
            radioButton.checked = true;
            const answer = radioButton.value
            handleOptionChange(answer, sectionIndex, questionIndex)
        }

    }

    const handleSubmit = e => {
        e.preventDefault();
        let totalScore = 0;
        quiz.sections.forEach((section, i) => {
            section.questions.forEach((question, j) => {
                console.log(answers[i][j])
                if (answers[i][j].toLowerCase() === question.correct.toLowerCase()) {
                    totalScore++;
                }
            });
        });

        setScore(totalScore);
        setShowScore(true);
        setHasSubmitted(true)
    };
    const renderWithLineBreaks = (text) => {
        const paragraphs = text.split('\n\n'); // Split the text into paragraphs

        return paragraphs.map((paragraph, index) => (
            <p className="context" key={index}>
                {paragraph}
            </p>
        ));
    };
    useEffect(() => {
        // Skip on first render
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        // Save to local storage whenever answers change
        localStorage.setItem('answers', JSON.stringify(answers));
    }, [answers]);
    return (
        <main id="web_page">
            <form onSubmit={handleSubmit} className="quiz_box">
                {quizFetch.current && quiz.sections.map((section, index) => (
                    <div className='section_box' key={index}>
                        <h2 className="section_title">
                            Section {index + 1}
                        </h2>
                        <div className="context_box">
                            {renderWithLineBreaks(section.context)}
                        </div>
                        {
                            section.questions.map((question, qIndex) => (
                                <QuestionCard key={qIndex} question={question} qIndex={qIndex} index={index} toggleRadio={toggleRadio} answer={answers[index][qIndex]} hasSubmitted={hasSubmitted} />
                            ))
                        }
                    </div>
                ))}
                <div className="submit_btn_box">
                    <button type="submit" className="submit_btn">Submit</button>
                </div>
            </form>
            {showScore && <h1>Your Score: {score}/{totalScore}</h1>}
        </main>
    )
}

export default PraticePage

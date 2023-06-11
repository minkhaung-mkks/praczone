'use client'
import React,{useEffect,useState} from 'react';
import '@styles/global.css'
import '@styles/quiz.css'

const PraticePage = () => {
    const [quiz, setQuiz] = useState([])
    const firstUpdate = useRef(true);
    const [answers, setAnswers] = useState({});
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(null);
    const [totalScore, setTotalScore] = useState(null);
    
    const quizId = parseInt(params.id);

    useEffect(()=>{
        const retriveData = async ()=>{
            try {
                const response = await fetch('../../dummydata/dummyData.json');
                const data = await response.json();

                data = data.filter(quiz=> quiz.id === quizId)
                let totalQuestions = 0;
                data.sections.forEach((section) => {
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
                    * 1. `reduce` is used on `data.Sections` to create an object from the array.
                    * 2. In each iteration, the callback returns a new object that merges the accumulator object (`acc`) and a new property, where key is the section index (`[i]`), and value is another object.
                    * 3. The value object is created by reducing the `questions` array of the current section. It returns an object with an empty string for each unanswered question. 
                    * 4. `acc, _, j` in the inner `reduce` represents the accumulator (object being built), the current question (ignored - `_`), and the question index (`j`).
                    * 5. `initialAnswers` structure is { sectionIndex: { questionIndex: answer }, ...}, where answer is an empty string for an unanswered question.
                */
                initialAnswers = data.Sections.reduce(
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
            setQuiz(data);
            setTotalScore(totalQuestions)
            setAnswers(initialAnswers);
            } catch (error) {
                console.error('Error fetching quiz data: ', error);
            }
        }
        retriveData();
    
    },[])
    const handleOptionChange = (answer, sectionIndex, questionIndex) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [sectionIndex]: {
                ...prevAnswers[sectionIndex],
                [questionIndex]: answer
            }
        }));
    };

    const toggleRadio = (sectionIndex,questionIndex)=>{
        const radioButton = clickedElement.querySelector('input[type="radio"]');

        if (radioButton) {
            // Select the radio button
            radioButton.checked = true;
            const answer = radioButton.value
            handleOptionChange(answer,sectionIndex,questionIndex)
        }
    
    }

    const handleSubmit = e => {
        e.preventDefault();
        let totalScore = 0;

        sections.forEach((section, i) => {
            section.questions.forEach((question, j) => {
                if (answers[i][j] === question.correct) {
                    totalScore++;
                }
            });
        });

        setScore(totalScore);
        setShowScore(true);
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
        <div class="quiz_info_box">

        </div>
        <form onSubmit={handleSubmit} class="quiz_box">
            {quiz.sections.map((section, index) => {
                <>
                <h2 class="section_title">
                    Section {index+1}
                </h2>
                <div class="context_box">
                    <p class="contenxt">
                        {section.context}
                    </p>
                </div>
                {
                    section.quiz.map((question, qIndex)=>{
                        <div class="question_card">
                            <h3 class="question">
                                {question.text}
                            </h3>
                            <div class="answers_box">
                                <div onClick={toggleRadio(index,qIndex)} className="radioContainer">
                                    <input class="answers" type="radio" value="a" name={question.text} id="A"/>
                                    <label for="A">{quiz.answers.a}</label>
                                </div>
                                <div onClick={toggleRadio(index,qIndex)} className="radioContainer">
                                    <input class="answers" type="radio" value="b" name={question.text} id="B"/>
                                    <label for="B">{quiz.answers.b}</label>
                                </div>
                                <div onClick={toggleRadio(index,qIndex)} className="radioContainer">
                                    <input class="answers" type="radio" value="c" name={question.text} id="C"/>
                                    <label for="C">{quiz.answers.c}</label>
                                </div>
                                <div onClick={toggleRadio(index,qIndex)} className="radioContainer">
                                    <input class="answers" type="radio" value="d" name={question.text} id="D"/>
                                    <label for="D">{quiz.answers.d}</label>
                                </div>
                            </div>
                        </div>
                    })
                }
                </>
            })}
        </form>
        <div class="submit_btn_box">
            <button type="submit" class="submit_btn">Submit</button>
        </div>
        {showScore && <h1>Your Score: {score}/{totalScore}</h1>}
        <div class="timer_box">

        </div>
        </main>
    )
}

export default PraticePage

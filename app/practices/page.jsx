'use client'
import React,{useEffect,useState} from 'react'
import Image from 'next/image'

const PracticeListPage = () => {
    const [selecetdExam, setSelecetdExam]=useState("GED")
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [selectedTopics, setSelectedTopics] = useState([]); 
    const [selectedSubTopics, setSelectedSubTopics] = useState([]); 

    const selectTopics = (topic)=>{
        setSelectedTopics((prev)=>[...prev,sub_topic])
    }

    const selectSubTopics = (sub_topic) =>{
        // When provided a function on setState, react calls the function with the current State
        // so setSelectedSubTopic(prev => prev + topic) = setSelectedSubTopic((prev)=> prev + topic)
        setSelectedSubTopics((prev)=>[...prev,sub_topic])
    }

    const retriveData = ()=>{
        // Get Quizzes
            // Fliter Quiz based on Subject
                // Fliter out by Selected Topics
    }

    useEffect(()=>{
        retriveData();
    },[selectedSubject,selectedTopics,selectedSubTopics])
    return (
        <main id="web_page">
        <h2 class="headings">Exam</h2>
        <div class="heading_line"></div>
        <div class="selector_btns_box">
            <button data-exam="GED" data class="selected_selector_btn selector_btn">
                GED
            </button>
        </div>
        <h2 class="headings">Subject</h2>
        <div class="heading_line"></div>
        <div id="GED" class="selector_btns_box">
            <button data class="selected_selector_btn selector_btn">
                All
            </button>
            <button data class="selector_btn">
                Social Studies
            </button>
            <button data class="selector_btn">
                Reasoning through Art
            </button>
            <button data class="selector_btn">
                Math
            </button>
            <button data class="selector_btn">
                Sciences
            </button>
        </div>
        <h2 class="headings">Topic</h2>
        <div class="heading_line"></div>
        ${selectedSubject === 'Social Studies' && (
            <div id="GEDSocialStudies" class="selector_btns_box">
                <button data class="selected_selector_btn selector_btn">
                    All
                </button>
                <button data class="selector_btn">
                    Mixed
                </button>
                <button data class="selector_btn">
                    Types of Government
                </button>
                <button data class="selector_btn">
                    American Principal and Consitution
                </button>
                <button data class="selector_btn">
                    American Goverment Strucutre
                </button>
                <button data class="selector_btn">
                    American History
                </button>
            </div>
        )}
        ${selectedSubject === 'Sciences' && (
            <div id="GEDSciences" class="selector_btns_box">
            <button data class="selected_selector_btn selector_btn">
                All
            </button>
            <button data class="selector_btn">
                Mixed
            </button>
            <button data class="selector_btn">
                Chemistry
            </button>
            <button data class="selector_btn">
                Physics
            </button>
            <button data class="selector_btn">
                Biology
            </button>
            <button data class="selector_btn">
                Earth and Space
            </button>
        </div>
        )}
        ${selectedSubject === 'RLA' && (
             <div id="GEDRLA" class="selector_btns_box">
                <button data class="selected_selector_btn selector_btn">
                    All
                </button>
                <button data class="selector_btn">
                    Mixed
                </button>
                <button data class="selector_btn">
                    Fictional Reading Comprehension
                </button>
                <button data class="selector_btn">
                    Non-Fictional Reading Comprehension
                </button>
                <button data class="selector_btn">
                    Grammar
                </button>
            </div>
        )}
        ${selectedSubject === 'Math' && (
            <div id="GEDMath" class="selector_btns_box">
                <button data class="selected_selector_btn selector_btn">
                    All
                </button>
                <button data class="selector_btn">
                    Mixed
                </button>
                <button data class="selector_btn">
                    Percent & Rate
                </button>
                <button data class="selector_btn">
                    Polynomial Expressions
                </button>
                <button data class="selector_btn">
                    Quadratic Equations
                </button>
                <button data class="selector_btn">
                    Graphs and Functions
                </button>
            </div>
        )}
        
        ${selectedSubject === 'Sciences' && (
            <>
                <h2 class="headings">Sub-Topic</h2>
                <div class="heading_line"></div>
                ${selectedTopics.includes('Chemistry') && (
                    <div id="GEDScience_chemistry" class="selector_btns_box">
                        <button data class="selected_selector_btn selector_btn">
                            All
                        </button>
                        <button data class="selector_btn">
                            Mixed
                        </button>
                    </div>
                    )
                }
                ${selectedTopics.includes('Biology') && (
                    <div id="GEDScience_biology" class="selector_btns_box">
                        <button data class="selected_selector_btn selector_btn">
                            All
                        </button>
                        <button data class="selector_btn">
                            Mixed
                        </button>
                    </div>
                    )
                }
                ${selectedTopics.includes('Physics') && (
                    <div id="GEDScience_physics" class="selector_btns_box">
                        <button data class="selected_selector_btn selector_btn">
                            All
                        </button>
                        <button data class="selector_btn">
                            Mixed
                        </button>
                    </div>
                    )
                }
                ${selectedTopics.includes('EarthAndScience') && (
                    <div id="GEDScience_EarthAndSpace" class="selector_btns_box">
                        <button data class="selected_selector_btn selector_btn">
                            All
                        </button>
                        <button data class="selector_btn">
                            Mixed
                        </button>
                    </div>
                    )
                }
            </>
        )}
        
        
       
        <div class="quiz_select_box">
            <div class="quiz_card">
                
                <div class="creator_info_box">
                    <Image src="../public/assets/preplearn-website-favicon-color.png" alt="" class="creator_img"/>
                    
                    <a href="" class="creator_name">Prep & Learn</a>
                    <h5 class="creator_type"></h5>
                    <h4 class="quiz_type"> Generated Quiz</h4>
                </div>
                
                <div class="quiz_info_box">
                    
                    <div class="quiz_title_box">
                       
                        <h2 class="quiz_title">Practice Test # 1</h2>
                       
                        <h3 class="quiz_subject">Subject : Social Studies</h3>
                        
                        <h3 class="quiz_topic"> Topic : Types of Government</h3>
                    </div>
                    
                </div>
                <div class="quiz_info_box">
                    
                    <div class="quiz_title_box">
                        
                        <h3 class="quiz_title">Difficulty : Easy</h3>
                       
                        <h3 class="quiz_subject">Questions : 40 questions</h3>
                        
                        <h3 class="quiz_topic"> Ideal Time : 10 Mins</h3>
                    </div>
                    
                </div>
                <div class="take_quiz_btn_box">
                    
                    <button class="take_quiz_btn">
                        Start
                    </button>
                </div>
            </div>
        </div>
    </main>
    )
}

export default PracticeListPage

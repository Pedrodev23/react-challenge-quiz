import React, { useState, useEffect } from 'react'
import './App.css'
import styled from 'styled-components'

import ProgressBar from './components/ProgressBar'
import Title from './components/Title'
import Question from './components/Question'
import ScoreBar from './components/ScoreBar'

const Container = styled.div`
  border: 5px solid #eeeeee;  
  height: 600px;
  margin: 50px auto;
  min-width: 500px;
  width: 40%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 40px; 60px;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const Finish = styled.div`

`

function App () {
  const [ questions, setQuestions ]             = useState([])
  const [ currentQuestion, setCurrentQuestion ] = useState({})
  const [ currentNumber, setCurrentNumber ]     = useState(0)
  const [ score, setScore ]                     = useState(0)
  const [ finieshed, setFinished ]              = useState(false)

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    if( questions.length ) {
      setCurrentQuestion(questions[currentNumber])
    }
  }, [
    questions, 
    currentNumber,
  ])

  function initialState() {
    setQuestions([])
    setCurrentQuestion({})
    setCurrentNumber(0)
    setScore(0)
    setFinished(false)
  }

  function handleStart() {
    // Initialize the states
    initialState()
    
    loadQuestions()
  }

  function loadQuestions() {
    // Load the Questions Data from Server
    fetch('/questions.json')
      .then(function( res ) {
        return res.json()
      }).then(function(questions) {
        let loadedQuestions = questions
        
        setQuestions( loadedQuestions )

      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  function handleNextQuestion() {
    let nextNumber = currentNumber + 1
    if( nextNumber < questionCount ) {
      setCurrentNumber(nextNumber)
    } else {
      setFinished(true)
    }
  }

  function handleIncreaseScore() {
    setScore(( score + 1 ))
  }

  let { type, question, category, difficulty, correct_answer, incorrect_answers } = currentQuestion
  let questionCount = questions.length
  
  let titleProps = {
    questionNumber: currentNumber,
    questionCount,
    category,
    difficulty,
  }

  let questionProps = {
    type,
    question,
    correct_answer,
    incorrect_answers,
    nextQuestion:       handleNextQuestion,
    increaseScore:      handleIncreaseScore,
  }

  let progressBar = {
    questionNumber: currentNumber + 1,
    questionCount
  }

  return (
    <div className='App'>
      <Container>
        <ProgressBar {...progressBar} />
        { 
          finieshed ?
          <Finish>Finished!</Finish> :
          <Content>
            <Title {...titleProps} />
            <Question {...questionProps} />
            <ScoreBar 
              score={score}
              questionNumber={ currentNumber }
              questionCount={questionCount}
              />
          </Content>
        }
      </Container>
    </div>
  )
}

export default App

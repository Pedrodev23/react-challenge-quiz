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
  width: 500px;
`

const Content = styled.div`
  height: 100%;
  padding: 0 60px;
  text-align: left;
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

    handleStart()
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
    // Load the Questions Data from Server
    fetch('/questions.json')
      .then(function( res ) {
        return res.json()
      }).then(function(questions) {
        console.log('parsed json', questions)
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

  let { question, category, difficulty, correct_answer, incorrect_answers } = currentQuestion
  let questionCount = questions.length
  
  let titleProps = {
    questionNumber: currentNumber,
    questionCount,
    category,
    difficulty,
  }

  let questionProps = {
    question:           question,
    correct_answer:     correct_answer,
    incorrect_answers:  incorrect_answers, 
    nextQuestion:       handleNextQuestion,
    increaseScore:      handleIncreaseScore,
  }

  return (
    <div className='App'>
      <Container>
        <ProgressBar />
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

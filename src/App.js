import React, { useState, useEffect } from 'react'
import './App.css'
import styled from 'styled-components'

import ProgressBar from './components/ProgressBar'
import Title from './components/Title'
import Question from './components/Question'

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
  width: 100%;
`

function App () {
  
  const [ questions, setQuestions ]         = useState([])
  const [ currentQuestion, setCurrentQuestion ] = useState({})

  const [ currentNumber, setCurrentNumber ] = useState(0)
  const [ score, setScore ]                 = useState(0)
  
  
  useEffect(() => {

    fetch('/questions.json')
      .then(function( res ) {
        return res.json()
      }).then(function(questions) {
        console.log('parsed json', questions)
        let loadedQuestions = questions
        
        setQuestions( loadedQuestions )

        if ( !currentNumber ) {
          let firstQuestion = questions[currentNumber];

          setCurrentQuestion(firstQuestion)
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })

  }, [])

  let { question, category, difficulty } = currentQuestion
  let questionCount = questions.length
  
  return (
    <div className='App'>
      <Container>
        <ProgressBar />
        <Content>
          <Title score={score} questions={ questionCount } category={category} difficulty = {difficulty}/>
          <Question />
        </Content>
      </Container>
    </div>
  )
}

export default App

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
    let loadedQuestions = fetch('./questions.json')
    
    setQuestions( loadedQuestions )

    if ( !currentNumber ) {
      let firstQuestion = questions[currentQuestion];
      
      setCurrentQuestion(firstQuestion)
    }
  }, [])

  return (
    <div className='App'>
      <Container>
        <ProgressBar />
        <Content>
          <Title />
          <Question />
        </Content>
      </Container>
    </div>
  )
}

export default App

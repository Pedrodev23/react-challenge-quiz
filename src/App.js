import React, { useState, useEffect } from 'react'
import './App.css'
import styled, { css } from 'styled-components'

import ProgressBar from './components/ProgressBar'
import Title from './components/Title'

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
  
  const [ questions, setQuestions ]          = useState([])
  const [ currentNumber, setCurrentNumber ] = useState(0)
  const [ score, setScore ]                 = useState(0)
  
  useEffect(() => {
    var questions = fetch('./questions.json')
    setQuestions(questions)
  }, [])

  return (
    <div className='App'>
      <Container>
        <ProgressBar />
        <Content>
          <Title />
        </Content>
      </Container>
    </div>
  )
}

export default App

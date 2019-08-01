import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { uriDecodeHelper, shuffleArrayHelper, combineArrayHelper } from '../helpers'

const Content = styled.div`
        padding: 10px;
    `
const Answers = styled.div`
    padding: 10px;
`

const AnswerButton = styled.button((props) => (
    `${props.value == props.answer ?
        {
            color: '#FFFFFF',
            backgroundColor: '#000000'
        }
        :
        {
            color: '#FFFFFF',
            backgroundColor: '#000000'
        }
    }`
))

const Message = styled.h3((props) => (
    `
     color: ${ props.isCorrect ? '#EEEEEE' : '#000000' };
    `
))

const NextButton = styled.button`

`

export default function({ 
    question, 
    correct_answer, 
    incorrect_answers,
    nextQuestion,
    increaseScore,
}) {
    const [ correctAnswer, setCorrectAnswer ] = useState()
    const [ mixedAnswers, setMixedAnswers ] = useState([])
    const [ answer, setAnswer ] = useState()

    useEffect(() => {
        if( !correct_answer || !incorrect_answers ) return

        setCorrectAnswer( correct_answer )

        let mixedArray = shuffleArrayHelper(
            combineArrayHelper( incorrect_answers, correct_answer )
        )

        setMixedAnswers( mixedArray )
    }, [correct_answer, incorrect_answers])

    function handleAnswer( chooseAnswer ) {
        if( answer ) return

        setAnswer( chooseAnswer )

        if ( correctAnswer == answer ) {
            increaseScore()
        }
    }

    function handleNext() {
        nextQuestion()
        setAnswer(null)
    }

    function displayResult() {
        let isCorrect = correctAnswer == answer
        return (
            answer && 
            <div>
                <Message 
                    isCorrect={isCorrect} >
                    {
                        isCorrect ? "Correct" : "Sorry"
                    }
                </Message>
                <NextButton onClick={handleNext}>
                    Next Question
                </NextButton>
            </div>
        )
    }

    return (
        <div>
            <Content>
                { uriDecodeHelper( question ) }
            </Content>
            <Answers>
                { 
                    mixedAnswers.map((val, key) => (
                        <AnswerButton
                            key={key}
                            answer={answer} 
                            onClick={() => { handleAnswer(val) }}>
                        { uriDecodeHelper( val ) }
                        </AnswerButton>
                    ))
                }
            </Answers>
            {
                displayResult()
            }
        </div>
    )
} 
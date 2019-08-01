import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { uriDecodeHelper, shuffleArrayHelper, combineArrayHelper } from '../helpers'

const Content = styled.div`
        padding: 10px;
    `
const Answers = styled.div`
    padding: 10px;
`

const Answer = styled.button((props) => (
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

export default function({ 
    question, 
    correct_answer, 
    incorerect_answers,
}) {
    const [ correctAnswer, setCorrectAnswer ] = useState()
    const [ mixedAnswers, setMixedAnswers ] = useState([])
    const [ answer, setAnswer ] = useState(null)

    useEffect(() => {
        if( !correctAnswer || !incorerect_answers ) return

        setCorrectAnswer( correct_answer )

        let mixedArray = shuffleArrayHelper(
            combineArrayHelper( incorerect_answers, correct_answer )
        )

        setMixedAnswers( mixedArray )
    }, [
        correct_answer, 
        incorerect_answers
    ])

    const handleAnswer = (answer) => {
        setAnswer( answer )
        if ( correctAnswer == answer ) {

        }
    }

    return (
        <div>
            <Content>
                { uriDecodeHelper( question ) }
            </Content>
            <Answers >
                { 
                    mixedAnswers.map((key, value) => (
                        <Answer 
                            key={key}
                            answer={answer} 
                            onClick={handleAnswer(value)}/>
                    ))
                }
            </Answers>
        </div>
    )
} 
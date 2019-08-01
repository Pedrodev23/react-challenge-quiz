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

export default function({ 
    question, 
    correct_answer, 
    incorrect_answers,
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
        
        setAnswer( chooseAnswer )

        if ( correctAnswer == chooseAnswer ) {
            
        }
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
        </div>
    )
} 
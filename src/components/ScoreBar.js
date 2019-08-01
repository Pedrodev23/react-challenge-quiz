import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { calcPercentHelper } from '../helpers'

const Status = styled.div((props) => (`
    color: #494949;
    font-size: 14px;
    float: ${ props.float && 'left' };
`))

const ScoreBar = styled.div`
    height: 28px;
    border: 2px solid #06428c;
    border-radius: 4px;
`

const ScoreBarCorrect = styled.div`

`

const ScoreBarFinished = styled.div`

`

const ScoreBarExpect = styled.div`

`

function Score ({
    score,
    questionCount,
    questionNumber,
}) {

    const [correctBarVal, setCorrectBarVal] = useState(0)
    const [finishedBarVal, setFinishedBarVal] = useState(0)
    const [expect, setExpect] = useState(0)
    const [expectBarVal, setExpectBarVal] = useState(0)

    useEffect(() => {
        if( typeof score !== "undefined" ) {
            setCorrectBarVal( calcPercentHelper( score, questionCount ) )
            setFinishedBarVal( calcPercentHelper(( questionNumber - score ), questionCount ))
            setExpect( calcPercentHelper(( questionCount - questionNumber + score ), questionCount ))
            setExpectBarVal( calcPercentHelper(( questionCount - questionNumber), questionCount ))
        }
    }, [
        score,
        questionCount,
        questionNumber,
    ])    

    return (
        <div>
            <div>
                <Status key={0} float='left'>{ correctBarVal }</Status>
                <Status key={1} float='right'>{ expect }</Status>
            </div>
            <ScoreBar>
                <ScoreBarCorrect width={correctBarVal} />
                <ScoreBarFinished width={finishedBarVal} />
                <ScoreBarExpect width={expectBarVal} />
            </ScoreBar>
        </div>
    )
}

export default Score
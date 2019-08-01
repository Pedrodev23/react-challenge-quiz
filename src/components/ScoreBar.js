import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { calcPercentHelper } from '../helpers'

const Status = styled.span((props) => (`
    color: #494949;
    font-size: 14px;
    fload: ${ props.float };
`))

const ScoreBar = styled.div`

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
        setCorrectBarVal( calcPercentHelper( score, questionCount ) )
        setFinishedBarVal( calcPercentHelper(( questionNumber - score ), questionCount ))
        setExpect( calcPercentHelper(( questionCount - questionNumber + score ), questionCount ))
        setExpectBarVal( calcPercentHelper(( questionCount - questionNumber), questionCount ))
    }, [
        score,
        questionCount,
        questionNumber,
    ])    

    return (
        <div>
            <div>
                <Status>{ correctBarVal }</Status>
                <Status>{ expect }</Status>
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
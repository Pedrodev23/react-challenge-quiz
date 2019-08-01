import React from 'react'
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

    let correctBarVal       = calcPercentHelper( score, questionCount )
        , finishedBarVal    = calcPercentHelper(( questionNumber - score ), questionCount )
        , expect            = calcPercentHelper(( questionCount - questionNumber + score ), questionCount )
        , expectBarVal      = calcPercentHelper(( questionCount - questionNumber), questionCount )

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
import React from 'react'
import styled from 'styled-components'

const ProgressBar = styled.div`
    width: 100%;
    height: 15px;
    background: #fbfbfb;
`
const ProgressBarSlide = styled.div(props => ({
    display: 'block',
    background: '#EEEEEE',
    height: '100%',
    width: props.score && props.questions ? `${ props.score / props.questions * 100 }%` : 0 
}));

export default function(props) {
    return (
        <ProgressBar>
            <ProgressBarSlide score={props.score} questions={props.questions} />
        </ProgressBar>
    )
}

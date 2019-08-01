import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import { MAX_LEVEL, LEVELS } from '../constants'

const Title = styled.h1`
    color: #494949
`
const Subtitle = styled.h2`
    color: #494949
` 
const Rating = styled.span((props) => ({
    color: `${ props.isValid ? '#000000' : '#EEEEEE' }`
}));

const star = <FontAwesomeIcon icon={faStar} />

const createRatingBar = (difficulty) => {
    let ratings = []
    // Outer loop to create parent
    for (let i = 0; i < MAX_LEVEL; i++) {
        //Create the parent and add the children
        let index = LEVELS.indexOf( difficulty );
        if ( i <= index ) {
            ratings.push( <Rating isValid={true}>star</Rating> )
        } else {
            ratings.push( <Rating isValid={false}>star</Rating> )
        } 
    }
    return ratings
}



const TitleBar = (props) => (
    <div>
        <Title>
            Question { props.score } of { props.questions } 
        </Title>
        <Subtitle>
        { props.category }
        </Subtitle>
        <div>
        {
            createRatingBar("easy")
        }
        </div>
    </div>
)
export default TitleBar
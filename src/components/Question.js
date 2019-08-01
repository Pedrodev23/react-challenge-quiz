import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
        padding: 10px;
    `

export default function(props) {
    const { question } = props
    return (
        <div>
            <Content>
                { question }
            </Content>
        </div>
    )
} 
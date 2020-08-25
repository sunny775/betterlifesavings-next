import React from 'react'
import SideBar from '../../sidebar'
import Main from './main'
import styled from 'styled-components'
import { fadeIn } from "../../animations";

const Section = styled.section`
overflow: hidden;
background-color: ${({ theme }) => theme.bg.primary};
box-sizing:border-box;
padding: 17px 1vw;
margin:0;
margin-top: 100px;
animation: ${fadeIn} 1s ease-out;
`

export const Home = () => (
    <Section className='row'>
        <Main />
        <SideBar />
    </Section>
)
export default Home

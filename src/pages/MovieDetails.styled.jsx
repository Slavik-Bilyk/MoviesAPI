import { Link } from 'react-router-dom';
const {styled } = require("styled-components");

export const MovieTitle = styled.h2`
`

export const Container = styled.div `
    margin-top: 15px;
    margin-left: 15px;
`

export const Button = styled.button`
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px;
    transition: transform 500ms ease;

    &:hover {
        background-color: #8f3f3f;
        transform: scale(1.05);
    }
`

export const AboutMovie = styled.div`
    display: flex;
    margin-top: 15px;
`

export const MovieInfo = styled.div`
    margin-left: 15px;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    margin-right: 30px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 4px;

    &:hover {
        background-color: #337d96;
    }
`
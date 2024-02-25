import { NavLink } from 'react-router-dom';

const { default: styled } = require("styled-components");

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    margin-right: 30px;
    border: 1px solid black;
    border-radius: 4px;
    
    &:hover {
        background-color: #337d96;
    }

`
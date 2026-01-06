import { styled } from "@mui/material/styles";

export const FullBarPercentageStyled = styled('div')`
    background-color: #B7C9CC;
    border-radius: 5px;
    width: 100%;
    height: 20px;
`;

export const BarPercentageStyled = styled('div')`
    background-color: #66898F;
    border-radius: 5px;
    width: ${props => props.percentage}%;
    height: 20px;
`;
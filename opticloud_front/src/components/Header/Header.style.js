// src/components/NavBar/NavBar.style.js
import { styled } from "@mui/material/styles";
import { AppBar, Box, Typography, Button } from "@mui/material";

// Top navigation bar container
export const NavAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#FFFF", // white background
    position: "sticky",
    color: "#111718", // primary color text
    boxShadow: 'none', // Remove box shadow
    width: '100%',
}));

// Navigation tabs (desktop links)
export const NavButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2, 2, 2, 2),
    color: '#111718',
    display: "block",
    textTransform: "none",
}));

// Logo
export const LogoStyle = styled("img")` 
    width: 120px;
    height: 40px;
    display: block;
    margin-bottom: 10px;
    @media (max-width: 768px) {

    }
`;

export const LogoTypography = styled("h1")`
    font-size: 1.3em;
    letter-spacing: 0.2rem;
    color: #222831;
`;

export const LogoContainer = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const LineStyle = styled("div")`
    width: 100%;
    
    & svg {
        width: 100%;
        display: block;
        opacity: 0.5;
    }
    
    & line {
        stroke: #66898F;
        stroke-width: 2px;
    }
`;
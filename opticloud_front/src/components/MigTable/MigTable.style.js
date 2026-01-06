import { styled } from "@mui/material/styles";
import { AppBar, Box, Typography, Button, TableCell } from "@mui/material";

// Table header cell styling
export const TableHeaderCell = styled(TableCell)(({ theme }) => ({
    // backgroundColor: theme.palette.grey[200],
    color: '#66898F',
    fontWeight: 'bold',
}));

// Table container styling
export const MigTableContainer = styled("div")`
    background-color: #FFFFFF;
    display: flex;
    justify-content: flex-start;
    width:100%;
    `;


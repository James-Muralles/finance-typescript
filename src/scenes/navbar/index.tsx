import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Box,Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import PixIcon from '@mui/icons-material/Pix';

type Props = {
    
}

const Navbar = (props: Props) => {
    const { palette } = useTheme()
    const [selectedPage, setSelectedPage] = useState("dashboard")
  return (
    <FlexBetween mb="0.25rem" p=".5rem 0rem" color={palette.grey[300]}>

        {/* LEFT SIDE */}
        <FlexBetween gap=".75rem">
            <PixIcon sx={{fontSize: "23px"}}/>
            <Typography variant="h4" fontSize="16px">
                Finanseer
            </Typography>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="2rem">
            {/* @ts-ignore */}
            <Box sx={{"&:hover": { color: palette.primary[100]}}}>
                <Link 
                to="/"
                onClick={()=> setSelectedPage("dashboard")}
                style={{
                    color: selectedPage === "dashboard" ? "inherit": palette.grey[700],
                    textDecoration: "inherit"
                }}
                >
                dashboard</Link>
            </Box>
            {/* @ts-ignore */}
            <Box sx={{"&:hover": { color: palette.primary[100]}}}>
                <Link 
                to="//predictions"
                onClick={()=> setSelectedPage("predictions")}
                style={{
                    color: selectedPage === "predictions" ? "inherit": palette.grey[700],
                    textDecoration: "inherit"
                }}
                >
                predictions</Link>
            </Box>
        </FlexBetween>

    </FlexBetween>

  );
};

export default Navbar;
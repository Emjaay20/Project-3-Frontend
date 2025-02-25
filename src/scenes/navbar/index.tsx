import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* Left Side */}
      <FlexBetween gap="0.75rem">
        <MonitorHeartIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4">
          Dashboard
        </Typography>
      </FlexBetween>

      {/* Right Side */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
          >
            Dashboard
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/Predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
          >
            Predictions
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <a
            href="https://sepolia.etherscan.io/address/0xcbead4bb8a2ee09b9060101fe48812db0df1a079"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: selected === "blockchain" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
          >
            Blockchain
          </a>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;

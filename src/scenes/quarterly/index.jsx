import { Box } from "@mui/material";
import Header from "../../components/Header";
import QuarterlyLineChart from "../../components/QuarterlyLineChart";

//display quarterly chart with header
const Quarterly = () => {
    return (
        <Box m="20px">
            <Header title="Pricing History" subtitle="Quarterly"/>
            <Box height="75vh">
                <QuarterlyLineChart/>
            </Box>
        </Box>
    )
}

export default Quarterly;
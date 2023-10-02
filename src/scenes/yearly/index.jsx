import { Box } from "@mui/material";
import Header from "../../components/Header";
import YearlyLineChart from "../../components/YearlyLineChart";

//display yearly chart with header
const Yearly = () => {
    return (
        <Box m="20px">
            <Header title="Pricing History" subtitle="Yearly"/>
            <Box height="75vh">
                <YearlyLineChart/>
            </Box>
        </Box>
    )
}

export default Yearly;
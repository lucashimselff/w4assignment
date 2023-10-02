import { Box } from "@mui/material";
import Header from "../../components/Header";
import DailyLineChart from "../../components/DailyLineChart";

//display daily chart with header
const Daily = () => {
    return (
        <Box m="20px">
            <Header title="Pricing History" subtitle="Daily"/>
            <Box height="75vh">
                <DailyLineChart/>
            </Box>
        </Box>
    )
}

export default Daily;
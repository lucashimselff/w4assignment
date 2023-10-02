import React, { useState , useEffect} from "react";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { mockDataTeam } from "../../data/mockData";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//data stored type
const initialValues = {
    cryptocurrencyCode: "",
    dateOfTransaction: new Date(),
    amountInCryptocurrencyUnits: "",
    buysell: ""
};

// requirement for input data
const userSchema = yup.object().shape({
    cryptocurrencyCode: yup.string().required("Required"),
    dateOfTransaction: yup.string().required("Required"),
    amountInCryptocurrencyUnits: yup.string().required("Required"),
    buysell: yup.string().required("Required")
});

const Portfolio = () => {
    // store the data in browser's local storage
    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    }, []);

    const [transactions, setTransactions] = useState(mockDataTeam);

    const handleFormSubmit = (values, { resetForm }) => {
    const newTransaction = {
        id: transactions.length + 1,
        cryptocurrencyCode: values.cryptocurrencyCode,
        dateOfTransaction: values.dateOfTransaction,
        amountInCryptocurrencyUnits: values.amountInCryptocurrencyUnits,
        buysell: values.buysell
    };

    setTransactions([...transactions, newTransaction]);
    resetForm();
    localStorage.setItem("transactions", JSON.stringify([...transactions, newTransaction]));
    };    

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "cryptocurrencyCode", headerName: "Cryptocurrency Code", flex: 1 },
        { field: "dateOfTransaction", headerName: "Date Of Transaction", flex: 1 },
        { field: "amountInCryptocurrencyUnits", headerName: "Units", type: "number", headerAlign: "left", align: "left" },
        { field: "buysell", headerName: "Buy/Sell", flex: 1 }
    ];

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: handleFormSubmit
    });

    return (
    <Box m="20px">
        <Header title="Create a Transaction" />
        <form onSubmit={formik.handleSubmit}>
        {/* input boxes */}
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cryptocurrency Code"
                {...formik.getFieldProps("cryptocurrencyCode")}
                error={formik.touched.cryptocurrencyCode && formik.errors.cryptocurrencyCode}
                helperText={formik.touched.cryptocurrencyCode && formik.errors.cryptocurrencyCode}
                sx={{ gridColumn: "span 2" }}
            />
            {/* date picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    fullWidth
                    variant="filled"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="filled"
                            label="Date Of Transaction"
                            error={formik.touched.dateOfTransaction && formik.errors.dateOfTransaction}
                            helperText={formik.touched.dateOfTransaction && formik.errors.dateOfTransaction}
                            sx={{ gridColumn: "span 2" }}
                        />
                    )}
                    value={formik.values.dateOfTransaction} 
                    onChange={(date) => formik.setFieldValue("dateOfTransaction", date)} 
                    sx={{ gridColumn: "span 2" }}
                />
            </LocalizationProvider>
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount (in Cryptocurrency Units)"
                {...formik.getFieldProps("amountInCryptocurrencyUnits")}
                error={formik.touched.amountInCryptocurrencyUnits && formik.errors.amountInCryptocurrencyUnits}
                helperText={formik.touched.amountInCryptocurrencyUnits && formik.errors.amountInCryptocurrencyUnits}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField 
                fullWidth
                variant="filled"
                id="select" 
                label="Buy / Sell"
                name="buysell"
                {...formik.getFieldProps("buysell")}
                error={formik.touched.buysell && formik.errors.buysell}
                helperText={formik.touched.buysell && formik.errors.buysell}
                sx={{gridColumn: "span 2"}}
                select
            >
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
            </TextField>
        </Box >
        <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
            Create
            </Button>
        </Box>
        </form>
        {/* data grid */}
        <Header title="My Transactions" />
        <Box m="40px 0 0 0" height="75vh">
            <DataGrid rows={transactions} columns={columns} />
        </Box>
    </Box>
    );
};

export default Portfolio;

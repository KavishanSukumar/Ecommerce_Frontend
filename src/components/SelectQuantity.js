import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";



function SelectQuantity() {

    const [value, setValue] = React.useState(0)

    const handleValueChange = (e) => {
        setValue(e.target.value)

    }
    const AddQuanity = () => {
        global.singleProductQuantity = value



    }
    return (
        <div>
            <h1>Please Select the Quantity</h1>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "50ch", height: "10ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    label="Order Amount"
                    value={value}
                    variant="outlined"
                    onChange={(e) => { handleValueChange(e) }}

                />
            </Box>
            <button onClick={AddQuanity} className="m-1 py-2 px-4 w-auto bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Next
            </button>
        </div>
    );
}

export default SelectQuantity;

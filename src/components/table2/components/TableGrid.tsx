import { styled } from "@mui/material";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";

export const TableGrid = styled(MuiDataGrid)({
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#202142',
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            color: '#fff'
        },
    },
});
import { Box } from "@mui/material"
import { TableGrid } from "./components/TableGrid"
import { GridToolbar, DataGridProps } from "@mui/x-data-grid"
import { useTableContext } from "context/TableContext"
import { FC } from "react"
import { TableSkeleton } from "./components/TableSkeleton"

export const Table: FC<DataGridProps & { loading: boolean }> = ({ loading, columns, rows, ...dataGridProps }) => {

    const { tableState } = useTableContext();

    if (loading) {
        <TableSkeleton />
    }
    return (
        <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f7f2f2', width: '100%' }}>
            <div style={{ height: 400, width: '70%' }}>

                <TableGrid
                    {...dataGridProps}
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={tableState}
                    pageSizeOptions={[5]}
                    slots={{ toolbar: GridToolbar }}
                />
            </div>
        </Box>
    )
}
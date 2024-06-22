import React, { FC, useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Button, Container, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { ReusableDrawer } from "components/drawer/ReusableDrawer";
import AddTask from "./AddTask"

const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#202142',
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      color: '#fff'
    },
  },
});
const TablePage: FC = () => {
  const { tasks, fetchTasks } = useTaskContext();
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open)
  }

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'createdAt', headerName: 'Created At', width: 107 },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'completionTime', headerName: 'Complition time', width: 100 },

    {
      field: 'details',
      headerName: 'Details',
      width: 150,
      renderCell: (params) => (
        <Link to={`/task/${params.row._id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">DETAILS</Button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/task/${params.row._id}`);
  };

  return (
    <Container sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f7f2f2' }}>
      <div style={{ height: 400, width: '70%' }}>
        <StyledDataGrid
          rows={tasks}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}

          onRowClick={handleRowClick}
        />
      </div>
      <Button variant="contained" sx={{ m: 2 }} onClick={() => toggleDrawer(true)}>+</Button>
      <ReusableDrawer open={drawerOpen} toggleDrawer={toggleDrawer} width={480} title="Add New Task">
        <AddTask toggleDrawer={toggleDrawer} />
      </ReusableDrawer>
    </Container>
  );
};

export default TablePage;

import React, { FC, useEffect } from "react";
import Table from "components/table/Table";
import { useTaskContext } from "../context/TaskContext";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";


const TablePage: FC = () => {
  const { tasks, fetchTasks } = useTaskContext();

  useEffect(() => {
    fetchTasks()
  }, [])
  return (
    <Container sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Table list={tasks} />
      <Button variant="contained" sx={{ m: 2 }} component={Link} to="/addTask">+</Button>
    </Container>
  );
};

export default TablePage;


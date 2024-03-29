import React, { FC } from "react";
import { TableCell, TableContainer, TableRow } from "components/table/TableComponents";
import { Link } from "react-router-dom";
import { ListItem } from "types/ListTypes";
import { Button } from "@mui/material";

type TableProps = {
  list: ListItem[];
};
const Table: FC<TableProps> = ({ list }) => {
  return (
    <TableContainer>
      {list.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>Status: {item.status}</TableCell>
          <TableCell>
            <Link to={`/task/${item._id}`}>
              <Button variant="contained" color="primary"> DETAILS</Button>
            </Link>
          </TableCell>
        </TableRow>
      ))}

    </TableContainer>
  );
};

export default Table;
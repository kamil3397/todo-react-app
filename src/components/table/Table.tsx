import React, { FC } from "react";
import { TableCell, TableContainer, TableRow, Button } from "components/table/TableComponents";

type TableProps = {
  list:{
    title: string;
    description: string;
    status: string;
    action: string;
  }[]; // [] na końcu zawsze będzie oznaczał, że obiekt będzię Array'em
}
  
type GenericType<Type> = {
  data: Type
}

type MyKeys = 'name' | 'lastName'  // tuple type
 
type TrudnyGeneryk<Value> =  Record<MyKeys, Value>;

const mojaTrudnaZmienna:TrudnyGeneryk<number> = {name: 123, lastName: 123 }

// const mojaTrudnaZmienna2:TrudnyGeneryk<string> = {'lastName': '123' }

const data:GenericType<string> = {
  data: 'myString'
}

// https://www.npmjs.com/package/react-router-dom dodać routing w App.tsx
// https://reactrouter.com/en/main/start/tutorial
/*
1. Stworzyć nowy component TableElementPreview
2. Po kliknięciu w przycisk przekierować do podglądu elementu tablicy
Tipy:
Jak ma wyglądać w App.tsx ścieżka dynamiczna? 

<Route path={'/my-element/:id'} element={<TableElementPreview/>}/>

*/
const Table: FC<TableProps> = ({ list }) => {
  // const navigate = useNavigate();
  // navigate('/my-element/:id')
  return (
    <TableContainer>
      {list.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>Status: {item.status}</TableCell>
          <TableCell>
            <Button>{item.action}</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableContainer>
  );
};

export default Table;


//czytaj z dokumentacji react

import { TableCell, TableContainer, TableRow, Button } from "components/table/Table";
import "./App.css";
import { BasicLayout } from "layouts/BasicLayout";


const array = [
  {title: 'Title', description: 'Description', status: 'Completed', action: <Button>Action button</Button>}, // to jest jeden rząd a wartosci title, desc etc to komórki
  {title: 'Title2', description: 'Description2', status: 'Completed2', action: <button>Action button2</button>},
];

/*
1. Wyświetł każde pole powyzszego araya w tablicy (.map()) 
2. Ostyluj ładnie i responsywnie tabelkę (* pod mobilke nie zrobisz pełnego RWD, poczytaj o overflow (css property));
*/

function App() {
  return (
    <div className="App">
      <BasicLayout>
      <TableContainer>
      {array.map((item, index) => (
        <TableRow key={index}>
          <TableCell>   
            <h3>{item.title}</h3>
          </TableCell>
          <TableCell>
            <p>{item.description}</p>
          </TableCell>
          <TableCell>
            <p>Status: {item.status}</p>
          </TableCell>
          <TableCell>
            <Button>{item.action}</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableContainer>
      </BasicLayout>
    </div>
  );
}

export default App;

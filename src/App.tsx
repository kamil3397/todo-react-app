import "./App.css";
import { BasicLayout, Header, HeaderTitle } from "layouts/BasicLayout";
import TablePage from "pages/TablePage";

function App() {
  return (
    <div className='App'>
    <BasicLayout>
        <Header>
          <HeaderTitle>Todo APP</HeaderTitle>
        </Header>
      <TablePage/>
    </BasicLayout>
    </div>
  );
}

export default App;

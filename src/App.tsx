import "./App.css";
import { BasicLayout, Header, HeaderTitle } from "layouts/BasicLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleTask from "pages/SingleTask";
import TablePage from "pages/TablePage";

function App() {
  return (
    <Router>
      <div className="App">
        <BasicLayout>
          <Header>
            <HeaderTitle>Todo APP</HeaderTitle>
          </Header>
          <Routes>
            <Route path="/table" element={<TablePage />} />
            <Route path="/my-element/:index" element={<SingleTask />} />
            <Route path="/home" element={<TablePage />} />
          </Routes>
        </BasicLayout>
      </div>
    </Router>
  );
}

export default App;

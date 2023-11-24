import "./App.css";
import { BasicLayout, Header, HeaderTitle } from "layouts/BasicLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleTask from "pages/SingleTask";
import TablePage from "pages/TablePage";

/* przeczytac sobie o lazy loadingu https://react.dev/reference/react/lazy, 
jak bedziesz mial czas to zaimplementowac, mozesz go tutaj zaimplementowac */
function App() {
  return (
    <Router>
      <div className="App">
        <BasicLayout>
          <Header>
            <HeaderTitle>Todo APP</HeaderTitle>
          </Header>
          <Routes>
            <Route path="/" element={<TablePage />} />
            <Route path="/my-element/:id" element={<SingleTask/>} />
          </Routes>
        </BasicLayout>
      </div>
    </Router>
  );
}

export default App;

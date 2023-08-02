import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeEdit from "./components/EmployeeEdit";

function App() {
  return (
    <div className="App">
      <h2>Crud with json server</h2>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeList/>}></Route>
          <Route path="/employees/create" element={<EmployeeCreate/>}></Route>
          <Route path="/employees/edit/:employeeID" element={<EmployeeEdit/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreateTask from "./components/CreateTask";
import TaskOverview from "./components/TaskOverview";
import About from "./components/About"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateTask" element={<CreateTask />} />
          <Route path="/TaskOverview" element={<TaskOverview />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;

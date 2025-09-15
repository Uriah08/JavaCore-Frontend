import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./auth/Login"
import Test from "./components/pages/Test"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App

import './App.css'
import {Route, Routes} from "react-router-dom";
import AdminPage from "./pages/admin";
import {RootLayout} from "./components/layouts/root-layout.tsx";

function App() {

  return (
    <>
       <Routes>
          <Route path="/" element={<RootLayout/>}>
            <Route index element={<AdminPage/>}/>
          </Route>
       </Routes>
    </>
  )
}

export default App

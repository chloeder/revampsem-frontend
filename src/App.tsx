import './App.css'
import {Route, Routes} from "react-router-dom";
import AdminPage from "./pages/admin";
import {RootLayout} from "./components/layouts/root-layout.tsx";
import LoginPage from "./pages/auth/login";
import SuperAdminPage from "./pages/superadmin";

function App() {

  return (
    <>
       <Routes>
          <Route path="/auth/login" element={<LoginPage/>}/>
          <Route path="/admin/*" element={<RootLayout/>}>
            <Route index element={<SuperAdminPage/>}/>
          </Route>
          <Route path="/" element={<RootLayout/>}>
            <Route index element={<AdminPage/>}/>
          </Route>
       </Routes>
    </>
  )
}

export default App

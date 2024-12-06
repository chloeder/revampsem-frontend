import {Outlet} from "react-router-dom";
import {Navbar} from "../nav-link.tsx";

export function RootLayout(){
  return (
    <div className="min-h-screen bg-background">
       <Navbar/>
       
       <main className="container mx-auto p-4 space-y-6 bg-background">
          <Outlet/>
       </main>
    </div>
  )
}
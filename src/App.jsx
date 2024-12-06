import { Outlet } from "react-router-dom";
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-[70vh] mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

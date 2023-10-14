
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.css'
import { EmployeeList } from './componets/Employee/EmployeeList.jsx'
import { NavBar } from './componets/NavBar/NavBar';
import {EmployeeForm} from './componets/Employee/EmployeeForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavBar />
    <div className='container my-4'>
      <Routes>
      <Route path='/' element={<EmployeeList />} />
      <Route path='/employeeForm' element={<EmployeeForm/>}/>
      <Route path='/updateEmployee/:id' element={<EmployeeForm/>}/>

      </Routes>
      
    
    </div>
    
  </BrowserRouter>


)

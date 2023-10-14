import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { listEmployees } from "./EmployeeServer";
import * as EmployeeServer from './EmployeeServer'

export const EmployeeItem = ({employee}) => {

    const navigate = useNavigate();

    const handleDelete = async (employeeId) => {
      const result = await Swal.fire({
        title: 'Delete Record',
        text: 'Are you sure want to delete this record?',
        icon: 'warning',
        showCancelButton:true,
        confirmButtonText:'Delete',
        cancelButtonText:'Cancel',
        confirmButtonColor:'#d33',
        cancelButtonColor: '#212529',
        reverseButtons:true,
      })
      if (result.isConfirmed){
        await EmployeeServer.deleteEmployee(employeeId);
        listEmployees();
        Swal.fire('Delete!', 'The record has been delete.', 'success');
      }
    }
    
  return (
   <div className="col-md-4 mb-4">
    <div className="card card-body">
        <div className="row">
            <div className="card-content">
                <h3 className="card-title">{employee.name}
                <p className="card-text photo-container">
                    <img src={employee.photo} alt="Employee" className="photo" />
                </p>
                </h3>
            </div>
        </div>
        <div className="row mb-4">
            <div className="card-content mb-4">
                <p className="card-button">
                    <button className="btn btn-sm btn-dark ms-2" 
                    onClick={() => navigate ( `/updateEmployee/${employee.id}`)}
                    >
                        Update</button>
                </p>
            </div>
        </div>
        <p className="card-text">Phone:<strong>{employee.phone}</strong></p>
        <p className="card-text mb-4">Email:<strong>{employee.email}</strong></p>
        <Link rel="noreferer noopener" to={ `mailto:${employee.email}`} target='_blank' className='btn btn-warning'> Send Email</Link>
        <button className="btn btn-danger my-2" onClick={() => employee.id && handleDelete(employee.id)}>
            Delete Record
        </button>

    </div>

   </div>
  )
}

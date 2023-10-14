import { useState, useEffect } from "react"
import * as EmployeeServer from './EmployeeServer'
import { useNavigate, useParams } from "react-router-dom"

export const EmployeeForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const initialstate = {id:0, name:'', email:'', phone:''}
  const [employee, SetEmployee] = useState(initialstate)

  const handleChange = (event) => {
    SetEmployee({...employee, [event.target.name]:event.target.value})
  }
  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        let res;
        if(!params.id)
        {res = await EmployeeServer.registerEmployee(employee);
          const data = await res.json();
          if(data.message === 'Success'){
            SetEmployee(initialstate)
          }
        }else{
          res = await EmployeeServer.updateEmployee(params.id, employee)
        }
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }

      const getEmployee = async(employeeId) =>{
        try {
          let res;
          res = await EmployeeServer.getEmployee(employeeId);
          const data = await res.json();
          const {name, email, phone} = data;
          SetEmployee({name, email, phone})
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        if(params.id){
          getEmployee(params.id)
        }
        
      }, [])
      
  

  return (
    <div className="col-md-3 mx-auto">
      <h2 className="mb-3 text-center">Employee</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Name</label>
          <input 
          type="text"
          className="form-control"
          name="name"
          minLength="2"
          maxLength="50"
          autoFocus
          required
          value={employee.name}
          onChange={handleChange}
          
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Email</label>
          <input 
          type="email"
          name="email"
          className="form-control"
          maxLength="100"
          required
          value={employee.email}
          onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Phone</label>
          <input 
          type="text"
          className="form-control"
          name="phone"
          required
          value={employee.phone}
          onChange={handleChange}

          />
        </div>
        <div className="d-grid gap-2">
         {params.id ? (
              <button type="submit" className="btn btn-dark btn-block">Update</button> 
           ) : ( 
            <button type="submit" className="btn btn-danger btn-block">Register</button> )
          

           } 
        </div>

      </form>
    </div>
  )
}

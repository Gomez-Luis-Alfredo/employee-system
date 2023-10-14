import { useState, useEffect } from 'react'
import * as EmployeeServer from './EmployeeServer'
import { EmployeeItem } from './EmployeeItem';


export const EmployeeList = () => {
    const [employees,SetEmployees] = useState([])

    const listEmployees = async () => {
        try {
            const res = await EmployeeServer.listEmployees();
            const data = await res.json();
            SetEmployees(data);
        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(() => {
        listEmployees();
    }, [])
    
  return (

    <div className='row'>
        {employees.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} listemployee={listEmployees}/>

        ))}
    </div>
   
  )
}

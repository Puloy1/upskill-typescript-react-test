import { useEffect, useState } from 'react'
import {
  employees,
  EmployeeCard,
  type Employee,
  type EmployeeListResponse
} from '../../employee'

export function EmployeeLoader() {
  const [employee, setEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmployee({
        id: 1,
        name: 'Jane Does',
        email: 'jane@example.com',
        department: 'Engineering',
        status: 'active',
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleSelect = () => {
    const response: EmployeeListResponse = {
      employees,
    }
    console.log('response', response)

    const randomEmployee = response.employees[Math.floor(Math.random() * response.employees.length)]

    setEmployee(randomEmployee)
  }

  if (!employee) {
    return <p>Loading...</p>
  }

   return (
      <EmployeeCard
        employee={employee}
        onSelect={handleSelect}
      />
    )
}
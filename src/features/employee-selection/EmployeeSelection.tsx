import { useState } from 'react'

import {
  EmployeeCard,
  type Employee,
} from '../../entities/employee'

type EmployeeSelectionProps = {
  employees: Employee[]
}

export function EmployeeSelection({
  employees
}: EmployeeSelectionProps) {
  const [employee, setEmployee] = useState<Employee | null>(null)

  const handleSelect = () => {
    if (employees.length === 0) {
        return
    }
    const randomEmployee =
      employees[
        Math.floor(Math.random() * employees.length)
      ]

    setEmployee(randomEmployee)
  }

  if (employees.length === 0) {
    return <p>No employees available.</p>
  }

  if (!employee) {
    return (
      <button
        type="button"
        onClick={handleSelect}
      >
        Load Employee
      </button>
    )
  }

  return (
    <EmployeeCard
      employee={employee}
      onSelect={handleSelect}
    />
  )
}
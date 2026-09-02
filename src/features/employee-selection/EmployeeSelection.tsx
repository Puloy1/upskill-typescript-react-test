import { useState } from 'react'

import type { Shift } from '../../entities/shift'

import { ShiftAssignment } from '../shift-assignment'

import {
  EmployeeCard,
  type Employee,
} from '../../entities/employee'

type EmployeeSelectionProps = {
  employees: Employee[]
  onShiftAssigned: (shift: Shift) => void
}

export function EmployeeSelection({
  employees,
  onShiftAssigned
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
    <>
      <EmployeeCard
        employee={employee}
        onSelect={handleSelect}
      />

      <ShiftAssignment
        employeeId={employee.id}
        onShiftAssigned={onShiftAssigned}
      />
    </>
  )
}
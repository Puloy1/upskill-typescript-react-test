import './ShiftAssignment.css'
import { useState } from 'react'

import {
  employees,
  type Employee,
} from '../../entities/employee'

import type {
  CreateShiftRequest,
} from '../../entities/shift'

export function ShiftAssignment() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const [shift, setShift] = useState<CreateShiftRequest | null>(null)

  const handleSelectEmployee = (
    employee: Employee
  ) => {
    setSelectedEmployee(employee)
  }

  const handleAssignShift = () => {
    if (!selectedEmployee) {
      return
    }

    const request: CreateShiftRequest = {
      employeeId: selectedEmployee.id,
      date: '2026-08-27',
      startTime: '09:00',
      endTime: '18:00',
    }

    setShift(request)
  }

  return (
    <section>
      <h2>Assign Shift</h2>

      <div>
        <h3>Select Employee</h3>

        {/* {employees.map((employee) => (
          <button
            key={employee.id}
            type="button"
            onClick={() =>
              handleSelectEmployee(employee)
            }
          >
            {employee.name}
          </button>
        ))}
         */}
        <div className="shift-assignment__employees">
          {employees.map((employee) => (
            <button
              key={employee.id}
              type="button"
              onClick={() => handleSelectEmployee(employee)}
            >
              {employee.name}
            </button>
          ))}
        </div>
      </div>

      {selectedEmployee && (
        <div>
          <p>
            Selected: {selectedEmployee.name}
          </p>

          <button
            type="button"
            onClick={handleAssignShift}
          >
            Assign Shift
          </button>
        </div>
      )}

      {shift && (
        <p>
          Shift assigned to employee ID:{' '}
          {shift.employeeId}
        </p>
      )}
    </section>
  )
}
import { useState, useEffect } from 'react'

import {
  getEmployees,
  type Employee
} from '../../entities/employee'

import type { Shift } from "../../entities/shift";

import { EmployeeSelection } from "../../features/employee-selection"

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<Shift[]>([])

  const loadEmployees = (isRetry = false) => {
    setIsLoading(true)
    setError(null)
    console.log('isRetry', isRetry)
    getEmployees(isRetry)
      .then((data) => {
        setEmployees(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleShiftAssigned = (shift: Shift) => {
    setSchedule((currentSchedule) => [
      ...currentSchedule,
      shift,
    ])
  }

  useEffect(() => {
    loadEmployees(true)
  }, [])

  if (isLoading) {
    return (
      <main>
        <h1>Employees</h1>

        <p>Loading employees, please wait...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <h1>Employees</h1>

        <p>{error}</p>
        <button onClick={() => loadEmployees(false)}>
          Retry
        </button>
      </main>
    )
  }

  if (employees.length === 0) {
    return (
      <main>
        <h1>Employees</h1>

        <p>No employees available.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Employees</h1>

      <EmployeeSelection
        employees={employees}
        onShiftAssigned={handleShiftAssigned}
      />

      {schedule.length > 0 && (
        <section>
          <h2>Schedule</h2>

          <ul>
            {schedule.map((shift) => (
              <li key={shift.id}>
                Employee {shift.employeeId} — {shift.date} —{' '}
                {shift.startTime} to {shift.endTime}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
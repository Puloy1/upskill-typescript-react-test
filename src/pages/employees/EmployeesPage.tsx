import { useState, useEffect } from 'react'

import {
  getEmployees,
  type Employee
} from '../../entities/employee'

import { EmployeeSelection } from "../../features/employee-selection"

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      />
    </main>
  )
}
import type { Employee } from '../model/employee.types'
import { employees } from '../model/employee.mock'

const serverEmployees = [...employees]

export function simulateEmployeeAdded() {
  serverEmployees.push({
    id: 11,
    name: 'New Employee',
    email: 'new.employee@example.com',
    department: 'Engineering',
    status: 'active',
  })
}

export function getEmployees(
  shouldFail = false
): Promise<Employee[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(
          new Error('Failed to load employees.')
        )
        return
      }

      resolve(serverEmployees)
    }, 1000)
  })
}
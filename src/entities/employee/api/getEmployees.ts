import type { Employee } from '../model/employee.types'
import { employees } from '../model/employee.mock'

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

      resolve(employees)
    //   resolve([])
    }, 1000)
  })
}
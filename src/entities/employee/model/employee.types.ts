export type EmployeeStatus =
  | 'active'
  | 'inactive'
  | 'on-leave'

export type Employee = {
  id: number
  name: string
  email: string
  department: string
  status: EmployeeStatus
}

export function getEmployeeDisplayName(
  employee: Employee
): string {
  return employee.name
}
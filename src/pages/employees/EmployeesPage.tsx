import { EmployeeSelection } from "../../features/employee-selection"
import { employees } from "../../entities/employee"

export function EmployeesPage() {
  return (
    <main>
      <h1>Employees</h1>

      <EmployeeSelection
        employees={employees}
      />
    </main>
  )
}
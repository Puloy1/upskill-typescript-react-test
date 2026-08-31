import type { Employee } from '../model/employee.types'
import './EmployeeCard.css'

type EmployeeCardProps = {
  employee: Employee
  onSelect: (id: number) => void
}

export function EmployeeCard({
  employee,
  onSelect,
}: EmployeeCardProps) {
  const statusLabel = {
    active: 'Active',
    inactive: 'Inactive',
    'on-leave': 'On Leave',
  }[employee.status]

  return (
    <article className="employee-card">
      <div className="employee-card__content">
        <h2>{employee.name}</h2>

        <p>{employee.email}</p>

        <p>{employee.department}</p>

        <p>
          Status: {statusLabel}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onSelect(employee.id)}
      >
        View Employee
      </button>
    </article>
  )
}
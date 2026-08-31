import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Employee } from '../model/employee.types'
import { EmployeeCard } from './EmployeeCard'

const employee: Employee = {
  id: 1,
  name: 'Jane Doe',
  email: 'jane@example.com',
  department: 'Engineering',
  status: 'active',
}

describe('EmployeeCard', () => {
  it('displays the employee name', () => {
    render(
      <EmployeeCard
        employee={employee}
        onSelect={() => {}}
      />
    )

    expect(
      screen.getByText('Jane Doe')
    ).toBeInTheDocument()
  })
})

it('calls onSelect when View Employee is clicked', async () => {
  const onSelect = vi.fn()
  const user = userEvent.setup()

  render(
    <EmployeeCard
      employee={employee}
      onSelect={onSelect}
    />
  )

  await user.click(
    screen.getByRole('button', {
      name: /view employee/i,
    })
  )

  expect(onSelect).toHaveBeenCalledWith(
    employee.id
  )
})

it('provides an accessible View Employee button', () => {
  render(
    <EmployeeCard
      employee={employee}
      onSelect={() => {}}
    />
  )

  expect(
    screen.getByRole('button', {
      name: /view employee/i,
    })
  ).toBeInTheDocument()
})

it('displays Active for an active employee', () => {
  render(
    <EmployeeCard
      employee={employee}
      onSelect={() => {}}
    />
  )

  expect(
    screen.getByText('Status: Active')
  ).toBeInTheDocument()
})

it('displays Inactive for an inactive employee', () => {
  render(
    <EmployeeCard
      employee={{
        ...employee,
        status: 'inactive',
      }}
      onSelect={() => {}}
    />
  )

  expect(
    screen.getByText('Status: Inactive')
  ).toBeInTheDocument()
})

it('displays On Leave for an employee on leave', () => {
  render(
    <EmployeeCard
      employee={{
        ...employee,
        status: 'on-leave',
      }}
      onSelect={() => {}}
    />
  )

  expect(
    screen.getByText('Status: On Leave')
  ).toBeInTheDocument()
})

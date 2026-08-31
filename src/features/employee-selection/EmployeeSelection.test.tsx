import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmployeeSelection } from './EmployeeSelection'
import userEvent from '@testing-library/user-event'
const user = userEvent.setup()

describe('EmployeeSelection', () => {
  it('displays an empty state when no employees are available', () => {
    render(<EmployeeSelection employees={[]}/>)

    expect(
      screen.getByText('No employees available.')
    ).toBeInTheDocument()
  })
})

it('displays an employee after loading', async () => {
  const employees = [
    {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      department: 'Engineering',
      status: 'active' as const,
    },
  ]

  render(
    <EmployeeSelection
      employees={employees}
    />
  )

  await user.click(
    screen.getByRole('button', {
      name: /load employee/i,
    })
  )

  expect(
    screen.getByText('Jane Doe')
  ).toBeInTheDocument()
})
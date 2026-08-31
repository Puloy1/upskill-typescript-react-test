import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmployeeLoader } from './EmployeeLoader'

describe('EmployeeLoader', () => {
  it('displays Loading initially', () => {
    render(<EmployeeLoader />)

    expect(
      screen.getByText('Loading...')
    ).toBeInTheDocument()
  })
})

// it('displays the employee after loading', async () => {
//   render(<EmployeeLoader />)

//   expect(
//     await screen.findByRole('heading', {
//       name: 'Jane Doe',
//     })
//   ).toBeInTheDocument()
// })

it('displays the View Employee button after loading', async () => {
  render(<EmployeeLoader />)

  expect(
    await screen.findByRole('button', {
      name: /view employee/i,
    })
  ).toBeInTheDocument()
})
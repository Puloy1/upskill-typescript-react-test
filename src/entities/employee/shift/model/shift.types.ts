export type CreateShiftRequest = {
  employeeId: number
  date: string
  startTime: string
  endTime: string
}

export type Shift = {
  id: number
  employeeId: number
  date: string
  startTime: string
  endTime: string
}
export type AvailabilityRequest = {
  employeeId: number
  date: string
  startTime: string
  endTime: string
}

export type AvailabilityResponse = {
  available: boolean
}
export type ShiftNotificationRequest = {
  employeeId: number
  shiftId: number
}

export type ShiftNotificationResponse = {
  sent: boolean
}
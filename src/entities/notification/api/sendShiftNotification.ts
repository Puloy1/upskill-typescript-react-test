import type {
  ShiftNotificationRequest,
  ShiftNotificationResponse,
} from '../model/notification.types'

export function sendShiftNotification(
  request: ShiftNotificationRequest
): Promise<ShiftNotificationResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (request.employeeId % 2 !== 0) {
        reject(new Error('Failed to send shift notification'))
        return
      }

      resolve({
        sent: true,
      })
    }, 1000)
  })
}
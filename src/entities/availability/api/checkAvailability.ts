import type {
  AvailabilityRequest,
  AvailabilityResponse,
} from '../model/availability.types'

// export function checkAvailability(
//   request: AvailabilityRequest
// ): Promise<AvailabilityResponse> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         available: request.employeeId % 2 === 0, // make available if id is even number (fake API)
//       })
//     }, 1000)
//   })
// }

export function checkAvailability(
  request: AvailabilityRequest
): Promise<AvailabilityResponse> {
  return new Promise((resolve) => {
    const delay = request.employeeId % 2 === 0
      ? 2000
      : 500

    setTimeout(() => {
      resolve({
        available: request.employeeId % 2 === 0,
      })
    }, delay)
  })
}
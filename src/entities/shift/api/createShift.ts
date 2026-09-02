import type {
  CreateShiftRequest,
  Shift,
} from '../model/shift.types'

export function createShift(
  request: CreateShiftRequest,
  shouldFail = false
): Promise<Shift> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(
          new Error('Failed to assign employee.')
        )
        return
      }

      const shift: Shift = {
        id: Date.now(),
        ...request,
      }

      resolve(shift)
    }, 1000)
  })
}
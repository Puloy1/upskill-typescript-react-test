import { useState } from 'react'

import { createShift } from '../../../entities/shift'

import type { Shift } from "../../../entities/shift";

import { checkAvailability } from "../../../entities/availability"

import {
  sendShiftNotification,
} from '../../../entities/notification'

type ShiftAssignmentProps = {
  employeeId: number
  onShiftAssigned: (shift: Shift) => void
}

export function ShiftAssignment({
  employeeId,
  onShiftAssigned
}: ShiftAssignmentProps) {
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [isAssigning, setIsAssigning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUnavailable, setIsUnavailable] = useState(false)
  const [isNotificationFailed, setIsNotificationFailed] = useState(false)

  const handleAssign = async () => {
    setIsAssigning(true)
    setIsSuccess(false)
    setError(null)
    setIsUnavailable(false)
    setIsNotificationFailed(false)

    const result = await checkAvailability({
      employeeId,
      date,
      startTime,
      endTime,
    })

    // need to comment out to test sendShiftNotification on odd numbered
    if (!result.available) {
      setIsUnavailable(true)
      setIsAssigning(false)
      return
    }
    await createShift({
      employeeId,
      date,
      startTime,
      endTime,
    })
      .then((shift) => {
        console.log('shift', shift)
        setIsSuccess(true)
        onShiftAssigned(shift)
        sendShiftNotification({
          employeeId,
          shiftId: shift.id,
        })
          .then(() => {
            console.log('notification sent')
          })
         .catch((error) => {
            console.log('notification failed:', error)
            setIsNotificationFailed(true)
          })
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsAssigning(false)
      })
  }

  return (
    <section>
      <h2>Shift Assignment</h2>

      <p>Employee ID: {employeeId}</p>

      <div>
        <label htmlFor="shift-date">
          Date
        </label>

        <input
          id="shift-date"
          type="date"
          value={date}
          onChange={(event) =>
            setDate(event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="start-time">
          Start Time
        </label>

        <input
          id="start-time"
          type="time"
          value={startTime}
          onChange={(event) =>
            setStartTime(event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="end-time">
          End Time
        </label>

        <input
          id="end-time"
          type="time"
          value={endTime}
          onChange={(event) =>
            setEndTime(event.target.value)
          }
        />
      </div>

      <button
        type="button"
        onClick={handleAssign}
        disabled={isAssigning}
      >
        {isAssigning
          ? 'Assigning...'
          : 'Assign Employee'}
      </button>

      {isSuccess && (
        <p>
          Employee assigned successfully.
        </p>
      )}

      {isUnavailable && (
        <p>
          Employee is unavailable for this shift.
        </p>
      )}

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      {isNotificationFailed && (
        <p>
          Shift assigned, but we couldn't send the notification.
        </p>
      )}
    </section>
  )
}
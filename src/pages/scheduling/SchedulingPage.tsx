import { ShiftAssignment } from "../../features/shift-assignment"

export function SchedulingPage() {
  return (
    <main>
      <h1>Scheduling</h1>

      <p>
        Manage employee schedules and shifts.
      </p>
      <ShiftAssignment />
    </main>
  )
}
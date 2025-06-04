import { DateTime } from "luxon";

export function getCurrentValidDate() {
  const currentDate = DateTime.now();
  const minute = currentDate.minute;

  const isMultipleOf5 = minute % 5 === 0;

  if (isMultipleOf5) {
    return currentDate.toJSDate();
  }

  const roundedMinute = Math.floor(minute / 5) * 5;

  return currentDate.set({ minute: roundedMinute, second: 0, millisecond: 0 }).toJSDate();
}

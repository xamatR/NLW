/**
 *
 * */
export function hourToMinutes(hourString: string) {
  const [hour, minutes] = hourString.split(':').map(Number);
  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}

export function minutesToHour(minutes: number) {   
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${String(hour).padStart(2,'0')}:${ String(minute).padStart(2,'0')}`;
}
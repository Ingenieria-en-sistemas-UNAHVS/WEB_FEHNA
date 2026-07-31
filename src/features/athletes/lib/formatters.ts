import type { AthletePerformance } from "../types/athlete.types";

export function formatTime(timeMs: number): string {
  const totalSeconds = timeMs / 1000;
  if (totalSeconds >= 60) {
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${(totalSeconds - minutes * 60).toFixed(2).padStart(5, "0")}`;
  }
  return `${totalSeconds.toFixed(2)} s`;
}

export function formatEventName(performance: AthletePerformance): string {
  return `${performance.distanceMeters.toLocaleString("es-HN")} m ${performance.stroke}`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("es-HN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

export function calculateAge(birthDate: string): number {
  const birth = new Date(`${birthDate}T12:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const birthdayPassed = today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!birthdayPassed) age -= 1;
  return age;
}

export function now(): string {
	return new Date().toISOString();
}

export function dayOfYear(date = new Date()): number {
	const start = new Date(date.getFullYear(), 0, 0);
	const diff = date.getTime() - start.getTime();
	return Math.floor(diff / 86400000);
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
	return new Date(iso).toLocaleDateString(undefined, opts ?? { month: 'short', day: 'numeric' });
}

export function formatTime(iso: string): string {
	return new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

export function isToday(iso: string): boolean {
	const d = new Date(iso);
	const t = new Date();
	return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
}

export function isTomorrow(iso: string): boolean {
	const d = new Date(iso);
	const t = new Date();
	t.setDate(t.getDate() + 1);
	return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
}

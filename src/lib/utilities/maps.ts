export function getDaysBackColor(date: Date) {
    const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));

    if (days < 1) return '#dc2626';
    if (days < 2) return '#ea580c';
    if (days < 3) return '#eab308';
}
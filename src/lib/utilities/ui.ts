import { colorScheme } from "$lib/stores/ui.store";

export function colorSchemeWatcher(): void {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: light)');
    function setScheme(value: boolean) {
        colorScheme.set(value ? 'light' : 'dark');
    }
    setScheme(mediaQueryList.matches);
    mediaQueryList.onchange = () => {
        setScheme(mediaQueryList.matches);
    };
}
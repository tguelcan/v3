/**
 * Used to avoid the flash effect when calling up the page
 * Supports: dark, light, system (default)
 * - tayfun
 */
(function() {
	const theme = localStorage.getItem('theme') || 'system';
	let actualTheme;

	if (theme === 'system') {
		actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	} else {
		actualTheme = theme;
	}

	document.documentElement.setAttribute('data-theme', actualTheme);
})();

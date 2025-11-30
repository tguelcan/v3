<script lang="ts">
	const themes = ['system', 'dark', 'light'];
	let current_theme = $state('system');

	// Initialisierung mit $effect.root - läuft nur einmal beim Mount
	$effect.root(() => {
		if (typeof window === 'undefined') return;

		// Theme aus localStorage laden oder 'system' als Default
		current_theme = window.localStorage.getItem('theme') || 'system';

		// Media Query Listener für system theme
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemThemeChange = () => {
			if (current_theme === 'system') {
				applyTheme('system');
			}
		};

		mediaQuery.addEventListener('change', handleSystemThemeChange);

		// Cleanup beim Unmount
		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	});

	const applyTheme = (theme: string) => {
		let actualTheme = theme;

		if (theme === 'system') {
			// System-Präferenz ermitteln
			actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}

		document.documentElement.setAttribute('data-theme', actualTheme);
	};

	const setTheme = () => {
		// Theme im localStorage speichern
		window.localStorage.setItem('theme', current_theme);
		// Theme anwenden
		applyTheme(current_theme);
	};
</script>

<fieldset class="fieldset">
	<legend class="fieldset-legend">Color Mode</legend>
	<select bind:value={current_theme} data-choose-theme class="select w-full" onchange={setTheme}>
		{#each themes as theme, index (index)}
			<option value={theme} class="capitalize">{theme}</option>
		{/each}
	</select>
</fieldset>

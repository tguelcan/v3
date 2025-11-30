import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx', '.md']})],
	kit: {
		adapter: adapter() ,
		alias: {
			$components: 'src/lib/components/*',
			$parts: 'src/lib/parts/*',
			$styles: 'src/lib/styles/*',
			$assets: 'src/lib/assets/*',
			$utils: 'src/lib/utils/*',
			$remotes: 'src/lib/remotes/*',
			$server: 'src/lib/server/*',
			$generated: 'src/generated/*'
		},
		experimental: {
			remoteFunctions: true
		},
	},
	extensions: ['.svelte', '.svx', '.md'],
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;

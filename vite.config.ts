import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['@redsolver/s5-wasm']
	},
	build: {
		target: 'esnext'
	}
});

import { Observable } from '../reactive.ts';
import { buildTheme, flattenTheme } from './builder.ts';
import type { Theme } from './theme.ts';

export const defaultTheme: Theme = buildTheme({
	name: 'Default',
	colors: {
		defaults: {
			surface: '#fff6e5',
			ink: '#000000',
		},
		variants: {
			accent: {
				surface: '#ffe275',
				ink: '#FFFFFF',
			},
			default: {
				surface: t => t.colors.defaults.surface,
				ink: t => t.colors.defaults.ink,
			},
			canvas: {
				surface: '#fff1e8',
			},
			info: {
				surface: '#00E5FF',
			},
			success: {
				surface: '#00FF66',
			},
			warning: {
				surface: '#FFC900',
			},
			error: {
				surface: '#FF4911',
			},
			'search-box': {
				surface: '#a9d7b8',
			},
			'search-result': {
				surface: '#FFC900',
			},
			'pokemon-page': {
				surface: '#A66CFF',
			},

		},
		stats: {
			attacK: '#306686',
			defense: '#50501f',
			stamina: '#7e1948',
		},
	},
	border: { color: '#000000', width: { thick: '3px', thin: '1px' } },
	shadow: { color: '#000000', offset: { x: '4px', y: '4px' } },
	radius: { sharp: '0px', soft: '4px' },
});

export const themes: Record<string, Theme> = {
	default: defaultTheme,
};

const applyTheme = (theme: Theme) => {
	const flattenedTheme = flattenTheme(theme);
	for (const [key, value] of Object.entries(flattenedTheme)) {
		document.documentElement.style.setProperty(key, value);
	}
};

const savedThemeId = localStorage.getItem('themeId');
const initialThemeId = savedThemeId && themes[savedThemeId] ? savedThemeId : 'default';

export const currentThemeId = new Observable<string>(initialThemeId);
currentThemeId.subscribe(themeId => {
	if (themes[themeId]) {
		applyTheme(themes[themeId]);
		localStorage.setItem('themeId', themeId);
	} else {
		console.warn(`Theme "${themeId}" not found. Falling back to default theme.`);
		currentThemeId.value = 'default';
	}
}, true);

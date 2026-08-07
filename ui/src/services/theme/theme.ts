export type Color = string | ((theme: ThemeBuilder<Color>) => Color);

export interface Variant<TColor> {
	surface: TColor;
	ink?: TColor;
}

export interface ThemeBuilder<TColor> {
	name: string;
	colors: {
		defaults: {
			surface: string;
			ink: string;
		};
		variants: {
			accent: Variant<TColor>;
			default: Variant<TColor>;
			canvas: Variant<TColor>;
			window: Variant<TColor>;
			'window-header': Variant<TColor>;
			'sidebar-button-deselected': Variant<TColor>;
			'sidebar-button-selected': Variant<TColor>;
			info: Variant<TColor>;
			success: Variant<TColor>;
			warning: Variant<TColor>;
			error: Variant<TColor>;
		};
	};
	border: {
		color: TColor;
		width: {
			thick: string;
			thin: string;
		};
	};
	shadow: {
		color: TColor;
		offset: {
			x: string;
			y: string;
		};
	};
	radius: {
		sharp: string;
		soft: string;
	};
}

export type ThemeBlueprint = ThemeBuilder<Color>;
export type Theme = ThemeBuilder<string>;

export type VariantName = keyof Theme['colors']['variants'];
export type BorderWidthName = keyof Theme['border']['width'];
export type RadiusName = keyof Theme['radius'];

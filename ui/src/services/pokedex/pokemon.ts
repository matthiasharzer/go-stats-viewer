interface Translation {
	en: string;
	de: string;
}

interface Type {
	type: string;
	names: Translation;
}

interface Stats {
	attack: number;
	defense: number;
	stamina: number;
}

interface Assets {
	image: string;
	shiny_image: string;
}

interface Pokemon {
	id: string;
	dex_nr: number;
	generation: number;
	names: Translation;
	stats: Stats;
	primary_type: Type;
	secondary_type?: Type;
	assets: Assets;
}

const typeColors: Record<string, string> = {
	normal: '#A8A878',
	fighting: '#C03028',
	flying: '#A890F0',
	poison: '#A040A0',
	ground: '#E0C068',
	rock: '#B8A038',
	bug: '#A8B820',
	ghost: '#705898',
	steel: '#B8B8D0',
	fire: '#F08030',
	water: '#6890F0',
	grass: '#78C850',
	electric: '#F8D030',
	psychic: '#F85888',
	ice: '#98D8D8',
	dragon: '#7038F8',
	dark: '#665042',
	fairy: '#EE99AC',
	unknown: '#68A090',
	shadow: '#4F5870',
};

export type { Assets, Pokemon, Stats, Translation, Type };
export { typeColors };

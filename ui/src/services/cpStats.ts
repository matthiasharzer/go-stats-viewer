import type { Pokemon } from './pokedex/pokemon.ts';

interface CPStats {
	raid: number;
	raidWeatherBoosted: number;
	research: number;
	eggs: number;
}

const levels = {
	raid: 20,
	raidWeatherBoosted: 25,
	research: 15,
	eggs: 20,
};

const levelScalar: { [key: string]: number } = {
	'1.0': 0.094,
	'11.0': 0.44310755,
	'21.0': 0.61215729,
	'31.0': 0.73776948,
	'41.0': 0.79530001,
	'1.5': 0.135137432,
	'11.5': 0.453059958,
	'21.5': 0.619399365,
	'31.5': 0.740785574,
	'41.5': 0.79780392,
	'2.0': 0.16639787,
	'12.0': 0.46279839,
	'22.0': 0.62656713,
	'32.0': 0.74378943,
	'42.0': 0.80030001,
	'2.5': 0.192650919,
	'12.5': 0.472336083,
	'22.5': 0.633644533,
	'32.5': 0.746781211,
	'42.5': 0.80280389,
	'3.0': 0.21573247,
	'13.0': 0.48168495,
	'23.0': 0.64065295,
	'33.0': 0.74976104,
	'43.0': 0.80530001,
	'3.5': 0.236572661,
	'13.5': 0.4908558,
	'23.5': 0.6475809666,
	'33.5': 0.752729087,
	'43.5': 0.80780387,
	'4.0': 0.25572005,
	'14.0': 0.49985844,
	'24.0': 0.65443563,
	'34.0': 0.75568551,
	'44.0': 0.81030001,
	'4.5': 0.273530381,
	'14.5': 0.508701765,
	'24.5': 0.661214806,
	'34.5': 0.758630378,
	'44.5': 0.81280384,
	'5.0': 0.29024988,
	'15.0': 0.51739395,
	'25.0': 0.667934,
	'35.0': 0.76156384,
	'45.0': 0.81530001,
	'5.5': 0.306057377,
	'15.5': 0.525942511,
	'25.5': 0.674577537,
	'35.5': 0.764486065,
	'45.5': 0.81780382,
	'6.0': 0.3210876,
	'16.0': 0.53435433,
	'26.0': 0.68116492,
	'36.0': 0.76739717,
	'46.0': 0.82030001,
	'6.5': 0.335445036,
	'16.5': 0.542635767,
	'26.5': 0.687680648,
	'36.5': 0.770297266,
	'46.5': 0.8228038,
	'7.0': 0.34921268,
	'17.0': 0.55079269,
	'27.0': 0.69414365,
	'37.0': 0.7731865,
	'47.0': 0.82530001,
	'7.5': 0.362457751,
	'17.5': 0.558830576,
	'27.5': 0.700538673,
	'37.5': 0.776064962,
	'47.5': 0.82780378,
	'8.0': 0.37523559,
	'18.0': 0.56675452,
	'28.0': 0.70688421,
	'38.0': 0.77893275,
	'48.0': 0.83030001,
	'8.5': 0.387592406,
	'18.5': 0.574569153,
	'28.5': 0.713164996,
	'38.5': 0.781790055,
	'48.5': 0.83280375,
	'9.0': 0.39956728,
	'19.0': 0.58227891,
	'29.0': 0.71939909,
	'39.0': 0.78463697,
	'49.0': 0.83530001,
	'9.5': 0.411193551,
	'19.5': 0.589887917,
	'29.5': 0.725571552,
	'39.5': 0.787473578,
	'49.5': 0.83780373,
	'10.0': 0.42250001,
	'20.0': 0.59740001,
	'30.0': 0.7317,
	'40.0': 0.79030001,
	'50.0': 0.84030001,
	'10.5': 0.432926419,
	'20.5': 0.604818814,
	'30.5': 0.734741009,
	'40.5': 0.79280394,
	'50.5': 0.84280371,
	'51.0': 0.84530001,
};

const fourStarIVs = {
	attack: 15,
	defense: 15,
	stamina: 15,
};

const calculate4StarCP = (pokemon: Pokemon, level: number): number => {
	const levelStr = level.toFixed(1);
	if (!(levelStr in levelScalar)) {
		throw new Error(`Level ${level} is not valid`);
	}
	const scalar = levelScalar[levelStr];

	const totalAttack = pokemon.stats.attack + fourStarIVs.attack;
	const totalDefense = pokemon.stats.defense + fourStarIVs.defense;
	const totalStamina = pokemon.stats.stamina + fourStarIVs.stamina;

	const cp = (totalAttack * Math.sqrt(totalDefense) * Math.sqrt(totalStamina) * scalar ** 2) / 10;
	return Math.max(10, Math.floor(cp));
};

const calculate4StarCPStats = (pokemon: Pokemon): CPStats => {
	const cpStats: CPStats = {
		raid: calculate4StarCP(pokemon, levels.raid),
		raidWeatherBoosted: calculate4StarCP(pokemon, levels.raidWeatherBoosted),
		research: calculate4StarCP(pokemon, levels.research),
		eggs: calculate4StarCP(pokemon, levels.eggs),
	};
	return cpStats;
};

export { type CPStats, calculate4StarCPStats };

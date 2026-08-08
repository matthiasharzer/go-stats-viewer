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
	eggs: 20
}



const levelScalar: { [key: string]: number } = {
	"1.0": 0.094000000,
	"11.0": 0.443107550,
	"21.0": 0.612157290,
	"31.0": 0.737769480,
	"41.0": 0.795300010,
	"1.5": 0.135137432,
	"11.5": 0.453059958,
	"21.5": 0.619399365,
	"31.5": 0.740785574,
	"41.5": 0.79780392,
	"2.0": 0.166397870,
	"12.0": 0.462798390,
	"22.0": 0.626567130,
	"32.0": 0.743789430,
	"42.0": 0.800300010,
	"2.5": 0.192650919,
	"12.5": 0.472336083,
	"22.5": 0.633644533,
	"32.5": 0.746781211,
	"42.5": 0.80280389,
	"3.0": 0.215732470,
	"13.0": 0.481684950,
	"23.0": 0.640652950,
	"33.0": 0.749761040,
	"43.0": 0.805300010,
	"3.5": 0.236572661,
	"13.5": 0.490855800,
	"23.5": 0.6475809666,
	"33.5": 0.752729087,
	"43.5": 0.80780387,
	"4.0": 0.255720050,
	"14.0": 0.499858440,
	"24.0": 0.654435630,
	"34.0": 0.755685510,
	"44.0": 0.810300010,
	"4.5": 0.273530381,
	"14.5": 0.508701765,
	"24.5": 0.661214806,
	"34.5": 0.758630378,
	"44.5": 0.81280384,
	"5.0": 0.290249880,
	"15.0": 0.517393950,
	"25.0": 0.667934000,
	"35.0": 0.761563840,
	"45.0": 0.815300010,
	"5.5": 0.306057377,
	"15.5": 0.525942511,
	"25.5": 0.674577537,
	"35.5": 0.764486065,
	"45.5": 0.81780382,
	"6.0": 0.321087600,
	"16.0": 0.534354330,
	"26.0": 0.681164920,
	"36.0": 0.767397170,
	"46.0": 0.820300010,
	"6.5": 0.335445036,
	"16.5": 0.542635767,
	"26.5": 0.687680648,
	"36.5": 0.770297266,
	"46.5": 0.8228038,
	"7.0": 0.349212680,
	"17.0": 0.550792690,
	"27.0": 0.694143650,
	"37.0": 0.773186500,
	"47.0": 0.825300010,
	"7.5": 0.362457751,
	"17.5": 0.558830576,
	"27.5": 0.700538673,
	"37.5": 0.776064962,
	"47.5": 0.82780378,
	"8.0": 0.375235590,
	"18.0": 0.566754520,
	"28.0": 0.706884210,
	"38.0": 0.778932750,
	"48.0": 0.830300010,
	"8.5": 0.387592406,
	"18.5": 0.574569153,
	"28.5": 0.713164996,
	"38.5": 0.781790055,
	"48.5": 0.83280375,
	"9.0": 0.399567280,
	"19.0": 0.582278910,
	"29.0": 0.719399090,
	"39.0": 0.784636970,
	"49.0": 0.835300010,
	"9.5": 0.411193551,
	"19.5": 0.589887917,
	"29.5": 0.725571552,
	"39.5": 0.787473578,
	"49.5": 0.83780373,
	"10.0": 0.422500010,
	"20.0": 0.597400010,
	"30.0": 0.731700000,
	"40.0": 0.790300010,
	"50.0": 0.840300010,
	"10.5": 0.432926419,
	"20.5": 0.604818814,
	"30.5": 0.734741009,
	"40.5": 0.79280394,
	"50.5": 0.84280371,
	"51.0": 0.845300010
}

const fourStarIVs = {
	attack: 15,
	defense: 15,
	stamina: 15
}

const calculate4StarCP = (pokemon: Pokemon, level: number): number => {
	const levelStr = level.toFixed(1);
	if (!(levelStr in levelScalar)) {
		throw new Error(`Level ${level} is not valid`);
	}
	const scalar = levelScalar[levelStr];

	const totalAttack = pokemon.stats.attack + fourStarIVs.attack;
	const totalDefense = pokemon.stats.defense + fourStarIVs.defense;
	const totalStamina = pokemon.stats.stamina + fourStarIVs.stamina;



	const cp = (totalAttack * Math.sqrt(totalDefense) * Math.sqrt(totalStamina) * (scalar ** 2)) / 10
	return Math.max(10, Math.floor(cp));
}

const calculate4StarCPStats = (pokemon: Pokemon): CPStats => {
	const cpStats: CPStats = {
		raid: calculate4StarCP(pokemon, levels.raid),
		raidWeatherBoosted: calculate4StarCP(pokemon, levels.raidWeatherBoosted),
		research: calculate4StarCP(pokemon, levels.research),
		eggs: calculate4StarCP(pokemon, levels.eggs)
	};
	return cpStats;
}

export { type CPStats, calculate4StarCPStats };

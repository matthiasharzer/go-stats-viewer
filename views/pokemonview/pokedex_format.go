package pokemonview

type PokedexTranslation struct {
	English string `json:"English"`
	German  string `json:"German"`
}

type PokedexType struct {
	Type  string             `json:"type"`
	Names PokedexTranslation `json:"names"`
}

type PokedexStats struct {
	Attack  int `json:"attack"`
	Defense int `json:"defense"`
	Stamina int `json:"stamina"`
}

type PokedexAssets struct {
	Image      string `json:"image"`
	ShinyImage string `json:"shinyImage"`
}

type PokedexPokemon struct {
	ID            string             `json:"id"`
	DexNr         int                `json:"dexNr"`
	Generation    int                `json:"generation"`
	Names         PokedexTranslation `json:"names"`
	Stats         PokedexStats       `json:"stats"`
	PrimaryType   PokedexType        `json:"primaryType"`
	SecondaryType PokedexType        `json:"secondaryType"`
	Assets        PokedexAssets      `json:"assets"`
}

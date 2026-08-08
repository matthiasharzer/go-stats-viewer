package pokedex

type ResponseTranslation struct {
	English string `json:"en"`
	German  string `json:"de"`
}

type ResponseType struct {
	Type  string              `json:"type"`
	Names ResponseTranslation `json:"names"`
}

type ResponseStats struct {
	Attack  int `json:"attack"`
	Defense int `json:"defense"`
	Stamina int `json:"stamina"`
}

type ResponseAssets struct {
	Image      string `json:"image"`
	ShinyImage string `json:"shiny_image"`
}

type ResponsePokemon struct {
	ID            string              `json:"id"`
	DexNr         int                 `json:"dex_nr"`
	Generation    int                 `json:"generation"`
	Names         ResponseTranslation `json:"names"`
	Stats         ResponseStats       `json:"stats"`
	PrimaryType   ResponseType        `json:"primary_type"`
	SecondaryType *ResponseType       `json:"secondary_type,omitempty"`
	Assets        ResponseAssets      `json:"assets"`
}

type Response struct {
	Pokedex []ResponsePokemon `json:"pokedex"`
}

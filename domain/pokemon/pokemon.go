package pokemon

type Translation struct {
	English string
	German  string
}

type Type struct {
	Type  string
	Names Translation
}

type Stats struct {
	Attack  int
	Defense int
	Stamina int
}

type Assets struct {
	Image      string
	ShinyImage string
}

type Pokemon struct {
	ID            string
	DexNr         int
	Generation    int
	Names         Translation
	Stats         Stats
	PrimaryType   Type
	SecondaryType Type
	Assets        Assets
}

func (p Pokemon) Hash() string {
	return p.ID
}

package pokedex

import (
	"encoding/json"
	"net/http"

	"github.com/matthiasharzer/go-stats-viewer/domain/pokemon"
	"github.com/matthiasharzer/go-stats-viewer/view"
)

func Handler(pokedexView view.ReadOnlyView[pokemon.Pokemon]) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var responsePokeDex []ResponsePokemon

		for p, err := range pokedexView.All() {
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			responsePokeDex = append(responsePokeDex, ResponsePokemon{
				ID:         p.ID,
				DexNr:      p.DexNr,
				Generation: p.Generation,
				Assets: ResponseAssets{
					Image:      p.Assets.Image,
					ShinyImage: p.Assets.ShinyImage,
				},
				Names: ResponseTranslation{
					English: p.Names.English,
					German:  p.Names.German,
				},
				Stats: ResponseStats{
					Attack:  p.Stats.Attack,
					Defense: p.Stats.Defense,
					Stamina: p.Stats.Stamina,
				},
				PrimaryType: ResponseType{
					Type: p.PrimaryType.Type,
					Names: ResponseTranslation{
						English: p.PrimaryType.Names.English,
						German:  p.PrimaryType.Names.German,
					},
				},
				SecondaryType: ResponseType{
					Type: p.SecondaryType.Type,
					Names: ResponseTranslation{
						English: p.SecondaryType.Names.English,
						German:  p.SecondaryType.Names.German,
					},
				},
			})
		}

		response := Response{
			Pokedex: responsePokeDex,
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		err := json.NewEncoder(w).Encode(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

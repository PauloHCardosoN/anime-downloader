import { Action } from "redux";
import { Anime } from "../../controllers/AnimesController";

const INITIAL_STATE: Anime[] = [];


interface Favorite extends Action<'FAVORITE_ANIME'>{
  payload: {
    anime: Anime
  }
};
interface Unfavorite extends Action<'UNFAVORITE_ANIME'>{
  payload: {
    id: string
  }
};

type ActionInterface = Favorite | Unfavorite;

function reducer(state = INITIAL_STATE, action: ActionInterface): typeof INITIAL_STATE {
  switch (action.type) {
    case 'FAVORITE_ANIME': {
      if(!state.some(anime => anime.id === action.payload.anime.id)){
        return [...state, action.payload.anime];
      } else {
        return state;
      }
    }
    case 'UNFAVORITE_ANIME': {
      const { id } = action.payload;
      const animesList = state.filter(anime => anime.id !== id);

      return animesList;
    }
    default: {
      return state;
    }
  }
}

export default reducer;
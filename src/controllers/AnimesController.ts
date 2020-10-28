import { stringify, ParsedUrlQueryInput } from 'querystring';

export interface AnimeResponse{
  "Id": string,
  "Nome": string,
  "Desc": string,
  "Status":true,
  "Imagem": string,
  "Ano": string,
  "Categoria": string,
  "Rank": number
}

export interface AnimeDBResponse{
  "odata.metadata": string,
  "value": AnimeResponse[],
  "odata.nextLink": string
}

export interface Anime{
  id: string,
  title: string,
  description: string,
  imageUri: string,
  categories: string[]
}

class AnimeController{
  async index(url: RequestInfo, parameters?: ParsedUrlQueryInput){
    url = parameters ? `${url}?${stringify(parameters)}` : url;

    console.log(url)
    const response = await fetch(url);
    const data: AnimeResponse[] | AnimeDBResponse = await response.json();
    const animesResponse = "value" in data ? data.value : data;

    const animes: Anime[] = animesResponse.map(anime => ({
      id: anime.Id,
      title: anime.Nome,
      description: anime.Desc,
      categories: anime.Categoria.split(', '),
      imageUri: anime.Imagem
    }));

    return animes;
  }
}

export default new AnimeController();
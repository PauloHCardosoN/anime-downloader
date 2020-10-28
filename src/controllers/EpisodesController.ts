export interface Episode{
  Id: number,
  Nome: string,
  Data: string
}

export interface EpisodeOption{
  Id: number,
  Nome: string,
  Endereco: string,
  EpisodioEx: null
}

class EpisodesController{
  async index(id: string){
    const response = await fetch(`http://four.zetai.info/api/episodioexes/${id}`);
    const data: Episode[] = await response.json();
    
    return data;
  }

  async show(id: number){
    const response = await fetch(`http://four.zetai.info/api/episodioexes/links?id=${id}`);
    const data: EpisodeOption[] = await response.json();
    
    return data;
  }
}

export default new EpisodesController();
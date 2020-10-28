import { store } from '../store';

export interface Category{
  Id: number,
  Nome: string
}

class CategoriesController{
  async index(){
    const response = await fetch(`http://four.zetai.info/api/categoria`);
    const categories: Category[] = await response.json();

    return categories;
  }
}

export default new CategoriesController();
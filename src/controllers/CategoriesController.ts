import { store } from '../store';

export interface Category{
  Id: number,
  Nome: string
}

class CategoriesController{
  index(){
    const preLoadedCategories = store.getState().categories;

    return new Promise<Category[]>((resolve, reject) => {
      if(preLoadedCategories.length > 0){
        resolve(preLoadedCategories);
      }

      fetch(`http://four.zetai.info/api/categoria`)
        .then(response => response.json())
        .then((data: Category[]) => {
          store.dispatch({
            type: 'SAVE_CATEGORIES',
            payload: {
              categories: data
            }
          });

          resolve(data);
        })
        .catch(reject);
    });
  }
}

export default new CategoriesController();
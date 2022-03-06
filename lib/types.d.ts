interface TypesProps {
  name?: string;
  Bottiglia?: string;
  Calice?: string;
}

interface Ingredient {
  content: string;
}
export interface IFormData {
  name?: string;
  Bottiglia?: string;
  Calice?: string;
  name_english?: string;
  ingredients?: Ingredient[];
  price?: string;
  menuType?: string;
  sort?: string;
  subtitle?: string;
  types: TypesProps[];
  sortOptions?: string[];
  menuType?: string;
  menuTypeOptions?: string[];
}

export interface IPicture {
  pictures: { _id: string; image: string; createdAt: Date }[];
  numberOfPages: number;
  totalPictures: number;
}

export type MenuProps = {
  antipasti: {
    _id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  contorni: {
    _id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  letempure: {
    _id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  secondi: {
    _id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  desserts: {
    _id: string;
    price: string;
    name: string;
    type?: string;
  }[];
  gourmetPizza: {
    _id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];
  pizzaSpeciali: {
    _id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];
  pizzas: {
    _id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];

  cantina: {
    _id: string;
    subtitle: string;
    types: { name: string; Bottiglia: string; Calice: string }[];
    type?: string;
  }[];

  bianche: {
    _id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];
};

type MenuDetails = {
  name: string;
  price: string;
  Bottiglia: string;
  Calice: string;
  name_english: string;
  ingredients: string[];
  typesId: string | string[];
  menuType: string;
};

import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";

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
  pictures: { id: string; image: string; createdAt: Date }[];
  numberOfPages: number;
  totalPictures: number;
}

interface RefreshResult {
  error?: FetchBaseQueryError | undefined;
  data?:
    | {
        token: string;
      }
    | undefined;
  meta?: FetchBaseQueryMeta | undefined;
}

export type UserInfoProps = {
  id: string;
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface AuthState {
  currentUser: UserInfoProps | null;
  error: Error | undefined;
  image?: string;
  categoryOptions?: UserCategory[];
}

export interface AppError extends Error {
  success: boolean;
  message: string;
}

export type GalleryProps = {
  id: string;
  image: string;
  admin?: Partial<UserInfoProps>;
  createdAt: string;
  updatedAt: string;
};

export type MenuProps = {
  antipasti: {
    id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  contorni: {
    id: string;
    name: string;
    name_english: string;
    ingredients?: string[];
    price: string;
    type?: string;
  }[];
  letempure: {
    id: string;
    name: string;
    name_english: string;
    ingredients?: string[];
    price: string;
    type?: string;
  }[];
  secondi: {
    id: string;
    name: string;
    name_english: string;
    ingredients?: string[];
    price: string;
    type?: string;
  }[];
  desserts: {
    id: string;
    price: string;
    name: string;
    ingredients?: string[];
    type?: string;
  }[];
  gourmetPizza: {
    id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];
  pizzaSpeciali: {
    id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];
  pizzas: {
    id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];

  cantina: {
    id: string;
    subtitle: string;
    types: { name: string; Bottiglia: string; Calice: string }[];
    type?: string;
  }[];

  bianche: {
    id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];
};

type MenuItemProps = {
  id: string;
  v?: number;
  name?: string;
  price: string;
  name_english?: string;
  ingredients?: string[];
  subtitle?: string;
  types?: { id?: string; name?: string; Bottiglia?: string; Calice?: string }[];
  type?: string;
  createdAt: string;
  updatedAt: string;
};

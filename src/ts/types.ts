export type userType = {
  name: string;
  login: string;
  password: string;
};
export type taskType = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type configType = {
  PORT: string;
  NODE_ENV: string;
  MONGO_CONNECTION_STRING: string;
  JWT_SECRET_KEY: string;
  AUTH_MODE: boolean;
  LOGGING_LEVEL: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_PORT: number;
};

// export type ColumnType= {
//     id?:string,
//     title:string,
//     order:number
// }

// export type BoardType= {
//     id? :string,
//     title:string,
//     columns:ColumnType[]
// }
export type nullUserType = { userId: null };

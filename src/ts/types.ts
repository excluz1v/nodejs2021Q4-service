export type userType= {
    name:string,
    login:string,
    password:string,
}
export type taskType= {
    id? :string,
    title:string,
    order:number,
    description:string,
    userId:string|null,
    boardId :string|null,
    columnId:string|null,
}

export type configType= {
    PORT: string
    NODE_ENV:  string,
    MONGO_CONNECTION_STRING:  string,
    JWT_SECRET_KEY: string,
    AUTH_MODE:  boolean,
}

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
export type nullUserType={userId:null}

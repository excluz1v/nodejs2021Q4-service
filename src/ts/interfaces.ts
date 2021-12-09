// import { RouteGenericInterface } from "fastify/types/route";

import { RequestGenericInterface } from "fastify";


// export interface IParamstring extends RouteGenericInterface {
//     Params:{
//         userId?:string
//     }
//   }

export interface UserInterface{
    name:string;

    login:string;
  
    password:string;
  
    id:string;
}

export interface TaskInterface{
    id :string,
    title:string,
    order:number,
    description:string,
    userId:string|null,
    boardId :string|null,
    columnId:string|null,
}

export interface requestUserParams extends RequestGenericInterface{
    Params?:{
        userId?:string
    },
    Body?:{
        name: string,
        login: string,
        password: string
    }
}
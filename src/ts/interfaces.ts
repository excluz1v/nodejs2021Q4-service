import { RequestGenericInterface } from "fastify";
import { taskType } from "./types";

export interface UserInterface{
    name:string;
    login:string;
    password:string;
    id:string;
}

export interface ColumnInterface {
    id :string;
    title :string;
    order :number;
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

export interface requestTaskParams extends RequestGenericInterface{
    Params?:{
        boardId?:string,
        taskId?:string
    },
    Body?:taskType
}
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

export interface BoardInterface{
    id:string;
    title:string;
   columns:ColumnInterface[]|[]
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

export interface GetUserReq extends RequestGenericInterface{
    Params:{
        userId:string
    },
}

export interface PostUserReq extends RequestGenericInterface{
    Body:{
        name: string,
        login: string,
        password: string
    }
}

export interface PutUserReq extends RequestGenericInterface{
    Params:{
        userId:string
    },
    Body:{
        name: string,
        login: string,
        password: string
    }
}

export interface GetTasksReqParams extends RequestGenericInterface{
    Params:{
        boardId:string,
    }
}

export interface GetSingleTaskReqParams extends RequestGenericInterface{
    Params:{
        boardId:string,
        taskId:string
    },
}
export interface PostTaskReqParams extends RequestGenericInterface{
    Params:{
        boardId:string,
        taskId:string
    },
    Body:taskType
}

export interface PutBoardReqParams extends RequestGenericInterface{
    Params:{
        boardId:string,
    },
    Body:BoardInterface
}

export interface GetBoardReqParams extends RequestGenericInterface{
    Params:{
        boardId:string,
    }
}

export interface PostBoardReqParams extends RequestGenericInterface{
    Body:BoardInterface
}
// import { RouteGenericInterface } from "fastify/types/route";


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
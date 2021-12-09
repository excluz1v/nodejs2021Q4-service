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

export type nullUserType={userId:null}

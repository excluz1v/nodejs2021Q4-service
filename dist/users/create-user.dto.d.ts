export declare class CreateuserDto {
    readonly name: string;
    readonly password: string;
    readonly login: string;
}
declare const UpdateuserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateuserDto>>;
export declare class UpdateuserDto extends UpdateuserDto_base {
}
export {};

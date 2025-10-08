/**
 * @description User-Service parameters
 */
export interface IUserOptions {
    content: any;
}
export interface IGetUserResponse {
    success: boolean;
    message: string;
    data: IUserOptions;
}

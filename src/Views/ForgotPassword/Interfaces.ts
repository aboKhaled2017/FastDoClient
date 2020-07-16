export interface IForgotPassword_Errors{
    Email?:string[],
    G?:string
}
export interface IResetPassword_Errors{
    Email?:string[],
    NewPassword?:string[]
    Code?:string[]
    G?:string
}
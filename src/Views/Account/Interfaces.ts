export interface IChangeEmailErrors{
    NewEmail?:string[]
    G?:string
}
export interface IChangePhoneErrors{
    NewPhone?:string[]
    G?:string
}
export interface IConfirmEmailChangeErrors{
    NewEmail?:string[]
    Code?:string[]
    G?:string
}
export interface IChangePasswordErrors{
    OldPassword?:string[]
    NewPassword?:string[]
    ConfirmPassword?:string[]
    G?:string
}
export interface IConfirmEmailErrors{
    Email?:string[]
    Code?:string[]
    G?:string
}
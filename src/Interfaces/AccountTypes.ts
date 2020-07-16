//for signup data
export interface IPh_Signup_Step1
{
    name:string
    mgrName:string
    ownerName:string
    cityId:number
    areaId:number
}
/*export interface IPh_Signup_Step2
{
    commerialRegImg:File 
    licenseImg:File
}*/
export interface IPh_Signup_Step2{
    data:FormData
}
export interface IPh_Signup_Step3
{
    persPhone:string
    linePhone:string
    address:string
}
export interface IPh_Signup_Step4
{
    email:string
    password:string
    confirmPassword:string
}

//for signup error
export interface IPh_Signup_Step1_Error
{
    Name?:string[],
    MgrName?:string[],
    OwnerName?:string[],
    CityId?:string[],
    AreaId?:string[],
    G?:string[]
}
export interface IPh_Signup_Step2_Error
{
    CommerialRegImg?:string[] 
    LicenseImg?:string[],
    G?:string[]
}
export interface IPh_Signup_Step3_Error
{
    PersPhone?:string[],
    LinePhone?:string[],
    Address?:string[],
    G?:string[]
}
export interface IPh_Signup_Step4_Error
{
    Email?:string[],
    Password?:string[],
    ConfirmPassword?:string[],
    G?:string
}

//for signup data
export interface IStk_Signup_Step1
{
    name:string
    mgrName:string
    ownerName:string
    cityId:number
    areaId:number
}
export interface IStk_Signup_Step2
{
    data:FormData
}
export interface IStk_Signup_Step3
{
    persPhone:string
    linePhone:string
    address:string
}
export interface IStk_Signup_Step4
{
    email:string
    password:string
    confirmPassword:string
}

//for signup erros
//for signup error
export interface IStk_Signup_Step1_Error
{
    Name?:string[]
    MgrName?:string[]
    OwnerName?:string[]
    CityId?:string[]
    AreaId?:string[]
    G?:string
}
export interface IStk_Signup_Step2_Error
{
    CommerialRegImg?:string[] 
    LicenseImg?:string[],
    G?:string
}
export interface IStk_Signup_Step3_Error
{
    PersPhone?:string[],
    LinePhone?:string[],
    Address?:string[],
    G?:string[]
}
export interface IStk_Signup_Step4_Error
{
    Email?:string[],
    Password?:string[],
    ConfirmPassword?:string[],
    G?:string
}


export interface IPh_SignUp_Form extends 
IPh_Signup_Step1,IPh_Signup_Step2,
IPh_Signup_Step3,IPh_Signup_Step4{}
export interface IStk_SignUp_Form extends 
IStk_Signup_Step1,IStk_Signup_Step2,
IStk_Signup_Step3,IStk_Signup_Step4{}

export interface IPh_SignUp_Errors{
    Name?:string[],
    MgrName?:string[],
    OwnerName?:string[],
    CityId?:string[],
    AreaId?:string[],
    CommerialRegImg?:string[] 
    LicenseImg?:string[],
    PersPhone?:string[],
    LinePhone?:string[],
    Address?:string[],
    Email?:string[],
    Password?:string[],
    ConfirmPassword?:string[]
    G?:string
}
export interface IStk_SignUp_Errors{
    Name?:string[],
    MgrName?:string[],
    OwnerName?:string[],
    CityId?:string[],
    AreaId?:string[],
    CommerialRegImg?:string[] 
    LicenseImg?:string[],
    PersPhone?:string[],
    LinePhone?:string[],
    Address?:string[],
    Email?:string[],
    Password?:string[],
    ConfirmPassword?:string[]
    G?:string
}
export enum E_UserType{
    pharmacier,
    stocker
}
export interface ILoginData{
    email:string
    password:string 
    userType:E_UserType
}
export interface ILogin_Errors{
    Email?:string[]
    Password?:string []
    G?:string
}

export interface I_Ph_SignUp_Errors{
    Step1_Errors:IPh_Signup_Step1_Error
    Step2_Errors:IPh_Signup_Step2_Error
    Step3_Errors:IPh_Signup_Step3_Error
    Step4_Errors:IPh_Signup_Step4_Error
    All_Form_Errors:IPh_SignUp_Errors
}
export interface I_Stk_SignUp_Errors{
    Step1_Errors:IStk_Signup_Step1_Error
    Step2_Errors:IStk_Signup_Step2_Error
    Step3_Errors:IStk_Signup_Step3_Error
    Step4_Errors:IStk_Signup_Step4_Error
    All_Form_Errors:IStk_SignUp_Errors
}
export interface I_SignUp_Errors{
    Ph_SignUp_Errors:I_Ph_SignUp_Errors
    Stk_SignUp_Errors:I_Stk_SignUp_Errors
}
export interface I_UI_Errors{
    signUp_Errors:I_SignUp_Errors
    loginErrors:ILogin_Errors
}
export interface ICurrentUserIdentifier{
    id:string 
    username:string 
    email:string 
    name:string
    persPhone:string 
    landlinePhone:string 
    emailConfirmed:boolean
    userType:E_UserType
}
export interface ITokenIdentifier{
    token:string
    expiry:number
}
export interface IUserIdentity{
    user:ICurrentUserIdentifier
    accessToken:ITokenIdentifier
}
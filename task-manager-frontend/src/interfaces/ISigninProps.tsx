// Param Interface
interface IUserParam {
    emailAddress: string;
    password: string;
}

// Function Types
type MyFunctionType = (param: IUserParam) => void;

// Signin Props Interface
export interface ISigninProps {
    login: MyFunctionType
};
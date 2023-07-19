// Param Interface
interface IUserParam {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
}

// Function Type
type MyFunctionType = (param: IUserParam) => void;

// Signup Props Interface
export interface ISignupProps {
    register: MyFunctionType;
};
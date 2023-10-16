export interface IRegisterPayload {
    email: string;
    password: string;
}

export interface IRegisterResponseData {
    access_token: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface ILoginResponseData {
    access_token: string;
}

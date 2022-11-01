
export interface IChirp {
    id?: number;
    userid?: number;
    content: string;
    location: string;
    _created?: Date | string;
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    _created?: Date | string;
}
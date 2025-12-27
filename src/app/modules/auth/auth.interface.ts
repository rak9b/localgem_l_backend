export type IUser = {
    email: string;
    name: string;
    password: string;
    avatar?: string | null;
};

export type ILoginUser = Pick<IUser, 'email' | 'password'>;

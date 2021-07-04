import React, { createContext, ReactNode, useContext, useState } from 'react';

type User = {
	id: string;
	username: string;
	firstName: string;
	avatar: string;
	email: string;
	token: string;
};

type AuthContextData = {
	user: User;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({
    id: '1',
    username: 'caio',
    firstName: 'caio',
    avatar: 'caio',
    email: 'caio',
    token: 'caio',
  } as User);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	return context;
}

export { AuthProvider, useAuth };

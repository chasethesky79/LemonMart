export interface IAuthStatus {
    isAuthenticated: boolean;
    userRole: string;
    userId: string;
}

export interface IServerAuthResponse {
    accessToken: string;
}

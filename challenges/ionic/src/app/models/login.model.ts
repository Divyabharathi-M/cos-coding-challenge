export interface AuthenticationRequest {
    password: string,
    meta: string
}

export interface AuthenticationResult {
    token: string,
    authenticated: boolean,
    userId: string,
    internalUserId: number,
    internalUserUUID: string,
    type: number,
    privileges: string
}

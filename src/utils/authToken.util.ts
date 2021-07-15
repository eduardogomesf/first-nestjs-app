import { sign, verify } from 'jsonwebtoken';

interface ICreateAuthTokenPayload {
    id: string;
}

interface ITokenPayload extends ICreateAuthTokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

class AuthTokenUtil {
    generateAuthToken(payload: ICreateAuthTokenPayload): string {
        const token = sign(payload, process.env.AUTH_TOKEN_SECRET, {
            expiresIn: '3d',
            subject: payload.id,
        });

        return token;
    }

    getAuthTokenPayload(token: string): ITokenPayload {
        const payload = verify(token, process.env.AUTH_TOKEN_SECRET);

        const { exp, sub, iat, id } = payload as ITokenPayload;

        return { exp, sub, iat, id };
    }
}

export { AuthTokenUtil };

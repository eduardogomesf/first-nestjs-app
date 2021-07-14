import { hash, compare } from 'bcrypt';

class PasswordUtil {
    async generatePasswordHash(password: string): Promise<string> {
        const passwordHash = await hash(password, 3);

        return passwordHash;
    }

    async comparePasswordHash(
        password: string,
        passwordHash: string,
    ): Promise<boolean> {
        const isPasswordValid = await compare(password, passwordHash);

        return isPasswordValid;
    }
}

export { PasswordUtil };

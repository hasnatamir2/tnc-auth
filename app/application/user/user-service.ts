import AuthLoginDTO from "./auth-login-dto";
import AuthRegisterDTO from "./auth-register-dto";
import AuthUpdatePasswordDTO from "./auth-update-password-dto";
import AuthForgotPasswordDTO from "./auth-forgot-password-dto";
import UserListDTO from "./user-list-dto";
import UserAgeDTO from "./user-age-dto";
import HttpError from "@infra/errors/http-exception";
import IUserRepository from "@domain/entities/user/Iuser-repository";
import AuthInfraService from "@infra/services/auth-service";
import { injectable, inject } from "tsyringe";

@injectable()
class UserService {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        private authInfraService: AuthInfraService
    ) {}

    login = async (authLoginDTO: AuthLoginDTO) => {
        const userResult = await this.userRepository.getByEmail(
            authLoginDTO.getEmail()
        );

        if (userResult.isNone()) {
            throw new HttpError(400, "Invalid email or password");
        }
        const user = userResult.unwrap();
        const isValid = await this.authInfraService.verifyPassword(
            authLoginDTO.getPassword(),
            user.password
        );
        if (!isValid) {
            throw new HttpError(400, "Invalid email or password");
        }

        const token = await this.authInfraService.signJWT({
            id: user.id,
            email: user.email,
        });
        const refreshToken = await this.authInfraService.refreshJWT({
            id: user.id,
            email: user.email,
        });

        return { user, token, refreshToken };
    };

    getRefreshToken = async (refreshToken: string) => {
        console.log(refreshToken);
        const decoded: any = await this.authInfraService.decodeRefreshJWT(
            refreshToken
        );
        if (!decoded) {
            throw new HttpError(400, "Invalid refresh token");
        }
        const userResult = await this.userRepository.getById(
            decoded.id as string
        );
        if (userResult.isNone()) {
            throw new HttpError(400, "Invalid refresh token!!");
        }
        const user = userResult.unwrap();
        const token = await this.authInfraService.signJWT({
            id: user.id,
            email: user.email,
        });
        const newRefreshToken = await this.authInfraService.refreshJWT({
            id: user.id,
            email: user.email,
        });
        return { user, token, refreshToken: newRefreshToken };
    };

    register = async (authRegisterDTO: AuthRegisterDTO) => {
        const userResult = await this.userRepository.getByEmail(
            authRegisterDTO.getEmail()
        );
        if (!userResult.isNone())
            throw new HttpError(400, "Email already exists");
        const hash = await this.authInfraService.hashPassword(
            authRegisterDTO.getPassword()
        );
        authRegisterDTO.getUser().setPassword(hash);
        await this.userRepository.add(authRegisterDTO.getUser());
        return authRegisterDTO.getUser();
    };

    getAll = async (userListDTO: UserListDTO) => {
        const result = await this.userRepository.getAll({
            paginationOptions: userListDTO.getPaginationOptions(),
            query: userListDTO.getQuery(),
        });
        return result;
    };

    getAge = async (userAgeDTO: UserAgeDTO) => {
        const userResult = await this.userRepository.getById(
            userAgeDTO.getId()
        );
        if (userResult.isNone()) {
            throw new HttpError(400, "User not found");
        }
        const result = await this.userRepository.calculateAge(
            userAgeDTO.getId()
        );
        const age = await result.unwrap();
        return age[0];
    };
}

export default UserService;

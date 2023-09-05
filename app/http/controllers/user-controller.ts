import "reflect-metadata";
import AuthLoginDTO from "@application/user/auth-login-dto";
import AuthRegisterDTO from "@application/user/auth-register-dto";
import UserListDTO from "@application/user/user-list-dto";
import UserAgeDTO from "@application/user/user-age-dto";
import AuthService from "@application/user/user-service";
import { injectable } from "tsyringe";
import container from "@infra/di-container";

const authService = container.resolve(AuthService);

@injectable()
class UserController {
    login = async (request) => {
        const { email, password } = request.body;

        const authLoginDTO = new AuthLoginDTO(email, password);

        const response = await authService.login(authLoginDTO);

        return {
            body: { status: "success", data: response },
        };
    };

    register = async (request) => {
        const authRegisterDTO = new AuthRegisterDTO(request.body);

        const response = await authService.register(authRegisterDTO);

        return {
            body: { status: "success", data: response },
        };
    };

    refreshToken = async (request) => {
        const { refreshToken } = request.body;

        const response = await authService.getRefreshToken(refreshToken);

        return {
            body: { status: "success", data: response },
        };
    }

    getAll = async (request) => {
        const userListDTO = new UserListDTO(request.query);

        const response = await authService.getAll(userListDTO);

        return {
            body: { status: "success", data: response },
        };
    };

    getAge = async (request) => {
        const userAgeDTO = new UserAgeDTO(request);

        const response = await authService.getAge(userAgeDTO);

        return {
            body: { status: "success", data: response },
        };
    };
}

export default UserController;

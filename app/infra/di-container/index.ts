import { container } from "tsyringe";

import UserRepository from "@infra/repository/user-repository";

container.register("IUserRepository", { useClass: UserRepository });

export default container;

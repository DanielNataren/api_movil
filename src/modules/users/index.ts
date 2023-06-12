import UserApplication from './application/user.application';
import UserInfrastructure from './infrastructure/user.infrastructure';
import UserController from './interface/http/controller';
import UserRouter from './interface/http/router';

const userInfrastructure:UserInfrastructure = new UserInfrastructure();
const userApplication : UserApplication = new UserApplication(userInfrastructure);
const controller: UserController = new UserController(userApplication);
const userRouter: UserRouter = new UserRouter(controller);

export default userRouter;
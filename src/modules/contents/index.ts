import ContentApplication from "./application/content.application";
import ContentInfrastructure from "./infrastructure/content.infrastructure";
import ContentController from "./interface/controller";
import ContentRouter from "./interface/router";


const contentI: ContentInfrastructure = new ContentInfrastructure();
const contentApp: ContentApplication =  new ContentApplication(contentI);
const controller: ContentController = new ContentController(contentApp);
const contentRouter: ContentRouter = new ContentRouter(controller);

export default contentRouter;
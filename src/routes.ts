import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/GetLast3MessagesController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
	"/messages",
	ensuredAuthenticated,
	new CreateMessageController().handle
);

router.get("/messages/last3", new Get3LastMessagesController().handle);

export { router };

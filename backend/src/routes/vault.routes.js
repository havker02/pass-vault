import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createSecret } from "../controllers/vault.controller.js"

const router = Router()

router.route("/create").post(verifyJWT, createSecret)


export default router
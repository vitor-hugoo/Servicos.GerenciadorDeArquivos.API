import { Request, Response, Router } from "express";

const healthRouter = Router()

healthRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: `Server is healthy`})
})

export default healthRouter
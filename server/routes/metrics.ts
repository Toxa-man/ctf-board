import { Router } from "express";
import { wrapper } from "./middleware";
import { collectDefaultMetrics, register } from "prom-client";

const router = Router();

collectDefaultMetrics();

router.get('/', (req, res) => {
    wrapper(res, async () => {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    });
})

export default router;
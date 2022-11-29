const express = require('express');
const jsonParser = express.json({type: '*/*'});
const router = express.Router();
router.use(jsonParser);

router.get('/health', async (_req, res, _next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
});

module.exports = router;
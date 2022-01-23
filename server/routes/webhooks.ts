
import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";
import config from '../config_loader'

const webhooks = new Webhooks({
    secret: config.webhookSecret,
});

webhooks.on('push', event => {
    console.log("AAAAA", event.payload.ref);
    if (event.payload.ref === 'master') {
        console.log('start deplyment');
    }
});

export default createNodeMiddleware(webhooks, {path: '/webhooks'});
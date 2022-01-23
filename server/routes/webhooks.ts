
import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";

const webhooks = new Webhooks({
    secret: "secctfhook",
});

webhooks.on('push', event => {
    console.log("AAAAA", event.payload.ref);
    if (event.payload.ref === 'master') {
        console.log('start deplyment');
    }
});

export default createNodeMiddleware(webhooks, {path: '/webhooks'});
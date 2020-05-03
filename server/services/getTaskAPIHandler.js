const proyect = process.env.PROYECT_NAME;
const location = process.env.QUEUE_LOCATION;
const name = process.env.QUEUE_NAME;

const {
    GoogleAuth
} = require('google-auth-library');

const {
    google
} = require('googleapis');

const cloudtasks = google.cloudtasks('v2');

async function getTask() {
    const authClient = await authorize();
    const request = {
        parent: `projects/${proyect}/locations/${location}/queues/${name}`,
        auth: authClient,
    };

    let response;
    do {
        if (response && response.nextPageToken) {
            request.pageToken = response.nextPageToken;
        }
        response = (await cloudtasks.projects.locations.queues.tasks.list(request)).data;
        const tasksPage = response.tasks;
        if (tasksPage) {
            return tasksPage
        }
    } while (response.nextPageToken);
}

async function authorize() {
    const auth = new GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    return await auth.getClient();
}

module.exports = getTask
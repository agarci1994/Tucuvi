const project = process.env.PROYECT_NAME
const location = process.env.QUEUE_LOCATION
const name = process.env.QUEUE_NAME
const urlDefault = process.env.FUNCTION_URL
const email = process.env.SERVICE_ACCOUNT_EMAIL

const createHttpTaskWithToken = async ({
    idTask,
    urlTask,
    timeTask
}) => {
    const payload = {
        idTask,
        urlTask
    }
    const date = new Date(timeTask)

    const {
        CloudTasksClient
    } = require('@google-cloud/tasks');

    const client = new CloudTasksClient();
    
    const url = payload.urlTask ? payload.urlTask : urlDefault

    const parent = client.queuePath(project, location, name);
    const convertedPayload = JSON.stringify(payload);
    const body = Buffer.from(convertedPayload).toString('base64');

    const task = {
        httpRequest: {
            id: payload.idTask,
            date,
            httpMethod: 'POST',
            url,
            oidcToken: {
                serviceAccountEmail: email,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        },
    };

    try {
        const [response] = await client.createTask({
            parent,
            task
        });
        console.log(`Created task ${response.name}`);
        return response.name;
    } catch (error) {
        console.error(Error(error.message));
    }
};

module.exports = createHttpTaskWithToken;
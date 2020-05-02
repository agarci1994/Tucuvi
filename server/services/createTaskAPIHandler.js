const project = process.env.PROYECT_NAME
const location = process.env.QUEUE_LOCATION
const name = process.env.QUEUE_NAME
const urlDefault = process.env.FUNCTION_URL
const email = process.env.SERVICE_ACCOUNT_EMAIL

const createHttpTaskWithToken = async ({
    idTask,
    urlTask,
    timeTask,
    csv
}) => {

    const url = urlTask ? urlTask : urlDefault
    const listTask = {}
    let date

    if (csv) {
        csv.forEach((elm, i) => {
            listTask[i] = {
                payload: {
                    idTask: elm[0]
                },
                date: new Date(elm[1])
            }
        })

    } else {
        date = new Date(timeTask)
        payload = {
            idTask
        }
    }

    const {
        CloudTasksClient
    } = require('@google-cloud/tasks');

    const client = new CloudTasksClient();

    const parent = client.queuePath(project, location, name);
    const convertedPayload = JSON.stringify(payload);
    const body = Buffer.from(convertedPayload).toString('base64');


    const task = {
        httpRequest: {
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
        scheduleTime: {
            seconds: date.getTime() / 1000
        }
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
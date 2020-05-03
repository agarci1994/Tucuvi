const project = process.env.PROYECT_NAME;
const location = process.env.QUEUE_LOCATION;
const name = process.env.QUEUE_NAME;
const urlDefault = process.env.FUNCTION_URL;
const email = process.env.SERVICE_ACCOUNT_EMAIL;

const createHttpTaskWithToken = async ({ idTask, urlTask, timeTask, csv }) => {
  const url = urlTask ? urlTask : urlDefault;
  const listForm = {0: {payload: "", date: ""}};

  if (csv) {
    csv.forEach((elm, i) => {
      listForm[i] = {
        payload: {
          idTask: elm[0],
        },
        date: new Date(elm[1]),
      };
    });
  } else {
    listForm[0].date = new Date(timeTask);
    listForm[0].payload = {
      idTask,
    };
  }

  const { CloudTasksClient } = require("@google-cloud/tasks")

  const client = new CloudTasksClient()

  const parent = client.queuePath(project, location, name)


Object.keys(listForm).forEach(elm => {

      const convertedPayload = JSON.stringify(listForm[elm].payload)
      const body = Buffer.from(convertedPayload).toString("base64")

      const task = {
        httpRequest: {
          httpMethod: "POST",
          url,
          oidcToken: {
            serviceAccountEmail: email,
          },
          headers: {
            "Content-Type": "application/json",
          },
          body,
        },
        scheduleTime: {
          seconds: listForm[elm].date.getTime() / 1000,
        },
      }
 
      client.createTask({
        parent,
        task,
      })
      .then(response => console.log(`Create Task with name: ${response[0].name}`))
      .catch (error => console.error(Error(error.message)))
})

};

module.exports = createHttpTaskWithToken;

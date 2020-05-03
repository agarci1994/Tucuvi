const {
  GoogleAuth
} = require('google-auth-library');
const getTask = require('../services/getTaskAPIHandler')

const proyect = process.env.PROYECT_NAME;
const location = process.env.QUEUE_LOCATION;
const name = process.env.QUEUE_NAME;
const urlDefault = process.env.FUNCTION_URL;
const email = process.env.SERVICE_ACCOUNT_EMAIL;


const createHttpTaskWithToken = async ({
  idTask,
  urlTask,
  timeTask,
  csv
}) => {
  const url = urlTask ? urlTask : urlDefault;
  const listForm = {
    0: {
      payload: "",
      date: ""
    }
  };

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

  const {
    CloudTasksClient
  } = require("@google-cloud/tasks")

  const client = new CloudTasksClient()

  const parent = client.queuePath(proyect, location, name)

  let listTaskInQueue

  getTask()
    .then(response => {

      const times = response.map(elm => new Date(elm.scheduleTime).getTime() / 1000).sort()

      Object.keys(listForm).forEach(elm => {

        let seconds = listForm[elm].date.getTime() / 1000

        const interval = times.find(timesInQueue => timesInQueue < (seconds + 180) || timesInQueue > (seconds - 180))
        if (interval.length) {
          seconds += 180
        }
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
            seconds
          },
        }

        client.createTask({
            parent,
            task,
          })
          .then(response => console.log(`Create Task with name: ${response[0].name}`))
          .catch(error => console.error(Error(error.message)))
      })




    })
    .catch(err => console.log(err))


};

module.exports = createHttpTaskWithToken;
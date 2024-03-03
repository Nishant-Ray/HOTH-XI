import { Express } from "express";
import bodyParser from 'body-parser';
import { testRouter } from "./routes/testRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { localIPAddress, portNum } from "./serverConfig.js";

// Port that the server API is listening to
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
// When calling routes inside of these router files call it as such "http://${address}:${port}/test/"
// You have to specify the specific sub-router you want to access and then call the routes in that sub-router
app.use("/test", testRouter);
app.use("/user", userRouter);

const portNum = 8000;
const hostName = "localhost";

const server = app.listen(portNum, hostName, async () => {
  const { port } = server.address();
  // const ipAddress = await getLocalIP(); // Assuming getLocalIP is an async function

  console.log(`Server running at http://${hostName}:${port}`);
});
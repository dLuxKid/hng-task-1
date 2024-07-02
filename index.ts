import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import requestIp from "request-ip";

const app: Application = express();
dotenv.config({ path: "./config.env" });
app.set("trust proxy", true);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Hello");
});

app.get("/api/hello", async (req: Request, res: Response) => {
  try {
    const { visitor_name } = req.query;
    const name = visitor_name || "Anonymous";

    const clientIp = requestIp.getClientIp(req);
    console.log(clientIp, req.socket.remoteAddress, req.ip);

    // const { ipAddress } = await (
    //   await fetch("https://api.db-ip.com/v2/free/self")
    // ).json();

    // const geoResponse = await (
    //   await fetch(`https://ipapi.co/${ipAddress}/city`)
    // ).text();

    const data = await (
      await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.weatherapikey}&q=${clientIp}`
      )
    ).json();

    console.log(data);

    const temp = data.current.temp_c;

    res.status(200).json({
      client_ip: clientIp,
      location: data.location.name,
      greeting: `Hello ${name}, the temperature is ${temp} degrees Celcius in ${data.location.name}`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json(
        "Error fetching your IP address details, ensure you are not on a private network and try again."
      );
  }
});

app.use("*", (req: Request, res: Response) =>
  res.status(404).json(`Can't find ${req.originalUrl} on this server`)
);

app.listen(4000, () => {
  console.log("hello from server side");
});

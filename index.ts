import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";

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

    const { ipAddress } = await (
      await fetch("https://api.db-ip.com/v2/free/self")
    ).json();

    const geoResponse = await (
      await fetch(`https://ipapi.co/${ipAddress}/city`)
    ).text();

    const temperature = await (
      await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.weatherapikey}&q=${ipAddress}`
      )
    ).json();

    const temp = temperature.current.temp_c;

    res.status(200).json({
      client_ip: ipAddress,
      location: geoResponse,
      greeting: `Hello ${name}, the temperature is ${temp} degrees Celcius in ${geoResponse}`,
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

app.listen(8090, () => {
  console.log("hello from server side");
});

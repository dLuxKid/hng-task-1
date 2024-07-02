# HNG 11 TASK 1

This project sets up a basic web server using Node.js and Express. The server provides an API endpoint that returns the client's IP address, geographical location, and a personalized greeting message. The server is deployed on a free hosting platform.

## Features

- Returns the IP address of the requester.
- Determines the geographical location (city) of the requester.
- Responds with a personalized greeting message including the temperature of the requester's location.

## Endpoint

### [GET] `/api/hello`

#### Query Parameters

- `visitor_name` (string): The name of the visitor.

#### Response

```json
{
  "client_ip": "127.0.0.1", // The IP address of the requester
  "location": "New York", // The city of the requester
  "greeting": "Hello, Mark!, the temperature is 11 degrees Celsius in New York" // Personalized greeting with temperature
}
```

## Setup

### Prerequisites

- Node.js and bun installed on your machine.

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Create a `.env` file in the root of the project and add your environment variables:

   ```
   WEATHER_API_KEY=your_weather_api_key
   ```

4. Start the server:

   ```sh
   bun run start
   ```

5. The server will be running at `http://localhost:4000`.

## Deployment

Deploy the server to any free hosting platform (e.g., Heroku, Vercel, etc.). Make sure to configure environment variables on the hosting platform as described in the `.env` file.

## Example Usage

Make a GET request to the following endpoint:

```
https://hng-task-1-production.up.railway.app/api/hello?visitor_name=Mark
```

### Example Response

```json
{
  "client_ip": "127.0.0.1",
  "location": "New York",
  "greeting": "Hello, Mark!, the temperature is 11 degrees Celsius in New York"
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express](https://expressjs.com/)
- [IPAPI](https://ipapi.co/)
- [Weather API](https://www.weatherapi.com/)

import express, { Request, response, Response } from "express";
import pgPromise from "pg-promise";

const app = express();

app.use(express.json());

app.post("/checkin", async (req: Request, res: Response ) => {
  const connection = pgPromise()({
    host: "localhost", 
    port: 5432,
    database: "example_database",
    user: "user",
    password: "password",
  })
  await connection.query("INSERT INTO yansb.parked_car (plate, checkin_date) VALUES ($1, $2)", [req.body.plate, req.body.checkinDate]);
  await connection.$pool.end()
  res.end();
})

app.get("/parked_cars", async (req: Request, res: Response) => {
  const connection = pgPromise()({
    host: "localhost", 
    port: 5432,
    database: "example_database",
    user: "user",
    password: "password",
  })
  const parkedCars = await connection.query("select * from yansb.parked_car where checkout_date is null");
  connection.$pool.end()
  res.json(parkedCars);
})

app.post("/checkout", async (req: Request, res: Response ) => {
  const connection = pgPromise()({
    host: "localhost", 
    port: 5432,
    database: "example_database",
    user: "user",
    password: "password",
  })
  const parkedCar = await connection.one("SELECT * FROM yansb.parked_car WHERE plate = $1", [req.body.plate]);
  if(!parkedCar) {
    res.status(404).send();
  }
  const checkinDate = new Date(parkedCar.checkin_date)
  const checkoutDate = new Date(req.body.checkoutDate)
  console.log(checkinDate, checkoutDate)
  const diff = (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60);
  const price = diff * 10
  await connection.query("UPDATE yansb.parked_car SET checkout_date = $2 where plate = $1", [req.body.plate, req.body.checkoutDate]);
  await connection.$pool.end()
  res.json({
    price,
    period: diff
  });
})

app.listen(3000, () => {console.log("Server is running on port 3000 🚀")});
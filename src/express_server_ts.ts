import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { initDb, pool } from "./db/db.init";

const app: Application = express();
const port = 5000;

//   middleware
app.use(express.json());

// root route

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
  });
});

// post user

app.post("/api/users", async (req: Request, res: Response) => {
  const body = req.body;
  const { name, email, password, role, age } = body;
  const result = await pool.query(
    `INSERT INTO users(name, email, password, role, age)
      VALUES($1, $2, $3, COALESCE($4, 'user'), COALESCE($5, 18))
      RETURNING *
           `,
    [name, email, password, role, age],
  );
  res.status(201).json({
    success: true,
    message: "user created successfully!",
    data: result.rows[0],
  });
});

// get all users

app.get("/api/users",async(req:Request,res:Response)=>{
    const result = await pool.query(`
        SELECT * FROM users
        `)
        console.log(result);
        res.status(200).json({
    success: true,
    message: " all user created successfully!",
    data: result.rows,
  });

})

// single data

app.get("/api/users/:id",async(req: Request, res: Response)=>{
    const id = req.params.id;
    const result = await pool.query(`
        SELECT * FROM users
        WHERE id = $1
        `,[id])

        res.status(201).json({
            success : true,
            message : "single user created successfully",
            data: result.rows[0]

        })
})


app.listen(port, () => {
    initDb()
  console.log(`This server is running in port:${port}`);
});

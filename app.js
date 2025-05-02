import express from 'express'
import cors from 'cors'
import { EmployeeRoutes } from './Routes/EmployeeRoutes.js';


const app = express()
app.use(cors())
app.use(express.json());

app.use('/api/employees',EmployeeRoutes)

export default app;



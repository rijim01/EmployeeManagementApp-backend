import express from 'express'
import cloudinaryFileUploader from '../Middlewares/FileUploader.js'
import { EmployeeControllers } from '../Controllers/EmployeeController.js';

const router = express.Router();

router.get('/:id',EmployeeControllers.getEmployeeById)
router.get('/',EmployeeControllers.getAllEmployees)
router.post('/',cloudinaryFileUploader.single('profileImage'),EmployeeControllers.createEmployee)
router.delete('/:id',EmployeeControllers.deleteEmployeeById)
router.put('/:id',cloudinaryFileUploader.single('profileImage'),EmployeeControllers.updateEmployeeById)



export const EmployeeRoutes = router;
import { EmployeeModel } from "../Models/EmployeeModel.js";

const createEmployee = async (req, res) => {
  try {
    const body = req.body;

    const profileImage = req?.file ? req?.file?.path : null;
    body.profileImage = profileImage;
    const emplye = new EmployeeModel(body);

    await emplye.save();
    res.status(201).json({
      message: "Employee is Created",
      success: true,
      data: emplye,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 4;                        

    const skip = (page - 1) * limit;

    let searchCriteria = {};                                                                                                                                               
    if (search) {
      searchCriteria = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { department: { $regex: search, $options: "i" } },
        ],
      };
    }

    const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

    const employees = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalEmployees / limit);
    res.status(200).json({
      message: "All Employees",
      success: true,
      data: {
        employees: employees,
        pagination: {
          totalEmployees,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await EmployeeModel.findOne({ _id: id });
    res.status(200).json({
      message: "Employee Details",
      success: true,
      data: employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await EmployeeModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Employee Deleted ",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;
    const id = req.params.id;

    let updateData = {
      name,
      email,
      phone,
      department,
      salary,
    };
    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updateEmployee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    res.status(200).json({
      message: "Employee is updated",
      success: true,
      data: updateEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const EmployeeControllers = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
};

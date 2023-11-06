import mongoose from "mongoose"

interface Employee{
    FullName: string
    Degree: string
    Cv: string
    Bio:string
    
}
interface IEmployee extends Employee, mongoose.Document{ }

// const EmployeeSchema=new mongoose
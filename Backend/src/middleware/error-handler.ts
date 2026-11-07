import type {ErrorRequestHandler, RequestHandler} from "express"
import { AppError } from "../errors/app-error.js"
export const errorHandler :ErrorRequestHandler= (err,_req,res,_next)=>{
    if( err instanceof AppError){
        res.status(err.statusCode).json({
            error:{code:err.code, message:err.message}
        })
        return
    }
console.error(err);
res.status(500).json({
    error:{code: "INTERNAL_ERROR" ,message: "Somthing went wrong"}
})

}

export  const  notFound:RequestHandler =(req,_res, next)=>{
    next( new AppError (404,"NOT_FOUND" ,`${req.method} ${req.path} not found `) )
}

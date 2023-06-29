import { response } from "express";
import db from "../models/index";
import bcrypt  from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let bulkCreateSchedule = (data) =>{
    return new Promise((resolve, reject) => {
        try{
            console.log('chrom channnel: data send: ', data)
            resolve('')
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    bulkCreateSchedule: bulkCreateSchedule,
    
  }
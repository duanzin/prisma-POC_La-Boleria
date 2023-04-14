import joi from "joi";
import { Cake } from "../protocols/types.js";

export const cakeSchema = joi.object<Cake>({
  name: joi.string().min(2).required(),
  price: joi.number().greater(0).required(),
  description: joi.string().required(),
  image: joi.string().uri().required(),
});
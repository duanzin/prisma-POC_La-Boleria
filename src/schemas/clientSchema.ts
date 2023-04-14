import joi from "joi";
import { Client } from "../protocols/types.js";

export const clientSchema = joi.object<Client>({
  name: joi.string().required(),
  address: joi.string().required(),
  phone: joi.string().min(10).max(11).required(),
});

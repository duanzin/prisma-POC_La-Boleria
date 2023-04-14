import joi from "joi";
import { Order } from "../protocols/types";

export const orderSchema = joi.object<Order>({
  clientId: joi.number().required(),
  cakeId: joi.number().required(),
  quantity: joi.number().min(1).max(4).required(),
  totalPrice: joi.number().required(),
});

import prisma from "../config/database.js";
import { cakes } from "@prisma/client";
import { Cake } from "../protocols/types.js";

async function getCake(name: string): Promise<cakes>{
  return prisma.cakes.findFirst({
    where: {
      name: name,
    },
  });
}

async function postCake(cake: Cake) {
  prisma.cakes.create({
    data: cake,
  });
}

export default {
  getCake,
  postCake,
};

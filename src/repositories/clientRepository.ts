import prisma from "../config/database.js";
import { Client } from "../protocols/types.js";

export async function postClient(client: Client) {
  prisma.clients.create({
    data: client,
  });
}

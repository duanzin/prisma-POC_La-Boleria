import prisma from "../config/database.js";
import { Order } from "../protocols/types.js";

async function getClient(id: number) {
  return await prisma.clients.findUnique({
    where: {
      id: id,
    },
  });
}

async function getCake(id: number) {
  return await prisma.cakes.findUnique({
    where: {
      id: id,
    },
  });
}

async function postOrder(order: Order) {
  await prisma.orders.create({
    data: order,
  });
}

async function getAllOrders() {
  return await prisma.$queryRaw`SELECT json_build_object('id',clients.id,
                              'name',clients.name,
                              'address',clients.address,
                              'phone',clients.phone) AS client, 
     json_build_object('id',cakes.id,
                      'price',cakes.price,
                      'description',cakes.description,
                      'image',cakes.image) AS cake, 
     orders.id AS "orderId", "createdAt", quantity, "totalPrice" 
     FROM orders JOIN clients ON orders."clientId" = clients.id 
     JOIN cakes ON orders."cakeId" = cakes.id GROUP BY orders.id, clients.id, cakes.id
     ORDER BY orders.id`;
}

async function getOrdersbyDate(date: Date | string) {
  return await prisma.$queryRaw`SELECT json_build_object('id',clients.id,
                              'name',clients.name,
                              'address',clients.address,
                              'phone',clients.phone) AS client, 
            json_build_object('id',cakes.id,
                              'price',cakes.price,
                              'description',cakes.description,
                              'image',cakes.image) AS cake, 
     orders.id AS "orderId", "createdAt", quantity, "totalPrice" 
     FROM orders JOIN clients ON orders."clientId" = clients.id 
     JOIN cakes ON orders."cakeId" = cakes.id 
     WHERE orders."createdAt" = TO_TIMESTAMP(${date},'YYYY-MM-DD')
     GROUP BY orders.id, clients.id, cakes.id ORDER BY orders.id `;
}

async function getOrder(id: number) {
  return await prisma.$queryRaw`SELECT json_build_object('id',clients.id,
                              'name',clients.name,
                              'address',clients.address,
                              'phone',clients.phone) AS client, 
            json_build_object('id',cakes.id,
                              'price',cakes.price,
                              'description',cakes.description,
                              'image',cakes.image) AS cake, 
     orders.id AS "orderId", "createdAt", quantity, "totalPrice" 
     FROM orders JOIN clients ON orders."clientId" = clients.id 
     JOIN cakes ON orders."cakeId" = cakes.id WHERE orders.id = ${id} 
     GROUP BY orders.id, clients.id, cakes.id ORDER BY orders.id`;
}

async function getClientOrders(id: number) {
  return await prisma.$queryRaw`SELECT orders.id AS "orderId", "createdAt", quantity, "totalPrice", cakes.name AS "cakeName"
    FROM orders JOIN cakes ON orders."cakeId" = cakes.id 
	  WHERE orders."clientId" = ${id}`;
}

export default {
  getClient,
  getCake,
  postOrder,
  getAllOrders,
  getOrdersbyDate,
  getOrder,
  getClientOrders,
};

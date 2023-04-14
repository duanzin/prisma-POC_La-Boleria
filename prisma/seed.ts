import prisma from "../src/config/database.js";

async function main() {
  await prisma.cakes.create({
    data: {
      name: "bolo de morango",
      price: 10.0,
      description: "bolo feito de morango",
      image:
        "https://img.cybercook.com.br/receitas/12/bolo-de-morango-3-840x480.jpeg?q=75",
    },
  });
  await prisma.clients.create({
    data: {
      name: "dory",
      address: "P. Sherman, 42 Wallaby Way, Sydney.",
      phone: "32999999999",
    },
  });
  await prisma.orders.create({
    data: {
      clientId: 1,
      cakeId: 1,
      quantity: 1,
      totalPrice: 10.0,
    },
  });
}

main()
  .then(() => {
    console.log("seed successful!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

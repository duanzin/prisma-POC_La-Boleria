import { cakes, clients, orders } from "@prisma/client";

export type Cake = Omit<cakes, "id">;

export type Client = Omit<clients, "id">;

export type Order = Omit<orders, "id" | "createdAt">;

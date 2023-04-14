import cakeRepository from "../repositories/cakeRepository.js";
import { DuplicatedCakeError } from "../errors/index.js";
import { Cake } from "../protocols/types.js";

export async function create(cake: Cake) {
  const cakeExists = await cakeRepository.getCake(cake.name);
  if (cakeExists) throw DuplicatedCakeError();

  await cakeRepository.postCake(cake);
}

import * as bossesRepository from '../repositories/bossesRepository';


export async function fetchAllBosses () {
    const allBosses = await bossesRepository.findAllBosses();
    return allBosses;
}

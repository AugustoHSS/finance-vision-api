import * as clientsRepository from '../repositories/clientsRepository';


export async function fetchAllBosses () {
    const allClients = await clientsRepository.findAllClients();
    return allClients;
}

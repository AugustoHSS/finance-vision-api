import * as tipRepository from '../repositories/tipRepository';

export async function fetchAllTips(userId: number) {
    const tips = await tipRepository.findAllByUserId(userId);
    return tips;
}

export async function fetchlastestTips (userId: number, limit: number) {
    const lastestTips = await tipRepository.findLastestByUserId(userId, limit);
    return lastestTips;
}

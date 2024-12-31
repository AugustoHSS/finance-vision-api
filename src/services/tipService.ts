import * as tipRepository from '../repositories/tipRepository';

export async function fetchAllTips(userId: number) {
    const tips = await tipRepository.findAllByUserId(userId);
    return tips;
}

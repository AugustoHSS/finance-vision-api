import * as tipRepository from '../repositories/tipRepository';
import { ITip } from '../interfaces';

export async function fetchAllTips(userId: number) {
    const tips = await tipRepository.findAllByUserId(userId);
    return tips;
}

export async function fetchlastestTips (userId: number, limit: number) {
    const lastestTips = await tipRepository.findLastestByUserId(userId, limit);
    return lastestTips;
}

export async function createTip(userId:number, data: ITip) {
    const valueInCents = Math.round(data.value * 100);
    
    const tipData = {
        ...data,
        value: valueInCents,
    };
    await tipRepository.insert(userId, { ...tipData, date: tipData.date });
}
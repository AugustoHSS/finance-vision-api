import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.boss.deleteMany();

    await prisma.boss.createMany({
        data: [
            { name: 'Abyssal Sire' },
            { name: 'Alchemical Hydra' },
            { name: 'Araxxor' },
            { name: 'Artio' },
            { name: 'Barrows' },
            { name: 'Callisto' },
            { name: 'Calvarion' },
            { name: 'Cerberus' },
            { name: 'Chaos Elemental' },
            { name: 'Chaos Fanatic' },
            { name: 'Combat Achievements' },
            { name: 'Crazy archaeologist' },
            { name: 'Dagannoth Kings' },
            { name: 'Demonic gorilla' },
            { name: 'Duke Sucellus' },
            { name: 'General Graardor' },
            { name: 'Giant Mole' },
            { name: 'Grotesque Guardians' },
            { name: 'Kalphite Queen' },
            { name: 'King Black Dragon' },
            { name: 'Kree arra' },
            { name: 'Kraken' },
            { name: 'Kril Tsutsaroth' },
            { name: 'Leviathan' },
            { name: 'Lizardman shaman' },
            { name: 'Nex' },
            { name: 'Phantom Muspah' },
            { name: 'Sarachnis' },
            { name: 'Scorpia' },
            { name: 'Tombs of Amascut' },
            { name: 'Tormented Demon' },
            { name: 'Vardenovis' },
            { name: 'Venenatis' },
            { name: 'Vetion' },
            { name: 'Whisperer' },
            { name: 'Zulrah' },
        ]

    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
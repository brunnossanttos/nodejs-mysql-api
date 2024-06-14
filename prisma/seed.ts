// seed.js

import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const badgesData = [
    {
      id: uuidv4(),
      slug: 'cda',
      name: 'Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    },
    {
      id: uuidv4(),
      slug: 'cda-valley',
      name: 'Cidade Alta Valley',
      image:
        'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    },
    {
      id: uuidv4(),
      slug: 'policia',
      name: 'Polícia do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
    },
    {
      id: uuidv4(),
      slug: 'hospital',
      name: 'Hospital do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
    },
    {
      id: uuidv4(),
      slug: 'mecanica',
      name: 'Mecânica do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
    },
    {
      id: uuidv4(),
      slug: 'taxi',
      name: 'Taxi do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
    },
    {
      id: uuidv4(),
      slug: 'curuja',
      name: 'Coruja',
      image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
    },
    {
      id: uuidv4(),
      slug: 'hiena',
      name: 'Hiena',
      image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
    },
    {
      id: uuidv4(),
      slug: 'gato',
      name: 'Gato',
      image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
    },
    {
      id: uuidv4(),
      slug: 'urso',
      name: 'Urso',
      image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
    },
  ];

  for (const badge of badgesData) {
    await prisma.badge.create({
      data: badge,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import * as faker from 'faker';
import { User } from './user';
import { firestore } from 'firebase';
import { Article } from './article';

export const generateUser = (): User => ({
    id: faker.random.uuid(),
    email: faker.internet.email(),
    name: faker.name.findName(),
    password: faker.internet.password(),
    rank: 'MASTER',
    privilege: 'USER',
    status: 'ACTIVE',
    joinedDate: new firestore.Timestamp(1596029170, 0)
});

export const generateArticle = (): Article => ({
    id: faker.random.uuid(),
    author: faker.internet.email(),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraphs(15),
    slug: faker.lorem.slug(),
    audience: 'PUBLIC',
    imageUrl: faker.random.image(),
    cutoff: faker.lorem.paragraphs(5),
    publishTimestamp: new firestore.Timestamp(1596029170, 0)
});

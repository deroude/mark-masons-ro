import * as faker from 'faker';
import { User } from './user';
import { firestore } from 'firebase';
import { Article } from './article';
import { EventHandle, EventInstance } from './event';
import { Lodge } from './lodge';

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

export const generateLodge = (): Lodge => ({
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    number: faker.random.number(),
    orient: { country: 'Romania', principal: 'Bucuresti' }
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

export const generateEvent = (past: boolean): EventInstance => ({
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    invitation: generateArticle(),
    date: new firestore.Timestamp((past ? faker.date.past() : faker.date.future()).getTime() / 1000, 0),
    location: faker.address.streetAddress(),
    lodge: generateLodge(),
    type: 'REGULAR'
});

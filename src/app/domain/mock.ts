import * as faker from 'faker';
import { User } from '@model/user';
import { Article } from '@model/article';
import { Event } from '@model/event';
import { Lodge } from '@model/lodge';

export const generateUser = (): User => ({
    id: faker.random.number(),
    email: faker.internet.email(),
    rank: 'MASTER',
    userStatus: 'ACTIVE'
});

export const generateLodge = (): Lodge => ({
    id: faker.random.number(),
    name: faker.company.companyName(),
    number: String(faker.random.number()),
    orient: 'Bucuresti'
});

export const generateArticle = (): Article => ({
    id: faker.random.number(),
    author: generateUser(),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraphs(15),
    slug: faker.lorem.slug(),
    publishDate: new Date().toISOString()
});

export const generateEvent = (past: boolean): Event => ({
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraphs(6),
    startDate: past ? faker.date.past().toISOString() : faker.date.future().toISOString(),
    location: faker.address.streetAddress(),
    lodge: generateLodge()
});
import * as faker from 'faker';
import { User } from './user';
import { firestore } from 'firebase';
import { Article } from './article';
import { EventHandle, EventInstance } from './event';
import { Lodge } from './lodge';
import { Charity } from './charity';

export const generateUser = (): User => ({
    id: faker.random.uuid(),
    email: faker.internet.email(),
    name: faker.name.findName(),
    password: faker.internet.password(),
    rank: 'MASTER',
    privilege: 'USER',
    status: 'ACTIVE',
    joinedDate: firestore.Timestamp.fromDate(new Date())
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
    publishTimestamp: firestore.Timestamp.fromDate(new Date())
});

export const generateEvent = (past: boolean): EventInstance => ({
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    invitation: generateArticle(),
    date: firestore.Timestamp.fromDate(past ? faker.date.past() : faker.date.future()),
    location: faker.address.streetAddress(),
    lodge: generateLodge(),
    type: 'REGULAR'
});

export const generateCharity = (): Charity => ({
    description: generateArticle(),
    publishDate: firestore.Timestamp.fromDate(faker.date.past()),
    raisedAmount: faker.random.number({ min: 100, max: 2000 }),
    status: 'AVAILABLE',
    targetCurrency: 'EUR',
    title: faker.lorem.sentence(),
    targetAmount: faker.random.number({ min: 1000, max: 20000 }),
    endDate: firestore.Timestamp.fromDate(faker.date.future()),
    contributions: new Array(10).fill(null).map(() => ({
        amount: faker.random.number({ min: 1000, max: 20000 }),
        anonymous: faker.random.arrayElement(['FULL', 'NAME', 'AMOUNT', 'NONE']),
        currency: 'EUR',
        from: generateUser(),
        payDate: firestore.Timestamp.fromDate(faker.date.past()),
        status: 'ACCEPTED'
    }))
});

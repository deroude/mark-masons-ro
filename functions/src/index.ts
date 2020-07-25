import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();
const db = admin.firestore();

export const addNotifications = functions
    .region('europe-west3')
    .firestore.document('/event/{eventId}')
    .onCreate(async (snapshot: any, context: any) => {
        const event = snapshot.data();
        const eventId = context.params.eventId;
        const batch = db.batch();
        const lodge = db.doc(event.lodge);
        const subscribedUsers = await db.collection('membership').where('lodge', '==', lodge).where('subscribed', '==', true).get();
        subscribedUsers.forEach(user => {
            const newNotification = db.collection('eventNotification').doc();
            batch.set(newNotification, {
                event: `/event/${eventId}`,
                status: 'NOT_SENT',
                subscriber: user.data().email
            });
        });
        await batch.commit();
    })

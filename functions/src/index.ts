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
        const event = snapshot;
        const batch = db.batch();
        const subscribedUsers = await db.collection('membership').where('lodge', '==', event.data().managingLodge).where('subscribed', '==', true).get();
        subscribedUsers.forEach(user => {
            const newNotification = db.collection('eventNotification').doc();
            batch.set(newNotification, {
                event: event.ref,
                status: 'NOT_SENT',
                subscriber: user.data().user
            });
        });
        await batch.commit();
    })

// export const test = functions.region('europe-west3').https.onRequest(async (req,res) => {
//     const event = await db.doc('event/GMOKFeCW5dDEVsibCbhl').get();
//     const batch = db.batch();
//     if (event.exists) {
//         const subscribedUsers = await db.collection('membership').where('lodge', '==', event.data()?.managingLodge).where('subscribed', '==', true).get();
//         subscribedUsers.forEach(user => {
//             const newNotification = db.collection('eventNotification').doc();
//             batch.set(newNotification, {
//                 event:event.ref,
//                 status: 'NOT_SENT',
//                 subscriber: user.data().user
//             });
//         });
//         await batch.commit();
//         res.send('');
//     }
// });

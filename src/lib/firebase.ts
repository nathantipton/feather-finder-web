

import { browser } from '$app/environment';
import { PUBLIC_FIREBASE_APIKEY, PUBLIC_FIREBASE_APPID, PUBLIC_FIREBASE_AUTHDOMAIN, PUBLIC_FIREBASE_MEASUREMENTID, PUBLIC_FIREBASE_MESSAGINGSENDERID, PUBLIC_FIREBASE_PROJECTID, PUBLIC_FIREBASE_STORAGEBUCKET } from '$env/static/public';
import { logEvent as fbLogEvent, getAnalytics } from 'firebase/analytics';
import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: PUBLIC_FIREBASE_APIKEY,
    authDomain: PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: PUBLIC_FIREBASE_PROJECTID,
    storageBucket: PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: PUBLIC_FIREBASE_APPID,
    measurementId: PUBLIC_FIREBASE_MEASUREMENTID
};

export const app = firebase.initializeApp(firebaseConfig);
export const analytics = browser ? getAnalytics(app) : null;
export const auth = getAuth(app);


export function logEvent(name: string, data: any) {
    if (analytics) {
        fbLogEvent(analytics, name, data);
    }
}
import admin from "firebase-admin"

export interface FirebaseSettings {
    type: string 
    project_id: string 
    private_key_id: string
    private_key: string
    client_email: string
    client_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_x509_cert_url: string
    database_url: string
}

let initialized: boolean = false
export function initializeApp(settings: FirebaseSettings) {
    if (initialized) {return}
    initialized = true
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: settings.project_id,
            clientEmail: settings.client_email,
            privateKey: settings.private_key
        }),
        databaseURL: settings.database_url
    })
}

export type Query = admin.database.Query;
export type EventType = admin.database.EventType;
export type Reference = admin.database.Reference;
export type SnapShotCallback = (a: admin.database.DataSnapshot, b?: string | null) => any;

export class RealtimeDatabaseClass {
    private callbacks: { [path: string]: { [type: string]: SnapShotCallback } } = {};
    constructor(private basePath: string = "") {}

    getReference(path: string = ""): Reference{
        const p = this.basePath + "/"  + path;
        return admin.database().ref(p);
    }

    async get(query: Query | Reference): Promise<Object | null> {
        let res = await query.once('value');
        return res.val();
    }
    
    async set(path: string, value: Object) {
        const ref = this.getReference(path);
        await ref.set(value);
    }

    async update(path: string, value: Object) {
        const ref = this.getReference(path);
        await ref.update(value);
    }
    
    async delete(path: string): Promise<void> {
        const ref = this.getReference(path);
        await ref.remove();
    }

    async push(path: string, value: Object): Promise<void> {
        const ref = this.getReference(path)
        await ref.push(value)
    }

    register(query: Query | Reference, type: EventType, callback: SnapShotCallback): void {
        let path = query.ref.key
        if (!path) return
        query.on(type, callback)
        if (this.callbacks[path]) {
            this.callbacks[path][type] = callback;
        } else {
            this.callbacks[path] = {}
            this.callbacks[path][type] = callback;
        }
    }

    unregister(query: Query | Reference, type: EventType): void {
        let path = query.ref.key
        if (!path) return
        query.off(type, this.callbacks[path][type])
        delete this.callbacks[path][type]
    }
}
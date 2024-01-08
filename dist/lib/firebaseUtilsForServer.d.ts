import admin from "firebase-admin";
export interface FirebaseSettings {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    database_url: string;
}
export declare function initializeApp(settings: FirebaseSettings): void;
export type Query = admin.database.Query;
export type EventType = admin.database.EventType;
export type Reference = admin.database.Reference;
export type SnapShotCallback = (a: admin.database.DataSnapshot, b?: string | null) => any;
export declare class RealtimeDatabaseClass {
    private basePath;
    private callbacks;
    constructor(basePath?: string);
    getReference(path?: string): Reference;
    get(query: Query | Reference): Promise<Object | null>;
    set(path: string, value: Object): Promise<void>;
    update(path: string, value: Object): Promise<void>;
    delete(path: string): Promise<void>;
    push(path: string, value: Object): Promise<void>;
    register(query: Query | Reference, type: EventType, callback: SnapShotCallback): void;
    unregister(query: Query | Reference, type: EventType): void;
}

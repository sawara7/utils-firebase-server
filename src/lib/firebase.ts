import { MongodbManagerClass } from "utils-mongodb"
import { FirebaseSettings, initializeApp, RealtimeDatabaseClass } from ".."

export async function getRealTimeDatabase(): Promise<RealtimeDatabaseClass> {
    const mongo = new MongodbManagerClass('firebase_realtimedatabase')
    let settings: FirebaseSettings
    if (await mongo.connect()){
        const res = await mongo.find('settings')
        if (!res.result || !res.data) throw new Error('failed get settings from mongoDB')
        settings = res.data[0] as FirebaseSettings
        initializeApp(settings)
    }else{
        throw new Error('failed getRealtimeDatabase')
    }
    return new RealtimeDatabaseClass()
}
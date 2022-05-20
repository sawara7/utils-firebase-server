import { MongodbManagerClass } from "mongodb-utils"
import { FirebaseSettings, initializeApp, RealtimeDatabaseClass } from ".."

export async function getRealTimeDatabase(): Promise<RealtimeDatabaseClass> {
    const mongo = new MongodbManagerClass('firebase_realtimedatabase')
    let settings: FirebaseSettings
    if (await mongo.connect()){
        const res = await mongo.find('settings')
        settings = res[0] as FirebaseSettings
        initializeApp(settings)
    }else{
        throw new Error('failed')
    }
    return new RealtimeDatabaseClass()
}
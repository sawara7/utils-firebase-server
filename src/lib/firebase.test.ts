import { getRealTimeDatabase } from '..'

(async function () {
    const rdb = await getRealTimeDatabase()
    console.log(await rdb.get(await rdb.getReference('settings')))
})()
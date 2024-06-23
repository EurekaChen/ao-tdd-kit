import { test } from 'node:test'
import * as assert from 'node:assert'
import { Send } from '../aos.helper.js'
import fs from 'node:fs'

test('dbAdmin test suite', async () => {
    const mainLua = fs.readFileSync('./src/db-admin/main.lua', 'utf-8')
    const exampleLua = fs.readFileSync('./src/test-unit/example.lua', 'utf-8')

    // Load dbAdmin
    const loadResult = await Send({
        Action: "Eval",
        Data: `local function _load() ${mainLua} end _G.package.loaded["DbAdmin"] = _load() return "loaded.."`
    })
    console.log("loadResult:",loadResult);
    //assert.equal(loadResult.Output.data.output, 'loaded..')

    // Run example
    const exampleResult = await Send({ Action: "Eval", Data: exampleLua })
    assert.equal(exampleResult.Output.data.output, '{ \x1B[32m"test"\x1B[0m }')

    // Check record count
    const countResult = await Send({ Action: "Eval", Data: `dbAdmin:count('test')` })
    assert.equal(countResult.Output.data.output, '3')

    // Check records
    const recordsResult = await Send({ Action: "Eval", Data: `require('json').encode(dbAdmin:exec('SELECT * FROM test'))` })
    assert.equal(recordsResult.Output.data.output, '[{"content":"Hello Lua","id":1},{"content":"Hello Sqlite3","id":2},{"content":"Hello ao!!!","id":3}]')
})

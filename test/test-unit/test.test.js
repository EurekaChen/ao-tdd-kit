import { test } from 'node:test'
import * as assert from 'node:assert'
import { Send } from '../aos.helper.js'
import fs from 'node:fs'

test('test unit suite', async () => {
    const testLua = fs.readFileSync('../src/test-unit/test.lua', 'utf-8')

    // Load Test Unit
    const loadResult = await Send({
        Action: "Eval",
        Data: `local function _load() ${testLua} end _G.package.loaded["Test"] = _load() return "loaded.."`
    })
    assert.equal(loadResult.Output.data.output, 'loaded..')

    // Run tests
    const runResult = await Send({ Action: "Eval", Data: `return myTests:run()` })
    assert.ok(runResult.Output.data.output.includes('Passed: 2, Failed: 0'))
})


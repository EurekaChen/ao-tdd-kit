import { test } from 'node:test'
import * as assert from 'node:assert'
import { Send } from '../aos.helper.js'
import fs from 'node:fs'

test('client test suite', async () => {
    const clientLua = fs.readFileSync('../src/manager/client.lua', 'utf-8')

    // Load client
    const loadResult = await Send({
        Action: "Eval",
        Data: `local function _load() ${clientLua} end _G.package.loaded["Client"] = _load() return "loaded.."`
    })
    assert.equal(loadResult.Output.data.output, 'loaded..')

    // Test connect
    const connectResult = await Send({ Action: "Eval", Data: `client.connect('localhost')` })
    assert.ok(connectResult.Output.data.output.includes('Connecting to localhost'))

    // Test send message
    const messageResult = await Send({ Action: "Eval", Data: `client.sendMessage('Hello, Server!')` })
    assert.ok(messageResult.Output.data.output.includes('Sending message: Hello, Server!'))
})


-- 单元测试类

-- 创建Test类
local Test = {}
Test.__index = Test

-- Test类构造函数
function Test.new(name)
    local self = setmetatable({}, Test)
    self.name = name
    self.tests = {}
    return self
end

-- 添加注册函数
function Test:add(name, func)
    table.insert(self.tests, { name = name, func = func })
end

-- 运行测试
function Test:run()
    local output = ""
    local out = function (txt) 
      output = output .. txt .. '\n'
    end
    out("为" .. self.name .. "运行测试")
    local passed = 0
    local failed = 0
    for _, test in ipairs(self.tests) do
        local status, err = pcall(test.func)
        if status then
            out("✔ " .. test.name)
            passed = passed + 1
        else
            out("✘ " .. test.name .. ": " .. err)
            failed = failed + 1
        end
    end
    out(string.format("通过: %d, 失败: %d", passed, failed))
    return output
end

return Test

local Test = require("Test")

local myTests = Test.new('example tests')

local test1=function () 
    assert(true, 'passing test') 
end

local test2=function () 
    assert(true, 'passing test') 
end

myTests:add("test1",test1 )
myTests:add("test2",test2)

return myTests:run()
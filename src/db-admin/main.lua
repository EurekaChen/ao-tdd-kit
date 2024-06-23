local sqlite3 = require("lsqlite3")

local dbAdmin = {}

function dbAdmin.open(dbfile)
    local db = sqlite3.open(dbfile)
    return db
end

function dbAdmin.createTable(db, tableName)
    local sql = string.format("CREATE TABLE IF NOT EXISTS %s (id INTEGER PRIMARY KEY, content TEXT)", tableName)
    db:exec(sql)
end

function dbAdmin.insertRecord(db, tableName, content)
    local stmt = db:prepare(string.format("INSERT INTO %s (content) VALUES (?)", tableName))
    stmt:bind_values(content)
    stmt:step()
    stmt:finalize()
end

function dbAdmin.getRecordCount(db, tableName)
    local stmt = db:prepare(string.format("SELECT COUNT(*) FROM %s", tableName))
    stmt:step()
    local count = stmt:get_uvalues()
    stmt:finalize()
    return count
end

return dbAdmin


const { check_entity } = require('./刷怪自动化.js');
var entity = event.entity
const AFK = true
const ITEM_ID = ["minecraft:carrot", "minecraft:SENTRY_ARMOR_TRIM_SMITHING_TEMPLATE".toLowerCase(), "VEX_ARMOR_TRIM_SMITHING_TEMPLATE".toLowerCase()]
// const ITEM_ID = [ "minecraft:rotten_flesh"]
check_entity(entity, !AFK, ITEM_ID)
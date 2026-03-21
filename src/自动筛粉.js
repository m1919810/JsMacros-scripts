const FILL_CONTRNIS_TITLE = "发射器";
const COMMON_TITLE = "合成"
const MAX_COUNT = 24
const ROWS = 6;
//const ID="minecraft:lapis_lazuli"
//const IDBLOCK="minecraft:lapis_block"
//const ID="minecraft:quartz"
//const IDBLOCK="minecraft:quartz_block"
const ID = "minecraft:diamond"
const IDBLOCK = "minecraft:diamond_block"
const NAME = "钻石"
const NAMEBLOCK = "钻石块"

var playert = (World.getEntities(0.5, ["minecraft:player"]))[0]
const { getItemIdInSlot, getIdSlot, getAndMoveMulti, checkTitle, getIdAndMove, getIndexAndMove, waitUntilOpen, DebugLogger, getItemCountInSlot, getIdAndMoveRange, getItemNameInSlot, waitUntilMenuChange } = require('../libs/Mylib.js');
const HAND_ITEM = "minecraft:soul_sand"
var scanlist = []
Chat.log("start scan ")
for (let i = -3; i <= 4; ++i) {
    for (let j = -3; j <= 4; ++j) {
        for (let k = -3; k <= 4; ++k) {
            var block = World.getBlock(Math.floor(playert.getX() + i), Math.floor(playert.getY() + j), Math.floor(playert.getZ() + k))
            if ((block.getId().endsWith("trapdoor") && World.getBlock(Math.floor(playert.getX() + i), Math.floor(playert.getY() + j) + 1, Math.floor(playert.getZ() + k)).getId().endsWith("air"))  || (block.getId().endsWith("_fence") && World.getBlock(Math.floor(playert.getX() + i), Math.floor(playert.getY() + j) + 1, Math.floor(playert.getZ() + k)).getId().endsWith("air")) || (block.getId().endsWith("cauldron") && World.getBlock(Math.floor(playert.getX() + i), Math.floor(playert.getY() + j) + 1, Math.floor(playert.getZ() + k)).getId().endsWith("trapdoor")&& World.getBlock(Math.floor(playert.getX() + i), Math.floor(playert.getY() + j) + 2, Math.floor(playert.getZ() + k)).getId().endsWith("torch"))) {
                scanlist.push(block)
                Chat.log(block)
            }
        }
    }
}
function chargeGravel(){
    var slot=44;
    if(!checkTitle(COMMON_TITLE)){
        slot=89
        Client.waitTick(1)
    }
    getIdAndMoveRange(HAND_ITEM, 0, 36, slot, 64 - getItemCountInSlot(slot))
    Client.waitTick(1)
    // if (getItemCountInSlot(slot) < 63) {
        
    // } else if (getItemIdInSlot(slot) != "minecraft:gravel") {
    //     getIdAndMove("minecraft:gravel", slot, 64)
    // }
}

Chat.log("find target num: " + scanlist.length.toString())
var t=0
let i = 0;
let cnt = 0;
let trytime = 0;
while (Player.getCurrentPlayerInput().sneaking != true) {
    // if (scanlist.length == 0) break
    // Client.waitTick(1)
    // var blockv = Player.interactions().getTargetedBlock()
    // if (blockv == null) continue
    // var block = World.getBlock(blockv.getX(), blockv.getY(), blockv.getZ())
    // if (block.getId().endsWith("fence")) {
    //     Player.interactions().interactBlock(blockv.getX(), blockv.getY(), blockv.getZ(), "down", false)
    //     Player.interactions().interactBlock(blockv.getX(), blockv.getY(), blockv.getZ(), "down", false)
    //     Player.interactions().interactBlock(blockv.getX(), blockv.getY(), blockv.getZ(), "down", false)
    //     Player.interactions().interactBlock(blockv.getX(), blockv.getY(), blockv.getZ(), "down", false)

    // }
    chargeGravel()
    trytime += 1
    Player.interactions().interactBlock(scanlist[i].getX(), scanlist[i].getY(), scanlist[i].getZ(), "up", false)
    limit = scanlist[i].getId().endsWith("cauldron") ? 5 : 10
    if (trytime > limit){
        trytime = 0
        i = (++i)%scanlist.length;

    }
    // for (let i = 0; i < scanlist.length; ++i) {

        
    
    // }
    
    Client.waitTick(1)
}
Client.waitTick(20)

Chat.log("bydEnd");




Chat.log("end")
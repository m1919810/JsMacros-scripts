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
function getIdSlot() {
    if (arguments.length === 1) {
        return getIdSlot1(arguments[0])
    } else if (arguments.length === 3) {
        return getIdSlot2(arguments[0], arguments[1], arguments[2])
    } else if (arguments.length === 4) {
        return getIdSlot3(arguments[0], arguments[1], arguments[2], arguments[3])
    }
    else throw Error("InvalidArguments")
}
function getIdSlot1(Id) {

    return getIdSlot(Id, 0, 114514)
}
function getIdSlot2(Id, slot1, slot2) {

    var slots = Player.openInventory().findItem(Id)
    if (slots.length <= 0) {
        return -1;
    }
    else {
        for (let i = 0; i < slots.length; ++i) {
            if (slots[i] >= slot1 && slots[i] < slot2) {
                return slots[i];
            }
        }
        return -1;
    }
}
function getIdSlot3(Id, slot1, slot2, Name) {

    var slots = Player.openInventory().findItem(Id)
    if (slots.length <= 0) {
        return -1;
    }
    else {
        for (let i = 0; i < slots.length; ++i) {

            if (slots[i] >= slot1 && slots[i] < slot2 && Player.openInventory().getSlot(slots[i]).getName().getString() == Name) {
                return slots[i];
            }
        }
        return -1;
    }
}
function waitUntilOpen() {
    while (COMMON_TITLE == Player.openInventory().getContainerTitle()) {
        Client.waitTick(10);
    }
}
function checkTitle(Title) {
    if (Player.openInventory().getContainerTitle() == Title) {
        return true;
    }
    else return false;
}
function ErrorTitle(Title) {
    if (Player.openInventory().getContainerTitle() != Title) {
        throw new Error("已关闭界面")
    }
}
function checkIfOver() {
    if (Player.openInventory().getSlot(31).getItemId() != "minecraft:air") {
        return true;
    }
    return false;
}

var playert = Player.getPlayer();

var scanlist = []
Chat.log("start scan ")
for (let i = -3; i <= 4; ++i) {
    for (let j = -3; j <= 3; ++j) {
        for (let k = -3; k <= 4; ++k) {
            var block = World.getBlock(Math.floor(playert.getX() + i), Math.floor(playert.getY() + j), Math.floor(playert.getZ() + k))
            if (block.getId().endsWith("brick_wall") ||block.getId().endsWith("player_head") || block.getId().endsWith("player_wall_head") ) {
                scanlist.push(block)
            }
        }
    }
}
Chat.log("find target num: " + scanlist.length.toString())
var t = 0
while (true) {
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
    t += 1
    if(Player.getPlayer().isSneaking()){
        var sleep =0
        for (let s = 0; s < 1; ++s) {
            for (let i = 0; i < scanlist.length; ++i) {
                Player.interactions().interactBlock(scanlist[i].getX(), scanlist[i].getY(), scanlist[i].getZ(), "up", false)
                sleep++
                if(sleep%6==0){
                    Client.waitTick(5)
                }
            }
        }
    }
    
    Client.waitTick(5)
}

const COMMON_TITLE = "合成"
const NULL_TITLE = ""
const { getItemIdInSlot, getIdSlot, getAndMoveMulti, checkTitle, getIdAndMove, getIndexAndMove, waitUntilOpen, DebugLogger, getItemCountInSlot, getItemNameInSlot, waitUntilMenuChange, getTargetBlock, getNearbyBlock, getHotbarSlot, autoStack, ArrayStream } = require('./Mylib.js');
const { getPos, isMatureNetherWart, getThisPlayerPos, breakBlock, placeBlock } = require('./Worldlib.js')

while(true){
    if (Player.getCurrentPlayerInput().sneaking == true) {
        break;
    
    }
    Player.interactions().interact()
    Client.waitTick(2)
    var index = getIdSlot("CS_BUG",9,36)
    Chat.log(index)
    if(index >0){
        Player.openInventory().dropSlot(index, true)
    }
    Client.waitTick(1)
    Player.openInventory().close()
    Client.waitTick(1)
 
}
Chat.log("stop")
const { getItemIdInSlot, getIdSlot, getAndMoveMulti, checkTitle, getIndexAndMove, waitUntilOpen, DebugLogger, getItemCountInSlot, getItemNameInSlot,waitUntilMenuChange } = require('./Mylib.js');
const INVERSED_CLICK=0
Chat.log("scan Block:")
var blockv = Player.interactions().getTargetedBlock()
blockv1 = blockv.east()
blockv2 = blockv1.up()
Chat.log("scan complete")
Client.waitTick(8)


waitUntilMenuChange(() => Player.interactions().interactBlock(blockv.getX(), blockv.getY(), blockv.getZ(), "up", false), 20)
Client.waitTick(1)

Player.openInventory().click(0, INVERSED_CLICK)
Player.openInventory().click(-999, 0)
Player.openInventory().close()

waitUntilMenuChange(() => Player.interactions().interactBlock(blockv2.getX(), blockv2.getY(), blockv2.getZ(), "west", false),20)
Client.waitTick(1)
Chat.log(getItemCountInSlot(7))

if(getItemCountInSlot(7)==1){
    Player.openInventory().click(45,0)
    Player.openInventory().click(13,1)
    Player.openInventory().click(7,0)
    Player.openInventory().click(-999,0)
    Player.openInventory().close()
    waitUntilMenuChange(() => Player.interactions().interactBlock(blockv.getX(), blockv.getY(), blockv.getZ(), "up", false), 20)
    Client.waitTick(2)
    Chat.log(Player.openInventory().getSlot(0).getItemId())
    Player.openInventory().click(0, 1 - INVERSED_CLICK)
    Chat.log(Player.openInventory().getSlot(0).getItemId())

    Player.openInventory().click(-999, 0)
    Chat.log(Player.openInventory().getSlot(0).getItemId())
    Chat.log("end")
}else{
    Player.openInventory().close()
    Chat.log("failed")
}


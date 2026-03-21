const { getItemIdInSlot, getIdSlot, getAndMoveMulti, checkTitle, getIdAndMove, getIndexAndMove, waitUntilOpen, DebugLogger, getItemCountInSlot, getItemNameInSlot, waitUntilMenuChange, getTargetBlock, getNearbyBlock, getHotbarSlot, autoStack, ArrayStream, runSingleRepeat } = require('./Mylib.js');
const { getPos, isMatureNetherWart, getThisPlayerPos, breakBlock, placeBlock } = require('./Worldlib.js')
function main(){
    inv = Player.openInventory()
    if(checkTitle("快捷熔炉")){
        item = Player.openInventory().getSlot(31).getItemId()
        if(item != "minecraft:stone"){
            Player.openInventory().quick(32)
        }
        for(var  i = 51; i < 54 ; ++ i){
         item2 = Player.openInventory().getSlot(i).getItemId()
        if(item != "minecraft:air"){
            Player.openInventory().dropSlot(i, true)
        }
        }
       
        Player.openInventory().click(49, 1)
        Client .waitTick(5)
        cnt = 0;
        for(var  i =0 ; i < 54; ++ i){
            if(Player.openInventory().getSlot(i).getItemId() == "minecraft:stone" && i != 30 && i  != 31 && i != 32){
                Player.openInventory().quick(i)
                if(cnt > 18){
                    Chat.say("/sellall inventory")
                    Client.waitTick(22)
                }
            }

        }
        Chat.say("/sellall inventory")
        Client.waitTick(10)
  
    }
    Client .waitTick(10)
}

const FLAG = "自动烧石头加出售_1"
runSingleRepeat(main, FLAG)
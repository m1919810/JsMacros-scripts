// 通过快捷键触发
const { runSingleRepeat, checkTitle } = require('./Mylib.js');
const FLAG = "自动生物特征"
block = Player.interactions().getTargetedBlock()
if(block != null){
    blockUp = block.down()

    //PacketHelper.sendStartMining(blockUp, "down")
}


function main(){
    inventory = ScreenHelper.createServerInventoryView();
    size = inventory.getTotalSlots()
    startIndex = size > 54 ? 54 : 0
    for(let i = 0 ; i < 4 ; ++ i){
        PacketHelper.sendInteractBlock(block, "down", true)
        PacketHelper.sendStopMining()
    }

    Client.waitTick(2)
    

    for(var i = startIndex; i < size ; ++ i){
            item = inventory.getSlot(i);
        
            if(item.getItemId() == "minecraft:spawner" && ItemStackUtils.getSfId(item.getRaw()) == "LOGITECH_ENTITY_FEAT"){
                if(inventory.getContainerTitle().startsWith("网格")){
                    PacketHelper.sendInventoryPacket(i, 0, "quick_move")
                }else{
                    PacketHelper.sendInventoryPacket(i, 1, "throw")
                }
            
            }
        }

    if(Player.getPlayer().getOffHand().getCount() <= 32){
        for(var i = startIndex; i < size ; ++ i){
            item = inventory.getSlot(i);
            if(item.getItemId() == "minecraft:spawner" && ItemStackUtils.getSfId(item.getRaw()) != "LOGITECH_ENTITY_FEAT"){
                PacketHelper.sendInventoryPacket(i, 40, "swap")
                break
            }
        }
    }
    if(inventory.getContainerTitle().startsWith("网格")){
        PacketHelper.sendInventoryPacket(0, 1, "quick_move")
    }

    
}

runSingleRepeat(main, FLAG)
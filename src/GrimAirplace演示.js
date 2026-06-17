pos = Player.getPlayer().getPos()

//ground 
yfrom = 50;

Chat.log("Start")
counter = Player.openInventory().getSlot(36).getCount() - 2
Chat.log(counter)
cc = 0
pktcls = PacketHelper.getPacketType("set_carried_item", false)
pkt = Java.type(pktcls.getName())
for(let i = yfrom ; i <= Math.floor( pos.getY()) ; ++i){

    // PacketHelper.syncSelectedHotbar(1)
    // PacketHelper.syncSelectedHotbar(0)
    PacketHelper.sendPacket(new pkt(0))
    // how to resync
    if(cc ++ >= counter){
        cc = 0
        Player.openInventory().swapHotbar(36, 40)
    
         Player.openInventory().swapHotbar(36, 40)
         // 3c waitTick(10)
         // else waitTick(2) (?)
        Client.waitTick(12)

    }
    if(i ==   Math.floor( pos.getY())){
        Client.waitTick(10)
         Chat.log("Execute")
    }
    blockPos = DataHelper.createBlockPos(pos.getX(), i - 1, pos.getZ() )
    PacketHelper.sendInteractBlock(blockPos, "up", false)
   //PacketHelper.sendSwingHand(false)
}
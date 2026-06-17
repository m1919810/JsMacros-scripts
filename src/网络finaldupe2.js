const PER_STTICK_TICK = 12; 
if(KeyBind.getPressedKeys().contains("key.keyboard.left.control") ){
    block = Player.interactions().getTargetedBlock()
    if(block == null){
        throw Error("没对准方块")
    }

    PacketHelper.sendInteractBlock(block, "west", false)
    ScreenUtils.getOpenScreenFuture().get()
    Player.openInventory().click(45, 0)
    Player.openInventory().click(13, 0)
    Player.openInventory().click(45, 0)
    PacketHelper.sendInteractBlock(block.down(), "west", false)
    ScreenUtils.getOpenScreenFuture().get()
    Player.openInventory().quick(0)

    
    PacketHelper.sendInteractBlock(block, "west", false)
    ScreenUtils.getOpenScreenFuture().get()
    
    Player.openInventory().click(53, 0)
    Player.openInventory().click(13, 0)
    Player.openInventory().click(53, 0)
    Player.openInventory().click(16, 0)
   
    // Client.waitTick(PER_STTICK_TICK)

    // PacketHelper.sendInteractBlock(block.south().up(), "up", false)
    // ScreenUtils.getOpenScreenFuture().get()
    // Client.waitTick(PER_STTICK_TICK)
    // Player.openInventory().quick(81)

}




if(Player.openInventory().getContainerTitle().startsWith("网络量子存储") && Player.openInventory().getHeld().getItemId() == "minecraft:air" && KeyBind.getPressedKeys().contains("key.keyboard.left.control") ){
    entities = World.getEntities(5, "minecraft:item_frame")
    if(entities.length > 0 && Player.openInventory().getSlot(1).getItemId() != "minecraft:air"){
        entity = entities[0]
        selected = Player.openInventory().getSelectedHotbarSlotIndex() 
        stoneplace = false
        for(let i = 8; i >=0  ; -- i){
            if(Player.openInventory().getSlot(45 + i).getItemId() == "minecraft:air"){
                 ClientHelper.getInteractions().syncSelectedHotbar(i)
                break  
            }
        }
        
        PacketHelper.sendInteractEntity(entity, false)
       
       // Player.interactions().interactEntity(entity, false)
        targetItem = Player.openInventory().getSlot(1).copy()

        cobblestoneslot = -1
        slot = -1;

        for(var i = 18; i < 54; ++ i){
            if(Player.openInventory().getSlot(i).getItemId() == "minecraft:air"){
                slot = i 
                break
            }
        }
        if(slot == -1){
            Chat.log("No Free backpack space")
        }else{
             Player.openInventory().swapHotbar(7, 40)

             Player.openInventory().click(1, 0)
            Player.openInventory().click(13, 0)
           
            Player.openInventory().click(slot, 1)
            
            if(targetItem.getCount() > 1){
                Player.openInventory().click(-999, 0)

            }
            for(var i = 18; i < 54 ; ++ i){
                if(i != slot && Player.openInventory().getSlot(i).equals(targetItem)){

                    Player.openInventory().dropSlot(i, true)
                }
            }
        
            Player.openInventory().swapHotbar(7, 40)
            Player.openInventory().click(16, 0)
            
           
            PacketHelper.sendInteractEntity(entity, false)
 
            Player.openInventory().click(7, 0)
            Player.openInventory().click(13, 0)
            Player.openInventory().click(7, 0)
            Player.openInventory().click(16, 0)
             ClientHelper.getInteractions().syncSelectedHotbar(selected)
            
        }
       
    }
    
}
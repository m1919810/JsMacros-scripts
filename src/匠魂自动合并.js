const FLAG = "匠魂自动合并_1"

if(GlobalVars.getBoolean(FLAG) != true){
    GlobalVars.putBoolean(FLAG , true)
    Chat.log("Start")
    while(true){
        if(GlobalVars.getBoolean(FLAG) == false){
            Chat.log("Abort")
            break
        }
        
       
        if(Player.openInventory().getContainerTitle() == "高级铁砧"){
            for(let i = 54; i < 54 + 36; ++ i){
                if(Player.openInventory().getSlot(i).getItemId() == "minecraft:ender_pearl"){
                    Player.openInventory().dropSlot(i, true)
            
                }
            }
            //run 
            idx = 27 + 54 + Player.openInventory().getSelectedHotbarSlotIndex()
            itemStack = Player.openInventory().getSlot(idx)
            try{
                level = itemStack.getNBT().resolve("components.minecraft:custom_data.PublicBukkitValues.\"slimetinker:st_level\"")[0].asInt()
            }catch(e){
                level = 0
            }
            Chat.log(level)
            if(level < 2){
                entity = Player.interactions().getTargetedEntity()
                if(entity != null){
                    Player.interactions().attack(entity, true)
                    Client.waitTick(4)
                }
                
            }else{
                for(var i = 54; i < 54 + 36; ++i){
                    if(idx != i && !Player.openInventory().getSlot(i).isEnchanted() && Player.openInventory().getSlot(i).getItemId() == "minecraft:stone_sword"){
                        
                        if(Player.openInventory().getSlot(10).getItemId() != "minecraft:air"){
                            Player.openInventory().quick(10)
                        }
                        if(Player.openInventory().getSlot(13).getItemId() != "minecraft:air"){
                            Player.openInventory().quick(13)
                        }
                        if(Player.openInventory().getSlot(16).getItemId() != "minecraft:air"){
                            Player.openInventory().quick(16)
                        }
                        Client.waitTick(5)
                        if(Player.openInventory().getSlot(10).getItemId() == "minecraft:air" && Player.openInventory().getSlot(13).getItemId() == "minecraft:air" && Player.openInventory().getSlot(16).getItemId() == "minecraft:air"){
                            Chat.log("step one")
                            Player.openInventory().click(i)
                            Player.openInventory().click(10)
                            Player.openInventory().click(idx)
                            Player.openInventory().click(13)
                            Chat.log("step two")
                            Client.waitTick(20)
                            Player.openInventory().click(40)
                            Player.openInventory().click(40)
                            Client.waitTick(20)
                            Chat.log("step three")
                            Player.openInventory().click(16)
                            Player.openInventory().click(idx)
                            Chat.log("Upgrade")
                            Client.waitTick(10)
                            if(Player.openInventory().getHeld().getItemId() == "minecraft:ender_pearl"){
                                Player.openInventory().dropSlot(-999, true)
                            }
                            try{
                                enchants = Player.openInventory().getSlot(idx).getEnchantments()
                                Chat.log("Having " + enchants.size() + " / " +  Client.getRegistryManager().getEnchantments().size()+ " enchantments")
                                reglist = Client.getRegistryManager().getEnchantments()
                                if(reglist.size() - 5 < enchants.size()){
                                    for(var i in reglist){
                                        ench = reglist.get(i)
                                 
                                        if(enchants.indexOf(ench) == -1) {
                                            Chat.log("No " + ench)
                                        }
                                    }
                                }
                                
                            
                            }catch(e){
                                Chat.log(e)
                            }
                        }else{
                            Chat.log("Backpack full")
                        }
                        break
                        
                    }
                    
                }
            }
            Client .waitTick(8)

            
        }
        Client.waitTick(2)

    }
}else{
    GlobalVars.putBoolean(FLAG, false)
}
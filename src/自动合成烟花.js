const { runSingleRepeat, checkTitle } = require('../libs/Mylib.js');

function quickTo(id, slot ){
    for(var i = slot; i < slot + 36; ++i){
        var it = Player.openInventory().getSlot(i)
        if(it.getItemId() == id){
            PacketHelper.sendInventoryPacket(i, 0, "quick_move")
            Player.openInventory().quick(i)
            return true;
        }
    }
    return false;
}

function run(){
    if(InputHelper.hasAltDown()){

        if(checkTitle("合成")){
            type = ScreenHelper.getScreenName(Player.openInventory().getRawContainer())
            slot = 0;
            start = 0
            if(type == "Crafting Table"){
                slot = 10
                start = 10
                can_num = 0
                gun_num = 0 
                pap_num = 0
                for(var i = start; i < start + 36; ++i){
                    if(Player.openInventory().getSlot(i).getItemId() == "minecraft:sugar_cane" ){
                        can_num += Player.openInventory().getSlot(i).getCount()
                    }else if( Player.openInventory().getSlot(i).getItemId() == "minecraft:gunpowder" ){
                        gun_num += Player.openInventory().getSlot(i).getCount()
                    }else if(Player.openInventory().getSlot(i).getItemId() == "minecraft:paper"){
                       pap_num += Player.openInventory().getSlot(i).getCount()
                    }
                }
               
                craft_pap :{
                    if(can_num >= 192){
                        // clear items
                        
                        for(let i = 1 ; i < 4; ++i){
                            if(Player.openInventory().getSlot(i).getCount() > 0){

                                Player.openInventory().quick(i)
                            }
                        }
                        while(can_num >= 192){
                            can_num -= 192
                            for(let i = 1 ;  i< 4; ++i){
                            
                            while(true){
                                var it = Player.openInventory().getSlot(i)
                                if(it.getCount() < 64){
                                    if(quickTo("minecraft:sugar_cane", start)){
                                        
                                    }else{
                                        break craft_pap
                                    }
                                }else{
                                    break
                                }
                            }
                            }
                            if(Player.openInventory().getSlot(4).getCount() > 0){

                                Player.openInventory().quick(4)
                            }
                            Player.openInventory().quick(0)
                             var slot = ScreenHelper.getScreenSlots(Player.openInventory().getRawContainer())
                            for(var i = 0 ; i < 10; ++i){
                                ScreenHelper.setSlotItem(slot.get(i), ItemStackHelper.loadItemFromMap({}))
                            }
                        }
                        
                    

                        Client.waitTick(10)
                    }
                
                }
                
                craft_fire:{
                    if(gun_num >= 192 && pap_num >= 64){
                      
                        // clear items
                        //add count     
                        for(let i = 1 ; i < 5; ++i){
                            if(Player.openInventory().getSlot(i).getCount() > 0){

                                Player.openInventory().quick(i)
                            }
                        }
                        while(gun_num >= 192 && pap_num >= 64){
                            gun_num -= 192
                            pap_num -=64
                            for(let i = 1 ;  i< 4; ++i){
                            for(var bb = 0 ; bb < 100; ++bb){
                                var it = Player.openInventory().getSlot(i)
                                if(it.getCount() < 64){
                                 
                                    
                                    if(quickTo("minecraft:gunpowder", start)){
                                        
                                    }else{
                                        break craft_fire
                                    }
                                }else{
                                    break
                                }
                            }
                            }
                            if(Player.openInventory().getSlot(4).getCount() > 0){

                                Player.openInventory().quick(4)
                            }
                            while(true){
                                var it = Player.openInventory().getSlot(4)
                                if(it.getCount() < 64){
                                    if(quickTo("minecraft:paper", start)){
                                        
                                    }else{
                                        break craft_fire
                                    }
                                }else{
                                    break
                                }
                            }
                            if(Player.openInventory().getSlot(5).getCount() > 0){
                                Player.openInventory().quick(5)
                            }
                            
                            Player.openInventory().quick(0)
                            var slot = ScreenHelper.getScreenSlots(Player.openInventory().getRawContainer())
                            for(var i = 0 ; i < 10; ++i){
                                ScreenHelper.setSlotItem(slot.get(i), ItemStackHelper.loadItemFromMap({}))
                            }
                        }
                        
                        Client.waitTick(10)

                
                    
                    }
                    
                }
               
            }
            
        }
        if(Player.openInventory().isContainer()){
            size = Player.openInventory().getTotalSlots() - 36;
            empty_slot = 0
            paper_slot = 0
            gun_slot = 0
            for(var i = size ; i < size + 36; ++i){
                if(Player.openInventory().getSlot(i).getCount() == 0 ){
                    empty_slot +=1
                }else if( Player.openInventory().getSlot(i).getItemId() == "minecraft:gunpowder" ){
                    empty_slot += 1
                    gun_slot += 1
                }else if(Player.openInventory().getSlot(i).getItemId() == "minecraft:paper" || Player.openInventory().getSlot(i).getItemId() == "minecraft:sugar_caner"){
                    empty_slot += 1
                    paper_slot += 1
                }else if(Player.openInventory().getSlot(i).getItemId() == "minecraft:firework_rocket"){
                    Player.openInventory().quick(i)
                }
            }
            expect_paper = empty_slot / 4
            expected_gun = expect_paper * 3
            need_paper = (expect_paper - paper_slot) *64
            need_gun = (expected_gun - gun_slot) * 64
            for(var re = 0; re < size; ++re){
                if(Player.openInventory().getSlot(re).getItemId() == "minecraft:gunpowder" && need_gun > 0){
                    cnt = Player.openInventory().getSlot(re).getCount()
                    Player.openInventory().quick(re)
                    need_gun -= cnt
                }
                if((Player.openInventory().getSlot(re).getItemId() == "minecraft:paper" || Player.openInventory().getSlot(re).getItemId() == "minecraft:sugar_cane") && need_paper > 0){
                    cnt = Player.openInventory().getSlot(re).getCount()
                    Player.openInventory().quick(re)
                    need_paper -= cnt
                }
            }
            
        }
        Client.waitTick(2)
    }
    Client.waitTick(1)
    
}
const FLAG ="自动合成烟花1"
runSingleRepeat(run, FLAG)
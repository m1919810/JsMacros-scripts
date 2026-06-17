const { runSingleRepeat, checkTitle } = require('../libs/Mylib.js');

function quickTo(id, slot ){
    for(var i = slot; i < slot + 36; ++i){
        var it = Player.openInventory().getSlot(i)
        if(it.getItemId() == id){
            Player.openInventory().quick(i)
            return true;
        }
    }
    return false;
}

function run(){
    if(ScreenUtils.hasAltDown()){
        if(checkTitle("合成")){
            type = ScreenHelper.getScreenName(Player.openInventory().getRawContainer())
            slot = 0;
            start = 0
            if(type == "Crafting Table"){
                slot = 10
                start = 10
                craft:{
                    for(let i = 0 ;  i< 3; ++i){
                        while(true){
                            var it = Player.openInventory().getSlot(i)
                            if(it.getCount() < 64){
                                if(quickTo("minecraft:gun_powder", start)){
                                    
                                }else{
                                    break craft
                                }
                            }else{
                                break
                            }
                        }
                    }
                    if(Player.openInventory().getSlot(3).getCount() > 0){

                    Player.openInventory().quick(3)
                    }
                    while(true){
                        var it = Player.openInventory().getSlot(3)
                        if(it.getCount() < 64){
                            if(quickTo("minecraft:paper", start)){
                                
                            }else{
                                break craft
                            }
                        }else{
                            break
                        }
                    }
                     if(Player.openInventory().getSlot(4).getCount() > 0){

                     Player.openInventory().quick(4)
                    }
                    Player.openInventory().quick(9)
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
                }else if( Player.openInventory().getSlot(i).getItemId() == "minecraft:gun_powder" ){
                    empty_slot += 1
                    gun_slot += 1
                }else if(Player.openInventory().getSlot(i).getItemId() == "minecraft:paper"){
                    empty_slot += 1
                    paper_slot += 1
                }
            }
            expect_paper = empty_slot / 4
            expected_gun = expect_paper * 3
            need_paper = (expect_paper - paper_slot) *64
            need_gun = (expected_gun - gun_slot) * 64
            for(var re = 0; re < size; ++re){
        
                if(Player.openInventory().getSlot(i).getItemId() == "minecraft:gun_powder" && need_gun > 0){
                    cnt = Player.openInventory().getSlot(i).getCount()
                    Player.openInventory().quick(i)
                    need_gun -= cnt
                }
                if(Player.openInventory().getSlot(i).getItemId() == "minecraft:paper" && need_paper > 0){
                    cnt = Player.openInventory().getSlot(i).getCount()
                    Player.openInventory().quick(i)
                    need_paper -= cnt
                }
            }
        }
        Client.waitTick(10)
    }
    Client.waitTick(1)
    
}
const FLAG ="自动合成烟花1"
runSingleRepeat(run, FLAG)
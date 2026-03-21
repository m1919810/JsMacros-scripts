
const { runSingleRepeat, checkTitle } = require('./Mylib.js');

const EXP_REG = new RegExp("^(\\d*) 级经验$");
const FLAG = "自动解锁_1";

function main(){
    for(var i = 0 ; i < 9 ; ++i){
        PacketHelper.sendInteractItem(false)
    }
    
    Client.waitTick(2)
    if(checkTitle("Slimefun 指南")){

        lv = Player.getPlayer().getXPLevel()
        lst = []
        require = []
        min = 111111
        argmin = -1
        for(let i = 9 ; i< 45; ++i){
            if(Player.openInventory().getSlot(i).getItemId() == "minecraft:barrier"){
                item = Player.openInventory().getSlot(i)
                lore = item.getLore()
                if(!lore.isEmpty()){
                    expLore = lore.get(lore.size() - 1)
                    expLoreContent = ChatUtils.textToString(expLore.getRaw())
                    group = EXP_REG.exec(expLoreContent)
                    if(group != null && group.length > 1){
                    
                        str = parseInt(group[1])
                        lst.push(i)
                        require.push(str)
                        if(str < min){
                            min = str
                            argmin = i
                            break
                        }
                    }
                }
                
            }
        }
        if(argmin >= 0){
            if(min <= lv){
                Chat.log("Research " + argmin)
            
                Player.openInventory().click(argmin, 0)
            }
        }else{
            if(Player.openInventory().getSlot(52).getItemId() == "minecraft:lime_stained_glass_pane"){
                //Player.openInventory().click(52, 0)
                //Chat.log("Switch Page")
            }else{
                //Chat.log("All Finished")
            }
        }


    }
}

runSingleRepeat(main, FLAG)
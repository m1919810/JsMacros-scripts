const COMMON_TITLE= "合成"
const STOP_TITLE="网络吸尘器"
const TITLE="高级铁砧"
Chat.log("byd");
const MAX_COUNT = 576
const ROWS=4


function main(){
while(1){
    
    while(TITLE == Player.openInventory().getContainerTitle()){
        while(Player.openInventory().getSlot(40).getItemId()=="minecraft:air"){
            if(STOP_TITLE == Player.openInventory().getContainerTitle()){
                return 0;
            }
            Client .waitTick(1);
        }
        Player.openInventory().grabAll(86);
        Player.openInventory().click(86,0);
        Client .waitTick(1);
        if(Player.openInventory().getSlot(86).getCount()>=63){
            Player.openInventory().click(86,0);
            Player.openInventory().click(87,1);
            Player.openInventory().click(86,0);
            Client .waitTick(5);
            Player.openInventory().dropSlot(86,true);
            Player.openInventory().click(87,0);
            
            Player.openInventory().click(86,0);
        }
        if(STOP_TITLE == Player.openInventory().getContainerTitle()){
            return 0;
        }

    }
    if(STOP_TITLE == Player.openInventory().getContainerTitle()){
        return 0;
    }

}
}
var a=main();
Chat.log("终止辣牢底 返回值"+a.toString());
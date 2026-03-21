const FLAG = "唱片_1"

const { runSingleLocked } = require('../libs/Mylib.js');
function runOnce(){
    if(Player.openInventory().getContainerTitle() == "终极工作台"){
        Player.openInventory().click(7)
        Client .waitTick(5)
        Player.openInventory().click(8)
        Client.waitTick(5)
        Player.openInventory().click(16)
        Client.waitTick(5)
         Player.openInventory().quick(43)
     
    }
}
if(event.slot == -999){
    runSingleLocked(runOnce, FLAG)
}
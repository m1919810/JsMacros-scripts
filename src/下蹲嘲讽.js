
const { runSingleRepeat } = require('./Mylib.js');
const FLAG = "SNEAK_1"
const COMMON_TITLE= "合成"
const STOP_TITLE="网络吸尘器"
const NULL_TITLE=""
Chat.log("byd");
const MAX_COUNT = 576
const ROWS=4
const PASSWORD="114514"
function autoLogin(password){
    while (!World .isWorldLoaded()) {
        Client.waitTick(20);
    }
    Client.waitTick(100);
    Chat.say("/l "+password);
}
function main(){

    if(COMMON_TITLE == Player.openInventory().getContainerTitle()||NULL_TITLE==Player.openInventory().getContainerTitle()){
    var current=Player.getCurrentPlayerInput()
    var input=Player.createPlayerInput(current.movementForward , current.movementSideways ,current.yaw,current.pitch  , current.jumping, true, current.sprinting) 
    Player.clearInputs();
    Player.addInputs([input])
    Client.waitTick(2);
    var input=Player.createPlayerInput(current.movementForward , current.movementSideways ,current.yaw,current.pitch  , current.jumping, true, current.sprinting) 
    Player.clearInputs();
    Player.addInputs([input])
    Client.waitTick(2);
    

    }

   
}

runSingleRepeat(main, FLAG)

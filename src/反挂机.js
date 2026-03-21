const FLAG = "反挂机_1"

const { runSingleRepeat } = require('../libs/Mylib.js');
origin_yaw = Player.getPlayer().getYaw()
origin_pitch = Player.getPlayer().getPitch()
const ANGLE_RANGE = 50
const WAIT_SEC = 1
flag = 1
function lop(){
    if(Player.getPlayer() == null){
        return
    }
    flag = -flag
    yaw = origin_yaw + Math.random() * (2 * ANGLE_RANGE) - ANGLE_RANGE
    Player.addInput(Player.createPlayerInput(0.0, 0.0, origin_yaw, origin_pitch, false, false, false))
    Client.waitTick(1)
    Player.addInput(Player.createPlayerInput(1.0 * flag , 0.0, origin_yaw, origin_pitch, false, false, false))
    Client.waitTick(1)
    Player.addInput(Player.createPlayerInput(0.0, 0.0, yaw, origin_pitch, false, false, false))
    Client.waitTick(20 * WAIT_SEC)
}
runSingleRepeat(lop, FLAG)
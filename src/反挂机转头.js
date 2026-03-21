origin_yaw = Player.getPlayer().getYaw()
origin_pitch = Player.getPlayer().getPitch()
const ANGLE_RANGE = 30
const WAIT_SEC = 20
while(true){
    if(Player.getPlayer() == null)break    
    yaw = origin_yaw + Math.random() * (2 * ANGLE_RANGE) - ANGLE_RANGE
  
    Player.addInput(Player.createPlayerInput(0.0, 0.0, yaw, origin_pitch, false, false, false))
    Client.waitTick(20 * WAIT_SEC)
}
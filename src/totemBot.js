Consts.importConstantToContext(context)
rangexz = 50
rangey = 30
function sample_range(){
    x = Math.random() * rangexz * 2 - rangexz 
    y = -rangey + Math.random() * 2 * rangey
    z = Math.random() * rangexz * 2 - rangexz
    return PositionCommon.createPos(x, y, z)
}
function Sq(pos){
    return pos.x * pos.x + pos.y * pos.y + pos.z * pos.z;
}

function distanceSq(pos1, pos2){
    return Sq(pos1.sub(pos2))
}

function notInOneStep(pos){
    return distanceSq(Player.getPlayer().getPos(), pos) > 100 * 100
}


function findStepPos(pos){
    pos1 = Player.getPlayer().getPos()
    pos2 = pos
    pos3 = pos2.sub(pos1)
    var JMath = Java.type('java.lang.Math');
    distance = JMath.sqrt(Sq(pos3))
    pos4 = pos3.scale( 90 / distance)
    return pos1.add(pos4)
}
function checkKit(){
    Client.waitTick(5)
    Chat.say("/kit")
    Client.waitTick(20)
    Player.openInventory().click(10, 0)
    Client.waitTick(5)
}
function checkTotem(){
    if(Player.openInventory().getType() == "Survival Inventory"){
           
        if(Player.openInventory().getSlot(40).getItemId() != "minecraft:totem_of_undying"){
            find = false;
          
     
            for(var i =0 ; i < 36; ++i){
                if(Player.openInventory().getSlot(i).getItemId() == "minecraft:totem_of_undying"){
                    PacketHelper.sendInventoryPacket(i, 40, "swap")
                    find = true;
                    break;
                }
            }
            if(!find){
                checkKit()
                return
            }
        }
        selected = Player.openInventory().getSelectedHotbarSlotIndex()
        if(Player.openInventory().getSlot(selected).getItemId() != "minecraft:totem_of_undying"){
    
            find = false;
            for(var i =0 ; i < 36; ++i){
                if(Player.openInventory().getSlot(i).getItemId() == "minecraft:totem_of_undying"){
                    PacketHelper.sendInventoryPacket(i, selected, "swap")
                    find = true;
                    break;
                }
            }
            if(!find){
                checkKit()
                return
            }
        }
    }else{
        Player.openInventory().close();
    }
    
}
center = Player.getPlayer().getPos();
function main(){
    if(Player.getPlayer() == null){
        Client.waitTick(1)
        return
    }
   // checkTotem();
    if(false){
    Client.waitTick(1)
    return
    }
    movCtx = MovTasks.createPlayerMovContext()
    pos = sample_range().add(center)
      
    stepCnt = 0;
    while(true){
        currentPos = Player.getPlayer().getPos()
        if(notInOneStep(pos)){
            stepCnt += 1; 
            if(stepCnt > 5){
                Chat.log("Reset sample")
                return
            }
            posStep = findStepPos(pos)
            list = new ArrayList();
            Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                list.add(MovTasks.createNotOnGround(DataHelper.createVec(posStep.x, posStep.y, posStep.z)))
                MovTasks.scheduleMoveSequence(movCtx, list, false, false)  
                list.clear()
                movCtx.resetTick()

            }), true, 500)
            ClientHelper.sleepMs(25)
        }else{
            posStep = pos;
            list = new ArrayList();
            Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                list.add(MovTasks.createNotOnGround(DataHelper.createVec(posStep.x, posStep.y, posStep.z)))
                MovTasks.scheduleMoveSequence(movCtx, list, false, false)  
                list.clear()
                movCtx.resetTick()

            }), true, 500)

            ClientHelper.sleepMs(25)
            break;
        }
    }
}


const FLAG = "totembot_1"
const { getItemIdInSlot, 
getIdSlot, getAndMoveMulti, checkTitle, getIdAndMove, getIndexAndMove, 
waitUntilOpen, DebugLogger, getItemCountInSlot, getItemNameInSlot,
 waitUntilMenuChange,getTargetBlock,getNearbyBlock,getHotbarSlot, autoStack, 
 ArrayStream, runSingleRepeat, runSingleLocked } = require('./Mylib.js');

runSingleRepeat(main, FLAG)

Consts.importConstantToContext(context)


function inNoPvpArea(player){
    pos = player.getPos();
    return pos.x > -10 && pos.x < 10 && pos.y >90 && pos.y < 110 && pos.z > -10 && pos.z < 10 && 
    World.getDimension() == "minecraft:overworld"
}
function Sq(pos){
    return pos.x * pos.x + pos.y * pos.y + pos.z * pos.z;
}

function distanceSq(pos1, pos2){
    return Sq(pos1.sub(pos2))
}

function notInOneStep(player){
    return distanceSq(Player.getPlayer().getPos(), player.getPos()) > 70 * 70
}


function findStepPos(player){
    pos1 = Player.getPlayer().getPos()
    pos2 = player.getPos()
    pos3 = pos2.sub(pos1)
    var JMath = Java.type('java.lang.Math');
    distance = JMath.sqrt(Sq(pos3))
    // random move 100 ~ 130 to avoid collision
    pos4 = pos3.scale( Math.min(90 + 30 * Math.random(), Math.max(distance, 10)) / distance)
    return pos1.add(pos4)
}

//todo: select the best mace with maxinum level of enchantment 
function swapMace(){
    for(let i = 0 ; i < Player.openInventory().getTotalSlots(); ++ i){
        if(Player.openInventory().getSlot(i).getItemId() == "minecraft:mace"){
            return i;
        }
    }
    return -1;
}
kitcheck = false
function checkKit(){
    Client.waitTick(5)
    Chat.say("/kit")
    Client.waitTick(20)
    Player.openInventory().click(11, 0)
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
                if(kitcheck)
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
                if(kitcheck)
                   checkKit()
                return
            }
        }
    }else{
        Player.openInventory().close();
    }
    
}

flag = 0
lastTarget = null
currentTarget = null
wlist = false;
friendlist = [
    "E9VR",  
    "0oL_", 
    "樱羽艾玛", 
    "Sherii_Kawaii",
    "wuzhuan",
    "_Plckaxe_"
]
sleep_unit = 1
function isTarget(player){
    if(friendlist.includes(playerI.getPlayerName())){
        return wlist
    }else{
        return !wlist
    }
}
function main(){

    movCtx = MovTasks.createPlayerMovContext()
    //checkTotem()
    currentPos = Player.getPlayer().getPos()

    players = World .getEntities("minecraft:player")
    var currentPos = Player.getPlayer().getPos()
    function distance(pos0){
        var delta = currentPos.sub(pos0

        )
        return delta.x * delta.x + delta.y * delta.y + delta.z * delta.z
    }
    players.sort((a, b) => {
        
        var d = distance(a.getPos()) - distance(b.getPos())
        return d < 0 ? -1 : (d > 0 ? 1 : 0)
    })
    player = null;
    if(currentTarget != null){
        for(let  i= 0; i < players.length; ++i){
            playerI= players[i]
            if(playerI.isAlive() && !playerI.equals( Player.getPlayer()) && currentTarget == playerI.getPlayerName() ){
                if(isTarget(playerI) || inNoPvpArea(playerI)){
                    currentTarget = null
                    player = null
                }else{
                    player = playerI;
                    currentTarget = playerI.getPlayerName()
                }
                break;
            }
            
        }
    }
    // if player != null then it is selected
    
    lastTarget = currentTarget
    currentTarget = null
    // direct to another valid target if exist another target here
    for(let  i= 0; i < players.length; ++i){
        playerI= players[i]
        //do not attack same target, unless
        if(playerI.isAlive() && !playerI.equals( Player.getPlayer()) && isTarget(playerI) 
        //&& playerI.getPlayerName() != lastTarget
        ){
            player = playerI;
            currentTarget = playerI.getPlayerName()
            break;
        }
    
    }
    
    check:
    {
        if(player != null){
            //todo : move near, if < 80, then tp
            if(notInOneStep(player)){
                     Client.waitTick(sleep_unit)
                    posStep = findStepPos(player)
                    list = new ArrayList();
                    Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                        
                        currentVec = movCtx.from().getValue()
                        targetVec = DataHelper.createVec(posStep.x, posStep.y, posStep.z)

                        try{
                            start = Time.time()
                            list2 = MovTasks.generateTpSequence(currentVec, targetVec, false, 180, true)
                            end = Time.time()
                            Chat.log(end - start)
                        }catch(e){
                            Chat.log(e)
                        }
                        Chat.log("2")
                        list.addAll(MovTasks.createNotOnGroundList(list2))
                        MovTasks.scheduleMoveSequence(movCtx, list, false, false)  
                        list.clear()
                        movCtx.resetTick()
            
                    }), true, 1000)
                    Client.waitTick(sleep_unit)

                    break check
            }

            //Chat .log("Attack at " + player.getPlayerName())
            idx = swapMace()
            if(idx == -1){
                Chat.log("Mace absent")
                if(kitcheck)
                    checkKit()
                //break check
            }
            selected = Player.openInventory().getSelectedHotbarSlotIndex();

            list = new ArrayList();
           playerPos0 =  player.getRaw().predictPosition(5, 2);
            playerPos = DataHelper.createPos3d(playerPos0)
            Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                try{
                PacketHelper.sendInventoryPacket(idx, selected, "swap")
                height = [40]
                //reset height or see if can cause mace attack
                //should we?
                //Player.getPlayer().attack(player)
                    movCtx = MovTasks.createPlayerMovContext()
                    
                    list.clear();


                    
                    currentVec = movCtx.from().getValue()
                    targetVec = DataHelper.createVec(playerPos.x, playerPos.y + 0.1, playerPos.z)
                    list2 = MovTasks.generateTpSequence(currentVec, targetVec, false, 200, true)
                    list.addAll(MovTasks.createNotOnGroundList(list2))
                    beforeAttack = list.size();
                    //attack
                    for(let i = 0 ;i < height.length ; ++i){
                        list.add(MovTasks.createNotOnGround(DataHelper.createVec(playerPos.x, 
                        playerPos.y + height[i], playerPos.z)))
                        list.add(MovTasks.createNotOnGround(DataHelper.createVec(playerPos.x, 
                        playerPos.y + 0.1 , playerPos.z)))
                    }
                    //escape 
                    
                    // general
                    bundleList = MovTasks.createMovingPacketsForMovSequence(movCtx.resetTick(), list, false, false);
                    //run with attack
                    for(let i = 0 ; i < beforeAttack; ++i){
                        bundleList.get(i).run()
                    }
                    for(let i = 0 ; i < height.length; ++ i){
                        bundleList.get(2 * i + beforeAttack).run()
                        bundleList.get(2 * i + 1 + beforeAttack).run()
                        Player.getPlayer().attack(player)
                    }
                    for(let i = 2 * height.length + beforeAttack; i < bundleList.size(); ++i){
                        bundleList.get(i).run() 
                    }
                
                
                    list.clear()
                
                    Player.getPlayer().getRaw().setForceNoFall(true)
                    
                }catch(e){
                Chat.log(e)
                }
               
               
            
            }), true, 100)
        
            // break;

        //    movTasks = Java.type("me.matl114.hackUtils.MovTasks")
            Client.waitTick(sleep_unit)
            //need combine, the movement should be scheduled together
            Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                list.clear()
                movCtx = MovTasks.createPlayerMovContext()
                if(true){
                    //  signalX =  (currentPos.x < playerPos.x) ? 1 : -1;
                    // signalZ = (currentPos.z < playerPos.z) ? 1 : -1
                    currentPos = Player.getPlayer().getPos()
                
                    backpos = DataHelper.createVec(currentPos.x - (Math.random() * 20) +10, 
                    currentPos.y + 10 + (Math.random() * 10), currentPos.z - (Math.random() * 20)
                     + 10)
                   
                    list2 = MovTasks.generateTpSequence(movCtx.from().getValue(), backpos, false, 200, true)
                     for(let i = 1; i < list2.size(); ++i){
                        list.add(MovTasks.createNotOnGround(list2.get(i)))
                    }
                    bundleList = MovTasks.createMovingPacketsForMovSequence(movCtx.resetTick(), list, false, false);
                    //run with attack
                    for(let i = 0; i < bundleList.size(); ++i){
                        bundleList.get(i).run() 
                    }
                
                
                    list.clear()
                
                    Player.getPlayer().getRaw().setForceNoFall(true)
                    
                }
                if(idx != -1){
                    PacketHelper.sendInventoryPacket(idx, selected, "swap")
                }
               
            }), true, 500)
            Client.waitTick(sleep_unit)
            lastTarget = currentTarget
            currentTarget = null;

                //Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                   
                    
                    // MovTasks.setupAutoResync(backpos, 3) 
              //  }), true, 500)
            return;
           
        }

    }
    
    Client.waitTick(1)
     return;

    
}
const FLAG = "测试自动攻击_1"
const { getItemIdInSlot, 
getIdSlot, getAndMoveMulti, checkTitle, getIdAndMove, getIndexAndMove, 
waitUntilOpen, DebugLogger, getItemCountInSlot, getItemNameInSlot,
 waitUntilMenuChange,getTargetBlock,getNearbyBlock,getHotbarSlot, autoStack, 
 ArrayStream, runSingleRepeat, runSingleLocked } = require('../libs/Mylib.js');

runSingleRepeat(main, FLAG)

















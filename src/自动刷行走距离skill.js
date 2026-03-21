// 通过快捷键触发
Consts.importConstantToContext(context)
$MovTasks = Java.type("me.matl114.hacks.MovTasks")
$MovInfo = Java.type("me.matl114.hacks.MovTasks$MovInfo")


currentPos = Player .getPlayer().getPos()
Chat.log(currentPos)

vec3d3 = DataHelper.createVec(currentPos.x + 50, currentPos.y , currentPos.z)
vec3d4 = DataHelper.createVec(currentPos.x, currentPos.y , currentPos.z)

deltaMovements = new ArrayList()
for (let i = 0 ; i < 4; ++ i){
    deltaMovements.add(MovTasks.createMovInfo(vec3d3, true, false, null)) 
    deltaMovements.add(MovTasks.createMovInfo(vec3d4, true, false, null))
}

GlobalVars.putBoolean("move_abort_signal", false)
if($MovTasks.doingTp == true){
    $MovTasks.doingTp = false
    GlobalVars.putBoolean("move_abort_signal", true)
    Chat.log("ret")
}else{
Chat.log("start")
$MovTasks.doingTp = true
try{
    while(true){
        if(GlobalVars.getBoolean("move_abort_signal") == true){
            Chat.log("Abort")
            GlobalVars.putBoolean("move_abort_signal", false)
            break;
        }
        Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
            MovTasks.farawayMoveFromTo(vec3d4, vec3d4, true, true)
        }))
        for (let i = 0 ; i < 40; ++ i){

            Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                try{
                 $MovTasks.doingTp = false
                MovCtx = MovTasks.createMovContext(currentPos.x, currentPos.y , currentPos.z)
                MovTasks.scheduleMoveSequence(MovCtx, deltaMovements, false, false) //executeTp(vec3d3, 300.0, false, false)
                 $MovTasks.doingTp = true
                }catch(e){
                    Chat.log(e)
                }
              

            }))
    
            // //Client .waitTick(1)
            // Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
            //      MovTasks.doingTp = false
            //     MovTasks.executeTp(vec3d4, 300.0, false, false)
            //      MovTasks.doingTp = true
            // }))
            Client .waitTick(1
            )
    }
    Client .waitTick(1)
    }
}finally{
    $MovTasks.doingTp = false
    
}
}
    

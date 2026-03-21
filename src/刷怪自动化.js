// Chat.log(event)

function do_teleport(entity, log){
    if(GlobalVars.getBoolean("自动刷怪_flag") == true && GlobalVars.getBoolean("自动拾取_flag") != true) {
            GlobalVars.putBoolean("自动拾取_flag", true)
            try{
                if(log){
                    Chat.log("Do teleport")
                    Chat.log(entity.getPos())
                }
                MovTasks = Java.type("me.matl114.hackUtils.MovTasks")
                MovInfo = Java.type("me.matl114.hackUtils.MovTasks$MovInfo")
                ArrayList = Java.type("java.util.ArrayList")
                Method = MovTasks.class.getMethods().filter(function(method) {
                    return method.getName() === "executeTp"
                })[0]
                Vec3d = Method.getParameterTypes()[0]
                Client.waitTick(12)
                currentPos = Player .getPlayer().getPos()   

                vec3d4 = new Vec3d(currentPos.x, currentPos.y , currentPos.z)
                entityPos = entity.getPos()
                vec3d5 = new Vec3d(entityPos.x, entityPos.y  , entityPos.z)
                // deltaMovements = new ArrayList()
                // deltaMovements.add(new MovInfo(vec3d5, true, false, null))
                // deltaMovements.add(new MovInfo(vec3d4, true, false, null))

                Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                                
                    MovTasks.executeTp(vec3d5, 200, false, true) //executeTp

                }))

                Client .waitTick(12)
                if(log){
                    Chat .log("Teleport back")
                }
                // Chat.log(vec3d4)
                Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                                
                    MovTasks.executeTp(vec3d4, 200, false, true) //executeTp

                }))
                Client.waitTick(1)
            }finally{
                GlobalVars.putBoolean("自动拾取_flag", false)
            }
            
        }
}
function check_entity(entity, log, itemlist){
    if(entity.getType() == "minecraft:item"){
    itemid= entity.getContainedItemStack().getItemId()
    for(let i = 0 ; i < itemlist.length ; ++ i){
        if(itemid == itemlist[i]){
            if(log){
            Chat .log("Drop item detected")

            }
            RenderHelper.renderEntity(entity, 100, false, false)
            // if()
            do_teleport(entity, log)
            break;
        }
    }
}
}
function reset(){
    GlobalVars.putBoolean("自动拾取_flag", false)
}
function check_damage(){
    
}

module.exports = {
    check_entity, 
    do_teleport,
    reset
};
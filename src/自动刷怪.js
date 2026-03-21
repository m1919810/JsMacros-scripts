 
 
const { check_entity, reset } = require('./刷怪自动化.js');
const recordId = new Set()

const LOG = false
const FREQ = 10
// const TARGET_ID = "minecraft:wither_skeleton"
// const ELSE_ID = [
//     "minecraft:zombified_piglin",
// "minecraft:blaze"
// ]
// const ITEM_ID = ["minecraft:wither_skeleton_skull"]
const TARGET_ID = "minecraft:husk"
const ELSE_ID = [
     "minecraft:zombie", "minecraft:camel"
     
]
const ITEM_ID = ["minecraft:player_head","minecraft:SENTRY_ARMOR_TRIM_SMITHING_TEMPLATE".toLowerCase(), "VEX_ARMOR_TRIM_SMITHING_TEMPLATE".toLowerCase()]

// const TARGET_ID = "minecraft:zombie"
// const ELSE_ID = [
//     "minecraft:skeleton",
//     "minecraft:creeper",
//     "minecraft:spider"
// ]
// const ITEM_ID = [ "minecraft:rotten_flesh"]

// const TARGET_ID = "minecraft:zombified_piglin"
// const ELSE_ID = [
//     "minecraft:wither_skeleton"
// ]
// const ITEM_ID = [ "minecraft:rotten_flesh"]

if(GlobalVars.getBoolean("自动刷怪_flag") != true){
    GlobalVars.putBoolean("自动刷怪_flag", true)
    CombatTask = Java.type("me.matl114.hackUtils.CombatTasks")
    handle = CombatTask.class.getDeclaredMethods().filter(function(method) {
    return method.getName() === "attackEntity"
})[0]
    handle.setAccessible(true)
    var tick = 0
   
    Chat.log("启动")
    Chat.log("固定玩家位置中...")
    MovTasks = Java.type("me.matl114.hackUtils.MovTasks")
            MovInfo = Java.type("me.matl114.hackUtils.MovTasks$MovInfo")
            ArrayList = Java.type("java.util.ArrayList")
            Method = MovTasks.class.getMethods().filter(function(method) {
                return method.getName() === "executeTp"
            })[0]
            Vec3d = Method.getParameterTypes()[0]
    var pos = Player.getPlayer().getPos()
    reset()
    try{
while(true){
        if(GlobalVars.getBoolean("自动刷怪_pause") !=  false){
            GlobalVars.putBoolean("自动刷怪_pause", false)
             if(LOG){
            Chat .log("Pause")
        
    }
            Client.waitTick(30)
        }
        var currentPos = Player.getPlayer().getPos()
        function distance(pos0){
            var delta = currentPos.sub(pos0

            )
            return delta.x * delta.x + delta.y * delta.y + delta.z * delta.z
        }
        if(tick % 5 == 0){
                
            if(distance(pos) > 10){
                    if(LOG){
                        Chat .log("Reteleporting pos")
                        
                    }
                    var vec3d0 = new Vec3d(pos.x, pos.y, pos.z)
                    Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                     MovTasks.executeTp(vec3d0, 200, false, true)
                }))
                Client.waitTick(1)
                }
        }
       if(tick % FREQ == 0){
            ls = World.getEntities(100, TARGET_ID)
            if(ls.size() > 0){
                
                ls.sort((a, b) => {
                    
                    var d = distance(a.getPos()) - distance(b.getPos())
                    return d < 0 ? -1 : (d > 0 ? 1 : 0)
                })
                wither = ls[0]
                if(LOG){
                Chat.log("Attack")

                }
    
                
                Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                    try{
                    handle.invoke(null, Player.getPlayer().getRaw(), wither.getRaw())
                        
                    }catch(e){
                        Chat.log(e)
                    }
                }))
                
            }else{
                for(let i = 0 ; i < ELSE_ID.length; ++ i){
                    id = ELSE_ID[i]
                    ls = World.getEntities(100, id)
                    if(ls.size() > 0){
                            ls.sort((a, b) => {
                        
                            var d = distance(a.getPos()) - distance(b.getPos())
                            return d < 0 ? -1 : (d > 0 ? 1 : 0)
                        })
                        wither = ls[0]
                        if(LOG){
                        Chat.log("Try Attack else " + id)

                        }
                        
                        Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                            try{
                            handle.invoke(null, Player.getPlayer().getRaw(), wither.getRaw())
                                
                            }catch(e){
                                Chat.log(e)
                            }
                        }))
                        break;
                    }
                }
                //kill blaze to quicker spawn
                
            }
            
        }else if(tick % FREQ ==Math.floor (FREQ/2)){
            //check items

            ls = World.getEntities(80, "minecraft:item")
            ls.sort((a, b) => {
                    
                var d = distance(a.getPos()) - distance(b.getPos())
                return d < 0 ? -1 : (d > 0 ? 1 : 0)
            })
            if(ls.size() > 0){
                for(var i in ls){

                    item = ls[i]
                    uid = item.getUUID()
                    if(!recordId.has(uid)){
                        recordId.add(uid)
                    check_entity(item, false, ITEM_ID)

                    }
                }
            }
        }else if(tick % 20 * 60 == 0){
            //check damage
            recordId.clear()

        }
        Client .waitTick(1)
        tick += 1
        if(Player.getPlayer().getPos().y < -16){
            if(LOG){
            Chat .log("Resetting Y")

            }
            var pos2 = Player.getPlayer().getPos()
            var vec3d0 = new Vec3d(pos2.x, pos2.y + 150, pos2.z)
            Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
            MovTasks.executeTp(vec3d0, 200, false, true)}))
            Client.waitTick(5)
            var vec3d0 = new Vec3d(pos.x, pos.y, pos.z)
                Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                MovTasks.executeTp(vec3d0, 200, false, true)}))
        }
        //
        if(GlobalVars.getBoolean("自动刷怪_flag") == false){
            if(LOG){
            Chat .log("Abort")

            }
            break
        }
    }
    }finally{
GlobalVars.putBoolean("自动刷怪_flag", false)
    }
    
}else{
    GlobalVars.putBoolean("自动刷怪_flag", false)
}

// MineTask.doSimpleDetection()
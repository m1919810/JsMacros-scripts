
if(event.item.getItemId() == "minecraft:compass"){

    var item  = event.item;
    var nbt = item.getNBT();
            // Chat.log(nbt)

    if(nbt != null && !nbt.isNull()){
        try{
            var nbt = nbt.resolve("components")[0]
            var loc = nbt.resolve("minecraft:lodestone_tracker.target.pos")[0].asListHelper();
            var world = nbt.resolve("minecraft:lodestone_tracker.target.dimension")[0].asString();
            // Chat.log(world)
            // Chat.log(World.getDimension())
            if(world == World.getDimension()){
                ls = [loc.get(0).asInt(), loc.get(1).asInt(), loc.get(2).asInt()]
                // Chat.log("At " + ls)
                BlockPos = Java.type("net.minecraft.class_2338")
                RenderTask = Java.type("me.matl114.hackUtils.RenderTasks")
                target = Java.type("me.matl114.hackUtils.RenderTasks$CountingBlockSolidTarget")
                pos = Player.getPlayer().getPos()
                
                // Chat.log("0")
                distance = (pos.getX() - ls[0])**2 +  (pos.getZ() - ls[2])**2
            
                distanceSq = Math.sqrt(distance)
           
                Chat.log("Horizontal distance " + distanceSq)
                Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
                    // Chat.log("111")
                    targetIns = new target(new BlockPos(ls[0], ls[1], ls[2]), true, 120)
                    RenderTask.registerVirtualRenderTask(targetIns)
                }))
                // Chat.log("1")
            }
        }catch(e){
            Chat.log(e)
        }
    }
}
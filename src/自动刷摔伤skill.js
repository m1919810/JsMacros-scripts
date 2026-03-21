Chat .log(Java.type("me.matl114.hackUtils.MovTasks"))
MovTasks = Java.type("me.matl114.hackUtils.MovTasks")
Method = MovTasks.class.getMethods().filter(function(method) {
    return method.getName() === "executeTp"
})[0]

Chat.log(Method)
Vec3d = Method.getParameterTypes()[0]
currentPos = Player .getPlayer().getPos()
Chat.log(currentPos)

vec3d3 = new Vec3d(currentPos.x, currentPos.y + 96, currentPos.z)
vec3d4 = new Vec3d(currentPos.x, currentPos.y , currentPos.z)

    
while(true){
    for (let i = 0 ; i < 40; ++ i){
        Client.runOnMainThread(JavaWrapper.methodToJava(()=>{
            MovTasks.executeTp(vec3d3, 300.0, false, false)
            MovTasks.executeTp(vec3d4, 300.0, false, false)
        }))
 
        Client .waitTick(1)
}
Client .waitTick(1)
}
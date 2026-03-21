function findButton(){
     var i = Player.openInventory().getSelectedHotbarSlotIndex()
        find = true
    if (Player.openInventory().getSlot(36 + i).getItemId()!="minecraft:cobblestone"){
        find = false
        for(var  i = 0 ; i < 9 ; ++ i){
            if(Player.openInventory().getSlot(36 + i).getItemId() == "minecraft:cobblestone"){
                Player.openInventory().setSelectedHotbarSlotIndex(i)
                find = true
                break
            }
        }
        if(!find){
            Chat.log("No Button In Hotbars")
            Client.waitTick(20)
        }
    }
}
const putted = new Set()
idx = 0
cnt = 0
while(true){
    Client.waitTick(1)
    idx ++;
     
    var playerPos = Player.getPlayer().getBlockPos();
    for(var i = -3 ; i <= 3 ; ++ i){
        for(var j = -1; j <= 3; ++ j){
            for(var k = -3; k <= 3; ++ k){
                if(i * i + j * j + k * k > 40){

                    continue
                }
                 var testPos = playerPos.offset(i, j, k)
              
                if(!putted.has(testPos) 
                //&& World.getBlock(testPos).getId().endsWith("air")
                 ){
                    var testPosDown = testPos.offset(0, -1, 0)
                    var testDownBlock  = World.getBlock(testPosDown)
                    if(true || 
                    testDownBlock.getId().startsWith("minecraft:air")
                    ){
                        //findButton()
                        Player.interactions().attack(testPos.getX(),
                         testPos.getY(), testPos.getZ(), "up", false
                         )
                         Client.waitTick(5)
                          
                          
                      
                          
                    }
                }
                 putted.add(testPos)
               
            }
        }
    }
    
}
Consts.importConstantToContext(context)


block = Player.interactions().getTargetedBlock()

list = new ArrayList()
for(let i = -5; i <= 5; ++i){
    for(let j = -5; j <= 5; ++j){
        for(let k = -5; k <=5 ; ++k){
            pos = DataHelper.createPos3d(block).add(i,j,k)
            if(World.getBlock(pos).getId().endswith("sign")){
                list.add(pos)
            }
        }
    }
}
for(let i = 0 ; i < list.size(); ++i){
    RenderHelper.renderBlock(pos.x, pos.y, pos.z, 100, true, true)
}




function main(){
    for(let i = 0 ; i < list.size(); ++i){
        block0 = list.get(i)
        Player.interactions().attack(block0.getX(), block0.getY(), block0.getZ(), "up", false)
        Client.waitTick(2)
        Chat.say("all")
        Client.waitTick(2)
        
        for(let i = 0; i < 18; ++i)
        {
        PacketHelper.sendInventoryPacket(23, 0, "throw")
        Client.waitTick(1)
        }
    }
  
}

const FLAG = "zidongbanzhuan_1"
const { getItemIdInSlot, 
getIdSlot, getAndMoveMulti, checkTitle, getIdAndMove, getIndexAndMove, 
waitUntilOpen, DebugLogger, getItemCountInSlot, getItemNameInSlot,
 waitUntilMenuChange,getTargetBlock,getNearbyBlock,getHotbarSlot, autoStack, 
 ArrayStream, runSingleRepeat, runSingleLocked } = require('../libs/Mylib.js');



runSingleRepeat(main, FLAG)



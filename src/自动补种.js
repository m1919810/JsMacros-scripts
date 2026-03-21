const { getItemIdInSlot, getIdSlot, getAndMoveMulti, checkTitle, getIdAndMove, getIndexAndMove, waitUntilOpen, DebugLogger, getItemCountInSlot, getItemNameInSlot, waitUntilMenuChange,getTargetBlock,getNearbyBlock,getHotbarSlot, autoStack, ArrayStream, runSingleRepeat } = require('./Mylib.js');
const { getPos,isMatureNetherWart,getThisPlayerPos,breakBlock,placeBlock } =require('./Worldlib.js')
const INVERSED_CLICK = 0
Chat.log("scan Block:")
var blockv = Player.interactions().getTargetedBlock()

Chat.log("scan complete")

Chat.log("test") 


Chat.log("?") 
function main() {

   
        // if (Player.getCurrentPlayerInput().sneaking == false) {
        //     break;
        // }
        //autoStack(8,"minecraft:oak_sapling")
       // ArrayStream.of(getNearbyBlock(6,block=>isMatureNetherWart(block))).forEach(b=>breakBlock(b))
        Client.waitTick(4)
        // getIdAndMove("minecraft:oak_sapling", 0,45 , 45, 64)
    
        ArrayStream.of(getNearbyBlock(1,block=>block.getId()=="minecraft:dirt")).map(getPos).forEach(b=>b.add(0,1,0)).filter(b=>b.getBlock().getId()=="minecraft:air").forEach(b=>placeBlock(b.getBlockPos(),40))
        
        
       // Client.waitTick(1)
   
    return 1;

}
runSingleRepeat(main, "自动补种_1")

Chat.log("end")
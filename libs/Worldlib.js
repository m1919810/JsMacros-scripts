const {getTargetBlock, getNearbyBlock,getThisPlayer } = require('./Mylib.js');
class PosBuilder{
    constructor(pos){
        this.pos=pos 
        this.isBlockPos=isBlockPos(pos)

    }
    getPos3D(){
        return this.isBlockPos ? pos.toPos3D() : this.pos
    }
    getBlockPos(){
        return this.isBlockPos ? this.pos : this.pos.toBlockPos()
    }
    toBlock(){
        this.pos=this.getBlockPos()
        this.isBlockPos=true
        return this;
    }
    toPos3D(){
        this.pos=this.getPos3D()
        this.isBlockPos=false
        return this;
    }
    getBlock(){
        return World.getBlock(this.getBlockPos())
    }
    add(x,y,z){
        if(this.isBlockPos){
            this.pos=this.pos.offset(x,y,z)
        }else{
            this.pos=this.pos.add(x,y,z)
        }
        return this;
    }
    getX(){
        return this.pos.getX()
    }
    getY(){
        return this.pos.getY()
    
    }
    getZ(){
        return this.pos.getZ()
    }
    copy(){
        return new PosBuilder(this.pos)
    }
}

function getPos(pos){
    return new PosBuilder(pos)
}
function getThisPlayerPos(){
    return getPos(getThisPlayer().getPos())
}

function isBlockPos(pos){
    return pos.getClass().getName().endsWith("BlockPosHelper")
}


function isMatureNetherWart(block){
    return block.getId().endsWith("wart")&&block.getBlockState().get("age")==3
}
function placeBlock(pos,hotBarIndex){
    if(hotBarIndex == 40){
        blockpos = getPos(pos).getBlockPos().down()
        Player.interactions().interactBlock(blockpos.getX(), blockpos.getY(), blockpos.getZ(), "up", true, true)
    }else{
        var index = Player.openInventory().getSelectedHotbarSlotIndex()
        Player.openInventory().setSelectedHotbarSlotIndex(hotBarIndex)
        blockpos = getPos(pos).getBlockPos().down()

        Player.interactions().interactBlock(blockpos.getX(), blockpos.getY(), blockpos.getZ(), "up", false, true)
        Player.openInventory().setSelectedHotbarSlotIndex(index)
    }
   
}

function breakBlock(pos){
    Player.interactions().setTarget(getPos(pos).getBlockPos())
    Player.interactions().breakBlock()//Async(JavaWrapper.methodToJavaAsync((c) => {  }));
    Player.interactions().clearTargetOverride()
}

module.exports ={
    isBlockPos,
    getPos,
    isMatureNetherWart,
    getThisPlayerPos,
    breakBlock,
    placeBlock,
    PosBuilder
}
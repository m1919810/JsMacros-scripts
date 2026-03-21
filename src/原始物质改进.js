const FILL_CONTRNIS_TITLE = "原始物质制造器";
const COMMON_TITLE = "合成"
const NULL_TITLE = ""
const MAX_COUNT = 24
const ROWS = 3;
const { getItemIdInSlot, getIdSlot, getAndMoveMulti, checkTitle, getIdAndMove, getIndexAndMove, waitUntilOpen, DebugLogger, getItemCountInSlot, getItemNameInSlot, waitUntilMenuChange, getTargetBlock, getNearbyBlock, getHotbarSlot, autoStack, ArrayStream } = require('../libs/Mylib.js');
const { getPos, isMatureNetherWart, getThisPlayerPos, breakBlock, placeBlock } = require('../libs/Worldlib.js')
function getAndMoveOne(SlotA,SlotB){
    Player.openInventory().click(SlotA,0) ;
    Player.openInventory().click(SlotB,1) ;
    //1是每个格子分配一个
    //0是均分
    Player.openInventory().click(SlotA,0) ;
}
function checkIfOver() {
    if (Player.openInventory().getSlot(31).getItemId() == "minecraft:end_crystal") {
        return true;
    }
    return false;
}



function ErrorTitle(Title){
    if(Player.openInventory().getContainerTitle()!=Title){
        throw new Error("已关闭界面")
    }
}

function checkSlotNum(slot,num){
    if(Player.openInventory().getSlot(slot).getCount()!=num){
        return false;
    }
    return true;
}
function main(arg){

    waitUntilOpen(COMMON_TITLE);
    while(true){
        if(checkTitle(FILL_CONTRNIS_TITLE)){
            
            for (let i=0;i<9*ROWS;++i){
                if (Player.openInventory().getSlot(i).getItemId()!="minecraft:air"){
                    Player.openInventory().dropSlot(i,true);
                    
                }
            }
            Player.openInventory().dropSlot(31,true);
            if(Player.openInventory().getContainerTitle()!=FILL_CONTRNIS_TITLE){
                return 0;
            }
            Player.openInventory().click(-999,0)
            Client.waitTick(3);
            for(let i=0;i<3;++i){
                for(let j=0;j<9;++j){
                    var slotid=9*i+j;
                    
                   var num_s=9-j
                   if(arg==1){
                    slotid=9*i+8-j;
                   }
                 
                    if (getIndexAndMove(() => (getIdSlot( "minecraft:cobblestone",36,1111)),slotid,num_s)==-1){
                        return -1;
                    }
            
                    for(let s=0;s<20;++s){
                        if(Player.openInventory().getSlot(slotid).getCount()!=0){
                            break;
                        }
                        Client.waitTick(2)
                    }
                    
                        Client.waitTick(1)
                    if(Player.openInventory().getContainerTitle()!=FILL_CONTRNIS_TITLE){
                        return 0;
                    }
                }
                Client.waitTick(1)
               
                
            }
            var count=0;
            while(!checkIfOver()){
                Client.waitTick(2);
                count++;
                if(count>16)break
                if(Player.openInventory().getContainerTitle()!=FILL_CONTRNIS_TITLE){
                    return 0;
                }
            }
            Player.openInventory().dropSlot(31,true);
            if(Player.openInventory().getContainerTitle()!=FILL_CONTRNIS_TITLE){
                return 0;
            }
            Client.waitTick(1);
            Player.openInventory().click(-999,0)
        }
        else break; 
    }
    return 0;
    
}

var block=Player.interactions().getTargetedBlock()
Chat .log("byd");
var i=0
while(true){
    Player.openInventory().close()
    Client.waitTick(10)
    if (Player.getCurrentPlayerInput().sneaking==true ){
        break;
    }
 
    Player.interactions().interactBlock(block.getX(),block.getY(),block.getZ(),"up",false)
    
    var a=main(i)!=-1
    i=(i+1)%2
       
    Client.waitTick(10)
    Player.openInventory().close()
    Client.waitTick(10)
    if (Player.getCurrentPlayerInput().sneaking==true ){
        break;
    }
    Player.interactions().interactBlock(block.getX()-1,block.getY(),block.getZ(),"up",false)
    Client.waitTick(10)
    //Player.openInventory().click(44, 0)
     for(let i=0;i<36;++i){
         Player.openInventory().quick(i)
        Client.waitTick(1)
     }
    
}
Chat.log("end")

const { getIdSlot,getAndMoveMulti,checkTitle } = require('./Mylib.js');


const COMMON_TITLE= "合成"
const STOP_TITLE="合成"
const TITLE="随机量子发生器"
const NULL_TITLE=""
Chat.log("byd");
const MAX_COUNT = 576
const ROWS=6
const PASSWORD="114514"



function main(blockpos){

 
    /*
    Chat.log("1")
    Client.waitTick(20)
    Chat.say("/sf backpack")
    Client.waitTick(20)
    Chat.say("/sf open_guide")
    */
   while(true){
    if(STOP_TITLE == Player.openInventory().getContainerTitle()||NULL_TITLE == Player.openInventory().getContainerTitle()){
        Client.waitTick(1);
    }
    else return -1
   
   while(true){
       try { 
           if ((World.getEntities(0.5, ["minecraft:player"]))[0].getY() > 520){
               Client.waitTick(1)
           }else{
            break;
           }
       } catch (e) {
           Client.waitTick(1)
       }
   }
    Client.waitTick(1)
//    Chat.say("/is")
//     Chat.say("/is")
   Player.openInventory().setSelectedHotbarSlotIndex(0) 
   Player.interactions().interactEntity(blockpos,false)
    Client.waitTick(5)

var cnt=0
   while((World.getEntities(0.5, ["minecraft:player"]))[0].getY()<520){
    
        cnt++;
        Chat .log("wait")
       Player.interactions().interactEntity(blockpos, false)
        Client.waitTick(2)
        if(cnt>200){
            Chat.log("run with out waittime")
            return -2
        }
   }
   var endflag=false
   var slot_2=getIdSlot("minecraft:ender_pearl")
   if(slot_2==-1){
    Chat.log("run with out ender pearl")
    endflag=true
}
   if(Player.openInventory().getSlot(44).getCount()<=2){
    
    var slot_=getIdSlot("SF_MOMOTECH_QUANTUM")
    if(slot_==-1){
        Chat.log("run with out quantum")
        endflag=true
    }
    else if(slot_!=44){
        Chat.log(slot_)
   
    Player.openInventory().click(slot_,0)
    Player.openInventory().click(44,0)
    Player.openInventory().click(slot_,0)

    }
    else{ 
        Chat.log("run with out quantum 2")
        endflag=true

    }
    }
    
   Player.openInventory().setSelectedHotbarSlotIndex(8) 
   //Chat.log(Player.openInventory().getSlot(44).getCount())
   
    Client.waitTick(1)
    Player.interactions().interact()
    if(endflag)return -2
    
   
   Client.waitTick(4)
}


}
function mainloop(b1,b2,b3){
    var vart
    while((vart=main(b1))==-2){
        Chat.log("one loop end with"+vart.toString())
        Client.waitTick(20)
        // Player.openInventory().setSelectedHotbarSlotIndex(0) 
        // Client.waitTick(20)
        // Player.openInventory().close()
        // Player.interactions().interactBlock(b2.getX(),b2.getY(),b2.getZ(),"up",false)
        // Client.waitTick(5)
        // Chat.log(Player.openInventory().getContainerTitle())
        // if(checkTitle("普通的存储单元")){
        //     for(let i=0;i<9;++i){
        //         var slot=getIdSlot("SF_MOMOTECH_QUANTUM",0,54);
        //         if(slot==-1)return -1
        //         Player.openInventory().quick(slot)
        //         Client.waitTick(1)
        //     }
        // }
        // else return -3
        // Player.openInventory().close()
        // Client.waitTick(20)
        // if (Player.getCurrentPlayerInput().sneaking==true ){
        //     break;
        // }
        // Player.interactions().interactBlock(b3.getX(),b3.getY(),b3.getZ(),"up",false)
        // Client.waitTick(5)
        // if(checkTitle("普通的存储单元")){
        //     for(let i=0;i<20;++i){
        //         var slot=getIdSlot("minecraft:ender_pearl",0,54);
        //         if(slot==-1)return -1
        //         Player.openInventory().quick(slot)
        //         Client.waitTick(1)
        //     }
        // }
        // else return -5
        // Player.openInventory().close()
        Client.waitTick(20)
        if (Player.getCurrentPlayerInput().sneaking==true ){
            break;
        }

    }return 1
}
Chat.log("scan Entity:")
Client.waitTick(20)
var blockt=Player.interactions().getTargetedEntity()
Chat.log("get one"+blockt.getType() );
Chat.log("scan Block:")
Client.waitTick(20)
var blockv=Player.interactions().getTargetedBlock()
blockv1=blockv.east()
blockv2=blockv.west()
var a=mainloop(blockt,blockv2,blockv1);
Chat.log("终止辣牢底 返回值"+a.toString());
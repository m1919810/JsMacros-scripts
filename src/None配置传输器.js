
// const FILL_CONTRNIS_TITLE = "None 制造器";
const FILL_CONTRNIS_TITLE2 = "网络推送器";
const COMMON_TITLE= "合成"
const NULL_TITLE= ""
const MAX_COUNT = 9
const ROWS =2
const MAP=["SF_COPPER_DUST","SF_IRON_DUST","SF_ALUMINUM_DUST","SF_TIN_DUST","SF_ZINC_DUST","SF_SILVER_DUST","SF_LEAD_DUST","SF_MAGNESIUM_DUST",
    //"SF_MOMOTECH_EMPTY_SHELL"
    "minecraft:cobblestone"
]
function remap(i){
    if(i>=0&&i<8){
        return MAP[7-i]
    }
    else return MAP[8]
}
const { getIdSlot,getAndMoveMulti ,checkTitle, getIdAndMove, getIdAndMoveRange} = require('./Mylib.js');


function mainAction(){
    Chat.log("Start")
    for (let i = MAX_COUNT - 1;i >= 0 ; --i){
    
        //  waitUntilOpen()
        //   if (FILL_CONTRNIS_TITLE != Player.openInventory().getContainerTitle()){
        //     Player.openInventory().close();
        //     return -1
        //   }
        //   else{
           
            // Player.openInventory().click(1,0)
            // Player.openInventory().click(1,0)
            // Player.openInventory().click(9,0)
            // Player.openInventory().click(9,0)
            // Player.openInventory().click(11,0)
            // Player.openInventory().click(11,0)
            // Player.openInventory().click(19,0)
            // Player.openInventory().click(19,0)
            
    
            // Player.openInventory().click(10,0)
            // Player.openInventory().click(39,0)
            // var sum=i
            //var id_=MAP[i]
            var id_=MAP[i]
            // for(let j=0;j<8;++j){
            //     Player.openInventory().click(30,1)
            // }
            // for(let j=0;j<i+1;++j){
            // Player.openInventory().click(48,0)
            // }
            // Chat.log(i);
            // Chat.log(id_);
    
            getIdAndMoveRange(id_, 18,99, i,i+1)
            Client.waitTick(1)
            // Chat.log(id_)
            // Chat.log(getIdSlot(id_))
            // getAndMoveMulti(getIdSlot(id_),36,1)
              
    
            
          }
         // Player.openInventory().close();
         for(var i = 0 ; i < 50; ++ i){
            if(Player.openInventory().getSlot(13).getItemId() == "minecraft:air"){
                Client.waitTick(1);
            }else{
                break
            }
         }
    
          Player.openInventory().dropSlot(13)
}

function main(){

while (COMMON_TITLE == Player.openInventory().getContainerTitle()) {
    Client.waitTick(3);
}
do{
    mainAction()
   if(COMMON_TITLE == Player.openInventory().getContainerTitle()) {
        return;
    }
}while(true);

}

function main2(){

    while (COMMON_TITLE == Player.openInventory().getContainerTitle()) {
        Client.waitTick(3);
    }
    waitUntilOpen()
    if (FILL_CONTRNIS_TITLE != Player.openInventory().getContainerTitle()){
      Player.openInventory().close();
      return -1
    }
    else{
      Chat.log("ready");
     
      Player.openInventory().click(1,0)
     
      Player.openInventory().click(9,0)
      Player.openInventory().click(9,0)
      Player.openInventory().click(11,0)
      //Player.openInventory().click(11,0)
  
  
      Player.openInventory().click(19,0)
   
      Client.waitTick(2);
      for(let j=0;j<8;++j){
          Player.openInventory().click(30,1)
          Player.openInventory().click(3,1)
      }
      Client.waitTick(2);

    }
    Player.openInventory().close();
    Client.waitTick(10);
    for (let i=0;i<MAX_COUNT;++i){
        
         waitUntilOpen()
          if (FILL_CONTRNIS_TITLE != Player.openInventory().getContainerTitle()){
            Player.openInventory().close();
            return -1
          }
          else{
            Chat.log(i);
           
            Player.openInventory().click(1,0)
            Player.openInventory().click(1,0)
           // Player.openInventory().click(9,0)
            //Player.openInventory().click(9,0)
            Player.openInventory().click(11,0)
            Player.openInventory().click(11,0)
            Player.openInventory().click(19,0)
            Player.openInventory().click(19,0)
            
    
            //Player.openInventory().click(10,0)
            Player.openInventory().click(39,0)
            var sum=i
            //var id_=MAP[i]
           // var id_=remap(i)
            for(let j=0;j<8;++j){
                Player.openInventory().click(30,1)
            }
            for(let j=0;j<i+1;++j){
            Player.openInventory().click(48,0)
            }
            Client.waitTick(2)
           // Chat.log(id_)
            //Chat.log(getIdSlot(id_))
            //getAndMoveMulti(getIdSlot(id_),36,1)
              
            
           // Client.waitTick(10);
            
          }
          Player.openInventory().close();
          Client.waitTick(2);
    }
    fix2()
}
function fix2(){
    Chat.log("network");
    for (let i=0;i<MAX_COUNT;++i){
        
        waitUntilOpen()
         if (FILL_CONTRNIS_TITLE2 != Player.openInventory().getContainerTitle()){
           Player.openInventory().close();
           return -1
         }
         else{
           Chat.log(i);
          
           
           
   
           //Player.openInventory().click(19,0)
           Player.openInventory().click(21,0)
         
           var sum=i
           //var id_=MAP[i]
           var id_=remap(i)
           
           Client.waitTick(2)
           Chat.log(id_)
           Chat.log(getIdSlot(id_))
           getAndMoveMulti(getIdSlot(id_),24,1)
             
           
           Client.waitTick(10);
           
         }
         Player.openInventory().close();
         Client.waitTick(4);
   }
}
function fix(){

    while (COMMON_TITLE == Player.openInventory().getContainerTitle()) {
        Client.waitTick(3);
    }
    for (let i=0;i<MAX_COUNT;++i){
        
         waitUntilOpen()
          if (FILL_CONTRNIS_TITLE != Player.openInventory().getContainerTitle()){
            Player.openInventory().close();
            return -1
          }
          else{
            Chat.log(i);
            Player.openInventory().click(0,0)
            Player.openInventory().click(18,0)
            Player.openInventory().click(18,0)
            Client.waitTick(2);
            for(let j=0;j<8;++j){
                Player.openInventory().click(30,1)
                Player.openInventory().click(3,1)
            }
            Client.waitTick(2);
          Player.openInventory().close();
          Client.waitTick(10);
    }
}
}
if(event.slot == - 999 && checkTitle("NONE 制造器") ){
    mainAction()
Chat.log("end")

}
// //main()
// main()
// //fix2()
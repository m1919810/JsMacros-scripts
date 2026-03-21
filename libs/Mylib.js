const ItemType={
    SLIMEFUN:2,
    CUSTOM:1,
    VANILLA:0
}
class DebugLogger{
    constructor(str1,print_method){
        this.prefix=str1
        if(print_method==null){
           print_method =((i)=>Chat.log(i))
        }
        this.print=print_method

    }
    info(i){
        this.print('['+this.prefix+'] '+i.toString())
        return this
    }
}
logger=new DebugLogger("MyLib")
class ItemResolved{
    constructor(Id){
        if (Id.length>=3&&Id[0]=='S'&&Id[1]=='F'&&Id[2]=='_'){
            this.id=Id.substring(3)
            this.type=ItemType.SLIMEFUN
        }
        //CS_<ID>
        else if (Id.length>=3&&Id[0]=='C'&&Id[1]=='S'&&Id[2]=='_'){
            this.id=Id.substring(3)
            this.type=ItemType.CUSTOM
        }
        //默认mcid
        else{
            this.id=Id 
            this.type=ItemType.VANILLA
        }
       
    }
    static generateId(itemstack){
        var nbt=itemstack.getNBT()
        
        if(nbt==null ){
            return itemstack.getItemId()
        }
        var nbt1=nbt.resolve("components.minecraft:custom_data.PublicBukkitValues.\"slimefun:slimefun_item\"")
        if(nbt1!=null &&nbt1.length==1&&nbt1[0]!=null){
            return "SF_"+nbt1[0].asString()
        }
       
        //默认是如果有nbt写名字就自动设为ItemType.CUSTOM
        var nbt_name=nbt.resolve("display.Name")
        if(nbt_name!=null ){
        
            return "CS_"+itemstack.getName().getString()
        }
        return itemstack.getItemId()
    }
    //实际上可以用任意一种方式解析物品，
    //SF>CS>VA
    static generateTypeId(itemstack,type){
        switch(type){
            case ItemType.VANILLA: return itemstack.getItemId ()
            case ItemType.CUSTOM: return "CS_"+itemstack.getName().getString()
            case ItemType.SLIMEFUN: try {
               
               return  "SF_"+(itemstack.getNBT().resolve("components.minecraft:custom_data.PublicBukkitValues.\"slimefun:slimefun_item\""))[0].asString()
            
            }
            catch(e){
                throw new Error("不符合类型的物品!")
            }return 0
            default: return -1
        }
    }
    static decorateId(id,type){
        switch(type){
            case ItemType.VANILLA: return id
            case ItemType.CUSTOM: return "CS_"+id
            case ItemType.SLIMEFUN: 
                return "SF_"+id
           
            default: return -1
        }
    }
    //在对比的时候我们只需要在type维度上让物品匹配就行
    matchItem(itemstack){
        try{
    
            return ItemResolved.decorateId(this.id,this.type)==ItemResolved.generateTypeId(itemstack,this.type)
        }catch(e){
            return false
        }
    }
}
class CustomItemResolved extends ItemResolved{

    constructor(predicate){
        super("null")
        this.predicate = predicate;
    }
    matchItem(itemstack){
        try{
            return this.predicate(itemstack)
        }catch(e){
            return false
        }
    }

}
function hasName(item){
    return item.getNBT() != null && item.getNBT().resolve("display.Name") != null
}



function getAndMoveMulti(SlotA,SlotB,Num){
    
    var num2=Player.openInventory().getSlot(SlotA).getCount();
    var num3=Num;
    Num=Math.min(Num,num2);
    var left=0;
    

    if(Num<num3){
        left=num3-Num
    }
    Player.openInventory().click(SlotA,0) ;
    for( let i=0;i<Num;++i){
    Player.openInventory().click(SlotB,1) ;
    }
    //1是每个格子分配一个
    //0是均分
    //Client.waitTick(1);
    Player.openInventory().click(SlotA, 0);
    // if(Player.openInventory().getSlot(SlotA).getCount()==0)
        
    // else
    //     Player.openInventory().click(-999,0)
    //Client.waitTick(1);
    return left;
}
function getItemIdInSlot(slot){
    var item=Player.openInventory().getSlot(slot)
    return ItemResolved.generateId(item)
}
function getItemNameInSlot(slot){
    return Player.openInventory().getSlot(slot).getName().getString()
}
function getItemCountInSlot(slot){
    return Player.openInventory().getSlot(slot).getCount()
}
//latest version
//very clear
//support args
function getIdSlot(){
    if(arguments.length==2||arguments.length<=0) throw Error("InvalidArguments")
    var limitIds=[];
    var slot1,slot2;
    if(arguments.length==1){
        slot1=-1;slot2=999
        limitIds.push(arguments[0] instanceof ItemResolved ? arguments[0]: new ItemResolved(arguments[0]))
    }
    else {
        for(let i=0;i<arguments.length-2;++i){
            limitIds.push(arguments[i] instanceof ItemResolved ? arguments[i] : new ItemResolved(arguments[i]))
        }
        slot1=arguments[arguments.length-2]
        slot2=arguments[arguments.length-1]
    }
    

    var slots= Player.openInventory().getItems()
   
    if (slots.length<=0){

       return -1;
    }
    else{
   
        totalSlot=Player.openInventory().getTotalSlots() 
        for (let i = Math.min(slot2, totalSlot) -1; i >= Math.max(slot1, 0);--i){     
                flag=true   
               for(let j=0;j<limitIds.length;++j){
              
                
                    if(limitIds[j].matchItem(Player.openInventory().getSlot(i))==false){

                        flag=false;break

                    }    
               }
               if(flag==true){
                return i;
               }
        }
        return -1;
    }

}
function getIdSlots(){

    if(arguments.length==2||arguments.length<=0) throw Error("InvalidArguments")
    var limitIds=[];
    var slot1,slot2;
    var result=[]
    if(arguments.length==1){
        slot1=-1;slot2=999
    }
    else {
        for(let i=0;i<arguments.length-2;++i){
            limitIds.push(arguments[i] instanceof ItemResolved? arguments[i]: new ItemResolved(arguments[i]))
        }
        slot1=arguments[-2]
        slot2=arguments[-1]
    }
    var slots= Player.openInventory().getItems()
    
    if (slots.length<=0){
       return result;
    }
    else{
        totalSlot=Player.openInventory().getTotalSlots() 
        
        for(let i=Math.max(slot1,0);i<Math.min(slot2,totalSlot);++i){     
                flag=true       
               for(let j=0;j<limitIds.length;++j){
                    if(limitIds[j].matchItem(Player.openInventory().getSlot(i))==false){
                        flag=false;break

                    }    
               }
               if(flag==true){
                result.push(i)
               }
        }
        
    }
    return result

}
function getFliterSlot(Fliter){
    Fliter1=Fliter
    try{
        Fliter1(new ItemStackHelper ("minecraft:stone", 1) )
    }catch(e){
        Fliter=(()=>{return false})
    }
    var slots= Player.openInventory().getItems()
    if (slots.length<=0){
       return -1;
    }
    else{
        totalSlot=Player.openInventory().getTotalSlots() 
        for(let i=Math.max(slot1,0);i<Math.min(slot2,totalSlot);++i){     
    
            if(Fliter(Player.openInventory().getSlot(i))==true){
                return i;
            }
               
        }
        return -1;
    }

}
function getFliterSlots(Fliter){
    Fliter1=Fliter
    try{
        Fliter1(new ItemStackHelper ("minecraft:stone", 1) )
    }catch(e){
        Fliter=(()=>{return false})
    }
    var slots= Player.openInventory().getItems()
    var result=[]
    if (slots.length<=0){
       return result;
    }
    else{
        totalSlot=Player.openInventory().getTotalSlots() 
        for(let i=Math.max(slot1,0);i<Math.min(slot2,totalSlot);++i){     
    
            if(Fliter(Player.openInventory().getSlot(i))==true){
                result.push(i);
            }
               
        }
        return result;
    }
    return result

}
function waitUntilOpen(t){
    while (t == Player.openInventory().getContainerTitle() || (t == "合成" && Player.openInventory().getContainerTitle() == "")) {
        Client.waitTick(10);
    }
}
function checkTitle(Title){
    //Chat.log("abab"+Player.openInventory().getContainerTitle()+"abab")
    if (Player.openInventory().getContainerTitle().startsWith(Title) || (Title == "合成" && Player.openInventory().getContainerTitle()=="")){
        return true ;
    }
    else return false;
}
function errorTitle(Title){
    if (Player.openInventory().getContainerTitle() != Title || (Title == "合成" && Player.openInventory().getContainerTitle() != "")){
        throw new Error("已关闭界面")
    }
}
function indexFactoryBuilder(){
    return ()=>(getIdSlot.apply(this,arguments))
}
function getIndexAndMove(IndexFactory,SlotB,Num){

    var i3=IndexFactory();

if (i3==-1){
    return -1;
}
//fixme when full, stop move
    Num=getAndMoveMulti(i3,SlotB,Num);
  

while(Num>0){
    Client.waitTick(3);

        var i3=IndexFactory();
        if (i3==-1){
            return -1;
        }
  
    Num=getAndMoveMulti(i3,SlotB,Num);    
}
return 0;
}
function getIdAndMove(id,SlotB,Num){
    
    getIndexAndMove(indexFactoryBuilder(id),SlotB,Num)
}
function getIdAndMoveRange(id, fromSlot,toSlot , SlotB, Num) {
    getIndexAndMove(indexFactoryBuilder(id,fromSlot,toSlot), SlotB, Num)
}

function makePattern(){
    var needcheck=false
    if(arguments.length==1){
        return
    }
}
function fillPattern(){

}
function waitUntilMenuChange(runnable,waitTick) {
    var a = Player.openInventory().getCurrentSyncId()
    runnable()
    for (let i = 0; i < waitTick; ++i) {
        if (Player.openInventory().getCurrentSyncId() != a) {
            return true
        }
        Client.waitTick(1)
    }
    throw Error("change Inventory failed")
}



function getTargetBlock(){
    return Player.interactions().getTargetedBlock()
}
function getThisPlayer(){
    return Player.getPlayer()
}
function getNearbyBlock(distance,blockPredicate){
    var playert = getThisPlayer()
    var scanlist = []
    var box=Math.ceil(distance)
    for (let i = -box; i <= box; ++i) {
        for (let j = -box; j <= box; ++j) {
            for (let k = -box; k <= box; ++k) {
                var block = World.getBlock( Math.floor(playert.getX() + i), Math.floor(playert.getY() + j), Math.floor(playert.getZ() + k))
                if (blockPredicate(block)) {
                    scanlist.push(block.getBlockPos())
                }
            }
        }
    }
    return scanlist
}
class SCREENTYPE{
    static GENERIC_CONTAINER=[
        new SCREENTYPE(45, false),
        new SCREENTYPE(54, false),
        new SCREENTYPE(63, false),
        new SCREENTYPE(72, false),
        new SCREENTYPE(81, false),
        new SCREENTYPE(90, false),
    ]
    static DOUBLE_CHEST=this.GENERIC_CONTAINER[5]
    static CHEST=this.GENERIC_CONTAINER[2]
    static BACKPACK=new SCREENTYPE(46,true)
    static CRAFT_TABLE=new SCREENTYPE(46,false)
    static CONTAINER3X3=this.GENERIC_CONTAINER[0]
    static FURNACE=new SCREENTYPE(39,false)
    static ENCHANTER=new SCREENTYPE(38,false)
    static getUnknown(size){
        return new SCREENTYPE(size,false)
    }
    static getChest(line){
        return this.GENERIC_CONTAINER[line-1]
    }
    constructor(size,hasOffhand){
        this.size=size;
        this.offhand=hasOffhand
    }
    getSize(){
        return this.size;
    }
    hasOffhand(){
        return this.offhand
    }
    getHotbarSlot(index){
        return this.size-9-(this.offhand?1:0)+index
    }
}
function hasOffhandInScreen(screenType){

}
function getScreenType(){
    invCls=Player.openInventory().getClass().getName()
    if(invCls.endsWith("PlayerInventory")){
        return SCREENTYPE.BACKPACK
    }
    else if (invCls.endsWith("CraftingInventory")) {
        return SCREENTYPE.CRAFT_TABLE
    }
    else if (invCls.endsWith("ContainerInventory")) {
        return SCREENTYPE.getChest(Math.floor(Player.openInventory().getTotalSlots()/9) -4)
        //return SCREENTYPE.
    }
    else if (invCls.endsWith("FurnaceInventory")) {
        return SCREENTYPE.FURNACE
    }
    else if (invCls.endsWith("EnchantInventory")) {
        return SCREENTYPE.ENCHANTER
    }
    else{
        return SCREENTYPE.getUnknown(Player.openInventory().getTotalSlots())
    }
}
function getHotbarSlot(hotBarIndex){
    screenType=getScreenType()
    return screenType.getHotbarSlot(hotBarIndex)
}
function autoStack(hotbar,itemId){
    var slot = getHotbarSlot(hotbar);
    // Chat.log(slot)
    // Chat.log(getItemIdInSlot(slot))
    if (getItemCountInSlot(slot) < 16) {
        getIdAndMove(itemId, slot, 64 - getItemCountInSlot(slot))
    } else if (getItemIdInSlot(slot) != itemId) {
        getIdAndMove(itemId, slot, 64)
    }
}
class ArrayStream{
    static of(arr){
        return new ArrayStream(arr)
    }
    constructor(arr){
        this.array=arr
    }
    toArray(){
        return this.array;
    }
    forEach(f){
        this.array=forEach(this.array,f)
        return this
    }
    map(mapper){
        this.array=map(this.array,mapper)
        return this
    }
    filter(f){
        this.array=filter(this.array,f)
        return this
    }
}
function forEach(array,callback){
    array.forEach((val,idx,arr)=>callback(val))
    return array;
}
function map(array,mapper){
    return array.map(mapper)
}
function filter(array,filter){
    return array.filter((val,idx,arr)=>filter(val))
}

function runSingleRepeat(loop, flag){
    
    if(GlobalVars.getBoolean(flag) != true){
        GlobalVars.putBoolean(flag , true)
        Chat.log("Start")
        while(true){
            if(GlobalVars.getBoolean(flag) != true){
                Chat.log("Abort")
                return
            }
            var ret = loop()
            if(ret == false){
                Chat.log("Exit")
                return
            }


        }
    }else{
        GlobalVars.putBoolean(flag, false)
    }
}

function runSingleLocked(task, flag){
    if(GlobalVars.getBoolean(flag) != true){
        GlobalVars.putBoolean(flag , true)
        try{
    
            task()
        }finally{
             GlobalVars.putBoolean(flag, false)
        }
    
    }else{
       
    }
}

module.exports = {
    getItemIdInSlot,
    getIdSlot,
    getIdSlots,
    getAndMoveMulti,
    waitUntilOpen,
    checkTitle,
    errorTitle,
    indexFactoryBuilder,
    getIndexAndMove,
    getIdAndMove,
    getIdAndMoveRange,
    getFliterSlot,
    getFliterSlots,
    getItemCountInSlot,
    getItemNameInSlot,
    waitUntilMenuChange,
    getTargetBlock,
    getThisPlayer,
    getNearbyBlock,
    getHotbarSlot,
    autoStack,
    hasName,
    runSingleRepeat,
    runSingleLocked,
    DebugLogger,
    ArrayStream,
    ItemType,
    ItemResolved,
    CustomItemResolved
};
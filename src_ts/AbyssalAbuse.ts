import { Color,Item, Debug, Entity, EntityManager, EventsSDK, Game, Hero, MenuManager, Modifier, RendererSDK, Unit, Vector2, Ability, LocalPlayer } from 'wrapper/Imports';
let { MenuFactory } = MenuManager
const menu = MenuFactory("Abyssal Abuser"),
    active = menu.AddToggle("Active")

let myHero: Hero = undefined,
    lock = false,
    recipeC = false,
    bashC = false,
    vanguardC = false,
    checkAbys = false,
    arModifiers: Map<Modifier,number> = new Map() //as Array<[Modifier,number]>
EventsSDK.on("BuffAdded",(npc,buff)=>{
    if(active.value && buff.Name === "modifier_bashed" && buff.Ability.Owner === myHero){
        arModifiers.set(buff,buff.DieTime)
        checkAbyss()
    }
})
function checkAbyss(){
    const abys = myHero.GetItemByName('item_abyssal_blade')
    if(!lock && abys !== undefined && myHero.Inventory.HasFreeSlots(0,8,2)){
        myHero.DisassembleItem(abys,false)
        lock = true
        recipeC = true
        bashC = true
        vanguardC = true
        checkAbys = false
    }else if(abys === undefined){
        if(recipeC || bashC || vanguardC)
            checkAbys = false
        else
            checkAbys = true
    }
}
EventsSDK.on("Tick",()=>{
    if(!active.value || !Game.IsInGame || Game.IsPaused || LocalPlayer.Hero === undefined || !LocalPlayer.Hero.IsAlive)
        return false
    if(arModifiers.size > 0){
        let cache: Modifier[] = [],
            arForDelete: Modifier[] = []
        // loop-optimizer: KEEP
        arModifiers.forEach((time,buff)=>{
            if(!time || !buff.DieTime){
                arForDelete.push(buff)
                return
            }
            if(buff.DieTime !== time){
                cache.push(buff)
                checkAbyss()
            }
        })
        cache.some(buff=>{
            arModifiers.set(buff,buff.DieTime)
        })
        arForDelete.some(buff=>{
            arModifiers.delete(buff)
        })
    }
    if(!lock && !checkAbys)
        return false
    if(checkAbys){
        checkAbyss()
        return false
    }
    if(lock){
        if(recipeC){
            const recipe = myHero.GetItemByName('item_recipe_abyssal_blade',true)
            if(recipe !== undefined){
                myHero.ItemSetCombineLock(recipe,false)
                recipeC = false
            }
        }
        if(bashC){
            const bash = myHero.GetItemByName('item_basher',true)
            if(bash !== undefined){
                myHero.ItemSetCombineLock(bash,false)
                bashC = false
            }
        }
        if(vanguardC){
            const vanguard = myHero.GetItemByName('item_vanguard',true)
            if(vanguard !== undefined){
                myHero.ItemSetCombineLock(vanguard,false)
                vanguardC = false
            }
        } 
        if(!recipeC && !bashC && !vanguardC){
            lock = false
        }
    }
    return false
})
EventsSDK.on("GameStarted",hero=>myHero = hero)
EventsSDK.on("GameEnded",()=>{
    myHero = undefined
    lock = false
    recipeC = false
    bashC = false
    vanguardC = false
    checkAbys = false
    arModifiers = new Map()
})
import { ArrayExtensions, Entity, Hero, Utils, Unit, Creep } from "wrapper/Imports"
import { Base } from "./Extends/Helper"
import { Menu_Settings_FindTargetRadius, State } from "./Menu"
import { ComboGameEnded } from "./Module/Combo"
export let Heroes: Hero[] = []
export let Owner: Hero
export let Creeps: Creep[] = []
export let MouseTarget: Hero
export let MyNameHero: string = "npc_dota_hero_nevermore"

import InitDraw from "./Extends/Draw"
import InitItems from "./Extends/Items"
import HitAndRun from "./Extends/HitAndRun"
import InitAbilities from "./Extends/Abilities"
import { HarassGameEdned } from "./Module/Harras"

export const initDrawMap = new Map<Unit, InitDraw>()
export const initItemsMap = new Map<Unit, InitItems>()
export const initHitAndRunMap = new Map<Unit, HitAndRun>()
export const initAbilityMap = new Map<Unit, InitAbilities>()

export function InitMouse() {
	if (!Base.IsRestrictions(State))
		return

	MouseTarget = ArrayExtensions.orderBy(
		Heroes.filter(x => x.IsEnemy() && x.Distance(Utils.CursorWorldVec) <= Menu_Settings_FindTargetRadius.value && x.IsAlive),
		x => x.Distance(Utils.CursorWorldVec),
	)[0]
}
export function GameStarted(hero: Hero) {
	if (Owner === undefined && hero.Name === MyNameHero) {
		Owner = hero
	}
}
function MapClear() {
	initItemsMap.clear()
	initAbilityMap.clear()
	initDrawMap.clear()
	initHitAndRunMap.clear()
	new HitAndRun().ClearVars()
	new InitDraw().GameEndedParticleRemove()
}
export function GameEnded() {
	MapClear()
	Heroes = []
	Owner = undefined
	MouseTarget = undefined
	ComboGameEnded()
	HarassGameEdned()
	MyNameHero = "npc_dota_hero_nevermore"
}

export function EntityCreated(x: Entity) {
	if (x instanceof Hero && !x.IsIllusion) {
		Heroes.push(x)
	}
	if (x instanceof Creep) {
		Creeps.push(x)
	}
}

export function EntityDestroyed(x: Entity) {
	if (x instanceof Hero) {
		ArrayExtensions.arrayRemove(Heroes, x)
	}
	if (x instanceof Creep) {
		ArrayExtensions.arrayRemove(Creeps, x)
	}
}
export function Tick() {
	let initItems = initItemsMap.get(Owner)
	if (initItems === undefined) {
		initItems = new InitItems(Owner)
		initItemsMap.set(Owner, initItems)
	}
	let initAbility = initAbilityMap.get(Owner)
	if (initAbility === undefined) {
		initAbility = new InitAbilities(Owner)
		initAbilityMap.set(Owner, initAbility)
	}
	let initDrawBase = initDrawMap.get(Owner)
	if (initDrawBase === undefined) {
		initDrawBase = new InitDraw(Owner)
		initDrawMap.set(Owner, initDrawBase)
	}
	let initinitHitAndRun = initHitAndRunMap.get(Owner)
	if (initinitHitAndRun === undefined) {
		initinitHitAndRun = new HitAndRun(Owner)
		initHitAndRunMap.set(Owner, initinitHitAndRun)
	}
}
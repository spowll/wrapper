import { State, AutoStealState, AutoStealAbility, BladeMailCancel } from "../Menu";
import { Base } from "../Extends/Helper";
import { Heroes, Owner } from "../Listeners";
import InitAbility from "../Extends/Abilities"
import { Ability, Hero, TickSleeper } from "wrapper/Imports";

function IsReadySteal(ability: Ability, target: Hero) {
	return ability !== undefined 
		&& AutoStealAbility.IsEnabled(ability.Name) && target.IsAlive
		&& ability.CanBeCasted() && Owner.Distance2D(target) <= ability.CastRange
}
let Sleep: TickSleeper = new TickSleeper
export function InitAutoSteal() {
	if (!Base.IsRestrictions(State) || !AutoStealState.value || Sleep.Sleeping) {
		return false
	}
	let target = Heroes.sort((a, b) => b.Distance2D(Owner) - a.Distance2D(Owner))
		.filter(x => x.IsValid && x.IsAlive && x.IsEnemy())
		.find(e => !e.IsMagicImmune && !e.IsInvulnerable)	
	if (target === undefined) {
		return false
	}
	if (BladeMailCancel.value && target.HasModifier("modifier_item_blade_mail_reflect")) {
		return false
	}
	let Abilities = new InitAbility(Owner)
	let DMG_TYPE_LAGUNA = Owner.HasScepter 
		? DAMAGE_TYPES.DAMAGE_TYPE_PURE 
		: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL,
		Laguna = Abilities.LagunaBlade,
		DraGonSlave = Abilities.DragonSlave,
		StealDMDraGonSlave = Owner.CalculateDamage(DraGonSlave.AbilityDamage, DraGonSlave.DamageType, target),
		StealDMGLaguna = Owner.CalculateDamage(Laguna.AbilityDamage, DMG_TYPE_LAGUNA, target)

	let Prediction = target.VelocityWaypoint((DraGonSlave.CastPoint * 2) + GetAvgLatency(Flow_t.OUT))
	if (!target.IsMagicImmune
		&& target.HP < StealDMDraGonSlave
		&& IsReadySteal(DraGonSlave, target)
	) {
		DraGonSlave.UseAbility(Prediction)
		Sleep.Sleep(Abilities.Tick)
		return true
	}
	if (target.HP < StealDMGLaguna
		&& IsReadySteal(Laguna, target) && Owner.Distance2D(target) <= Laguna.CastRange) {
		Laguna.UseAbility(target)
		Sleep.Sleep(Abilities.Tick)
		return true
	}

	if (target.HP < (StealDMDraGonSlave + StealDMGLaguna)
		&& Owner.Mana >= (DraGonSlave.ManaCost + Laguna.ManaCost)
		&& IsReadySteal(DraGonSlave, target) && IsReadySteal(Laguna, target)) {
		Laguna.UseAbility(target)
		Sleep.Sleep(Abilities.Tick)
		return true
	}	
	return false
}

export function AutoStealGameEnded() {
	Sleep.ResetTimer()
}
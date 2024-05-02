import { Ability } from "../../Objects/Base/Ability"
import { Entity } from "../../Objects/Base/Entity"
import { Item } from "../../Objects/Base/Item"
import { NeutralSpawner, NeutralSpawners } from "../../Objects/Base/NeutralSpawner"
import { Unit, Units } from "../../Objects/Base/Unit"
import { Wearable } from "../../Objects/Base/Wearable"
import { GameState } from "../../Utils/GameState"
import { EventsSDK } from "../EventsSDK"
import { Prediction } from "../Prediction/Prediction"

const Monitor = new (class CPreUnitChanged {
	public Tick(dt: number) {
		for (let index = Units.length - 1; index > -1; index--) {
			const unit = Units[index]
			// see: https://dota2.fandom.com/wiki/Health_Regeneration
			unit.HPRegenCounter += unit.HPRegen * 0.1
			const regenAmount = Math.round(unit.HPRegenCounter.toNumberFixed(1))
			unit.HPRegenCounter -= regenAmount
			unit.HPPrediction = Math.max(Math.min(unit.MaxHP, unit.HP + regenAmount), 0)
			if (!unit.IsVisible) {
				unit.HP = unit.HPPrediction
				unit.Mana = Math.max(
					Math.min(
						unit.MaxMana,
						unit.Mana + unit.ManaRegen * Math.min(dt, 0.1)
					),
					0
				)
			}
			if (!unit.IsWaitingToSpawn) {
				unit.PredictedIsWaitingToSpawn = false
			}
			if (unit.IsVisible) {
				unit.PredictedPosition.CopyFrom(unit.NetworkedPosition)
				unit.LastRealPredictedPositionUpdate = GameState.RawGameTime
				unit.LastPredictedPositionUpdate = GameState.RawGameTime
			}
			unit.AnimationTime += dt * unit.PlaybackRate
			// TODO: interpolate DeltaZ from OnModifierUpdated?
		}
	}

	public PreEntityCreated(entity: Entity) {
		switch (true) {
			// case entity instanceof Item: // owner undefined set in EntityCreated
			// 	this.itemChanged(entity)
			// 	break
			// case entity instanceof Ability: // owner undefined set in EntityCreated
			// 	this.spellChanged(entity)
			// 	break
			case entity instanceof Unit:
				this.unitChanged(entity)
				break
			case entity instanceof Wearable:
				this.unitWearablesChanged(entity)
				break
			case entity instanceof NeutralSpawner:
				this.unitSpawnerChanged(entity)
				break
		}
	}

	public EntityCreated(entity: Entity) {
		switch (true) {
			case entity instanceof Item:
				this.itemChanged(entity)
				break
			case entity instanceof Ability:
				this.spellChanged(entity)
				break
		}
	}

	public EntityDestroyed(entity: Entity) {
		switch (true) {
			case entity instanceof Item:
				this.itemDestroyed(entity)
				break
			case entity instanceof Ability:
				this.spellDestroyed(entity)
				break
			case entity instanceof Wearable:
				this.wariableDestroyed(entity)
				break
			case entity instanceof NeutralSpawner:
				this.unitSpawnerDestroyed(entity)
				break
			case entity instanceof Unit:
				this.spawnerUnitDestroyed(entity)
				break
		}
	}

	public LocalTeamChanged() {
		for (let index = Units.length - 1; index > -1; index--) {
			const unit = Units[index]
			unit.IsVisibleForEnemies_ = Unit.IsVisibleForEnemies(unit)
		}
	}

	public UnitAnimation(
		unit: Unit,
		sequenceVariant: number,
		playbackRate: number,
		castpoint: number,
		activity: number
	) {
		unit.LastActivity = activity
		unit.LastActivitySequenceVariant = sequenceVariant
		unit.LastActivityEndTime = GameState.RawGameTime + castpoint
		unit.LastActivityAnimationPoint = playbackRate * castpoint
	}

	/** ========================== CHANGED ========================== */
	private spellChanged(entity: Ability) {
		if (entity.IsItem) {
			return
		}
		for (let index = Units.length - 1; index > -1; index--) {
			const unit = Units[index]
			for (let i = 0, end = unit.Spells_.length; i < end; i++) {
				if (entity.HandleMatches(unit.Spells_[i])) {
					this.setNewProperty(entity, unit, i)
					EventsSDK.emit("UnitAbilitiesChanged", false, unit)
					break
				}
			}
		}
	}

	private itemChanged(entity: Item) {
		for (let index = Units.length - 1; index > -1; index--) {
			const unit = Units[index]
			for (let i = 0, end = unit.TotalItems_.length; i < end; i++) {
				if (entity.HandleMatches(unit.TotalItems_[i])) {
					this.setNewProperty(entity, unit, i)
					EventsSDK.emit("UnitItemsChanged", false, unit)
					break
				}
			}
		}
	}

	private unitChanged(entity: Unit) {
		entity.CanUseItems = !entity.IsIllusion
		entity.CanUseAbilities = !entity.IsIllusion
		entity.PredictedPosition.CopyFrom(entity.NetworkedPosition)
		entity.LastRealPredictedPositionUpdate = GameState.RawGameTime
		entity.LastPredictedPositionUpdate = GameState.RawGameTime
	}

	private unitWearablesChanged(entity: Wearable) {
		for (let index = Units.length - 1; index > -1; index--) {
			const unit = Units[index]
			for (let i = 0, end = unit.MyWearables_.length; i < end; i++) {
				if (!entity.HandleMatches(unit.MyWearables_[i])) {
					continue
				}
				if (!unit.MyWearables.includes(entity)) {
					unit.MyWearables.push(entity)
					EventsSDK.emit("UnitWearablesChanged", false, unit)
					break
				}
			}
		}
	}

	private unitSpawnerChanged(entity: NeutralSpawner) {
		for (let index = Units.length - 1; index > -1; index--) {
			const unit = Units[index]
			if (entity.HandleMatches(unit.Spawner_)) {
				unit.Spawner = entity
			}
		}
	}

	/** ========================== DESTROYED ========================== */
	private itemDestroyed(entity: Item) {
		const owner = entity.Owner
		if (!(owner instanceof Unit)) {
			return
		}
		for (let i = 0, end = owner.TotalItems.length; i < end; i++) {
			if (entity === owner.TotalItems[i]) {
				owner.TotalItems[i] = undefined
				EventsSDK.emit("UnitItemsChanged", false, owner)
				break
			}
		}
	}

	private spellDestroyed(entity: Ability) {
		if (entity.IsItem) {
			return
		}
		const owner = entity.Owner
		if (!(owner instanceof Unit)) {
			return
		}
		for (let i = 0, end = owner.Spells.length; i < end; i++) {
			if (entity === owner.Spells[i]) {
				owner.Spells[i] = undefined
				EventsSDK.emit("UnitAbilitiesChanged", false, owner)
				break
			}
		}
	}

	private wariableDestroyed(entity: Wearable) {
		const owner = entity.Owner
		if (!(owner instanceof Unit)) {
			return
		}
		if (owner.MyWearables.remove(entity)) {
			EventsSDK.emit("UnitWearablesChanged", false, owner)
		}
	}

	private unitSpawnerDestroyed(entity: NeutralSpawner) {
		for (let index = Units.length - 1; index > -1; index--) {
			const unit = Units[index]
			if (entity === unit.Spawner) {
				unit.Spawner = undefined
			}
		}
	}

	private spawnerUnitDestroyed(entity: Unit) {
		for (let index = NeutralSpawners.length - 1; index > -1; index--) {
			const spawner = NeutralSpawners[index]
			if (entity.Spawner === spawner) {
				entity.Spawner = undefined
			}
		}
	}

	// hack workaround owner abilities
	private setNewProperty(entity: Item | Ability, unit: Unit, arrIndex: number) {
		entity.Owner_ = unit.Handle
		entity.OwnerEntity = unit
		entity.Prediction = new Prediction() as any // TODO
		if (!(entity instanceof Item)) {
			unit.Spells[arrIndex] = entity
			entity.AbilitySlot = arrIndex
			return
		}
		entity.ItemSlot = arrIndex
		unit.TotalItems[arrIndex] = entity
	}
})()

EventsSDK.on("Tick", dt => Monitor.Tick(dt))

EventsSDK.on("LocalTeamChanged", () => Monitor.LocalTeamChanged())

EventsSDK.on("EntityDestroyed", ent => Monitor.EntityDestroyed(ent))

EventsSDK.on("PreEntityCreated", ent => Monitor.PreEntityCreated(ent))

// workaround owner abilities
EventsSDK.on("EntityCreated", ent => Monitor.EntityCreated(ent), Number.MIN_SAFE_INTEGER)

EventsSDK.on(
	"UnitAnimation",
	(
		unit,
		sequenceVariant,
		playbackRate,
		castpoint,
		_type,
		activity,
		_lagCompensationTime
	) => Monitor.UnitAnimation(unit, sequenceVariant, playbackRate, castpoint, activity)
)
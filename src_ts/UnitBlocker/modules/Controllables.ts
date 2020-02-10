import { Entity, Menu as MenuSDK, Unit, Vector3, EntityManager } from "wrapper/Imports"

export let baseCheckUnit = (ent: Unit) =>
	ent.IsAlive
	&& !ent.HasNoCollision
	&& ent.HasMoveCapability(DOTAUnitMoveCapability_t.DOTA_UNIT_CAP_MOVE_GROUND)

export let checkControllable = (ent: Unit) =>
	baseCheckUnit(ent) && ent.IsControllable

export let Controllables = () => EntityManager.GetEntitiesByClass(Unit).filter(unit => baseCheckUnit(unit) && checkControllable(unit))

export let getCenterDirection = (units: Entity[]) =>
	Vector3.GetCenterType(units, unit => unit.InFront(350))

export let MoveUnit = (unit: Unit, pos: Vector3) => {
	unit.MoveTo(pos)
}

export let StopUnit = (unit: Unit) => {
	unit.OrderStop()
}

export default function Menu(root: MenuSDK.Node) {

	const ControllablesTree = root.AddNode(root.name + " - Controllables")

	const StateUnits = ControllablesTree.AddSwitcher("Units", [
		"Local Hero",
		// "Selected Unit(s)",
		"Only controllables",
		"All Controllables",
	])

	const CenterCamera = ControllablesTree.AddToggle("Center Camera").SetTooltip("Centering camera on your hero")
	const CountUnits = ControllablesTree.AddSlider("Number of unit", 3, 1, 10).SetTooltip("Number of units to use")

	return {
		ControllablesTree,
		StateUnits,
		CenterCamera,
		CountUnits,
	}
}

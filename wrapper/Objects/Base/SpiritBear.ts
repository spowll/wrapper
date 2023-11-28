import { WrapperClass } from "../../Decorators"
import { EventsSDK } from "../../Managers/EventsSDK"
import { RegisterFieldHandler } from "../NativeToSDK"
import { Unit } from "./Unit"

@WrapperClass("CDOTA_Unit_SpiritBear")
export class SpiritBear extends Unit {
	/**
	 * @readonly
	 * @return {boolean}
	 */
	public ShouldRespawn = false

	/** @ignore */
	constructor(
		public readonly Index: number,
		serial: number
	) {
		super(Index, serial)
		this.IsSpiritBear = true
	}
}

RegisterFieldHandler(SpiritBear, "m_bShouldRespawn", (unit, newVal) => {
	unit.ShouldRespawn = newVal as boolean
	EventsSDK.emit("UnitPropertyChanged", false, unit)
})

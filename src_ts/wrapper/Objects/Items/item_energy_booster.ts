import Item from "../Base/Item"

export default class item_energy_booster extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_EnergyBooster>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_energy_booster", item_energy_booster)

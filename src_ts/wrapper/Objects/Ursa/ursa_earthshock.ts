import Ability from "../Base/Ability"

export default class ursa_earthshock extends Ability {
	public readonly m_pBaseEntity!: C_DOTA_Ability_Ursa_Earthshock
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("ursa_earthshock", ursa_earthshock)

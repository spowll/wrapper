import Ability from "../Base/Ability"

export default class snapfire_mortimer_kisses extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_Snapfire_MortimerKisses
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("snapfire_mortimer_kisses", snapfire_mortimer_kisses)

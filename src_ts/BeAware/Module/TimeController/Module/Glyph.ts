
import { Units, Owner } from "../Entities"
import { Team, Game, RendererSDK, Vector2, Unit } from "wrapper/Imports"
import { 
	GliphState, 
	GliphSwitcher, 
	DrawTimerGliphState, 
	GliphSwitcherTeam, 
	GliphStateIcon, 
	GliphStateIconColor, 
	DrawTextColor, 
	DrawTextSize, 
	GliphInRange,
	DrawTimerGliphX,
	DrawTimerGliphSize,
	DrawTimerGliphY
} from "../Menu"
import ManagerBase from "../../../abstract/Base"

let Base: ManagerBase = new ManagerBase

function RenderIcon(position_unit: Vector2, path_icon: string, ShrineStateIconColor: any) {
	RendererSDK.Image(path_icon,
		position_unit.SubtractScalar(DrawTextSize.value / 4).Clone().AddScalarY(8).AddScalarX(-25),
		new Vector2(42 / 2, 42 / 2), ShrineStateIconColor.Color,
	)
}

function SelectedGliph(unit: Unit) {
	let buffs = unit.GetBuffByName("modifier_fountain_glyph")
	if (buffs === undefined)
		return false
	let time = buffs.RemainingTime
	if (!unit.IsInRange(Owner, GliphInRange.value) || time <= 0)
		return false
	let position_unit = RendererSDK.WorldToScreen(unit.Position)
	if (position_unit === undefined)
		return false

	let pos_unit_text = unit.Name.includes("healers")
		? position_unit.Clone().AddScalarY(25)
		: position_unit
	if (GliphStateIcon.value) {
		RenderIcon(pos_unit_text, "panorama/images/hud/icon_glyph_small_psd.vtex_c", GliphStateIconColor)
	}
	RendererSDK.Text(
		time.toFixed(1), pos_unit_text, DrawTextColor.Color, "Verdana", DrawTextSize.value, FontFlags_t.ANTIALIAS
	)
}

function SelectedBuilding(x: Unit) {
	switch (GliphSwitcherTeam.selected_id) {
		case 0: return x.IsAlive && SelectedGliph(x)
		case 1: return x.IsAlive && !x.IsEnemy() && SelectedGliph(x)
		case 2: return x.IsAlive && x.IsEnemy() && SelectedGliph(x)
	}
}

export function DrawGlyph() {
	if (GliphState.value) {
		// ============================== Gliph ============================ //
		// loop-optimizer: FORWARD, POSSIBLE_UNDEFINED
		Units.forEach(x => {
			switch (GliphSwitcher.selected_id) {
				case 0: return SelectedBuilding(x)
				case 1: return x.IsLaneCreep && SelectedBuilding(x)
				case 2: return x.IsBuilding && SelectedBuilding(x)
			}
		})
		if (DrawTimerGliphState.value) {
			if (Owner !== undefined) {
				Base.DrawTimer(Owner.Team !== Team.Radiant
					? Game.GlyphCooldownRediant
					: Game.GlyphCooldownDire,
					DrawTimerGliphX, DrawTimerGliphY, DrawTimerGliphSize)
			}
		}
	}
}
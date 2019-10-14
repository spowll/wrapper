import { Unit, RendererSDK, Color, Game, Vector2, Menu, Team } from "wrapper/Imports";
import { Units, Owner, IsShrine } from "./Entities";
import {
	
	State, 
	GliphState,
	GliphSwitcher,
	GliphStateIcon,
	GliphSwitcherTeam,
	GliphStateIconColor,
	GliphInRange, 
	DrawTextSize, 
	DrawTextColor,
	DrawTimerGliphX,
	DrawTimerGliphY,
	DrawTimerGliphState,
	DrawTimerGliphSize,
	
	ShrineState,
	ShrineStateIcon,
	DrawTextSizeShrine,
	DrawTextColorShrine,
	ShrineStateIconColor,
	DrawEnemyOrAllies,
	DrawTextColorShrineIsReady,
	
	RadarState,
	DrawTimerRadarX,
	DrawTimerRadarY,
	RadarTreeSettingsState,
	DrawTimerRadarSize
	
} from "./Menu";

function DrawTimer(Time: number, sliderX: Menu.Slider, sliderY: Menu.Slider, Size: Menu.Slider) {
	if (Time === undefined)
		return false
	let wSize = RendererSDK.WindowSize,
	name = SecondToMin(Time),
	pos = new Vector2(
		wSize.x / 100 * sliderX.value,
		wSize.y / 100 * sliderY.value,
	)
	name = Time <= 0 ? "Is Ready" : name 
	RendererSDK.Text(
		name,
		pos,
		new Color(255, 255, 255, 255),
		"Verdana",
		Size.value,
		FontFlags_t.ANTIALIAS,
	)
}

function RenderIcon(position_unit: Vector2, path_icon: string, ShrineStateIconColor: any) {
	RendererSDK.Image(path_icon,
		position_unit.SubtractScalar(DrawTextSize.value / 4).Clone().AddScalarY(8).AddScalarX(-25),
		new Vector2(42 / 2, 42 / 2), ShrineStateIconColor.Color,
	)
}
// ============================== Gliph ============================ //
function addZeros(x: number) {
	return (x < 10) ? '0' + x : (x < 100) ? '' + x : '0' + x;
}
function SecondToMin(sec: number) {
	return addZeros(Math.floor(sec / 60)) + ':' + addZeros(Math.round(sec % 60))
}
function SelectedBuilding(x: Unit) {
	switch (GliphSwitcherTeam.selected_id) {
		case 0: return x.IsAlive &&  SelectedGliph(x)
		case 1: return x.IsAlive && !x.IsEnemy() && SelectedGliph(x)
		case 2: return x.IsAlive &&  x.IsEnemy() && SelectedGliph(x)
	}
}
function SelectedGliph(unit: Unit) {
	let buffs = unit.GetBuffByName("modifier_fountain_glyph")
	if (buffs === undefined)
		return false
	let time = buffs.RemainingTime
	if (!unit.IsInRange(Owner, GliphInRange.value) || time <= 0)
		return false
	let position_unit = RendererSDK.WorldToScreen(unit.NetworkPosition)
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
// ============================== Shrine ============================ //

function DrawShrineTime(unit: Unit) {
	let abil = unit.GetAbilityByName("filler_ability");
	if (abil === undefined)
		return false
	let Time = SecondToMin(abil.Cooldown),
		position_unit = RendererSDK.WorldToScreen(unit.NetworkPosition)
	if (position_unit === undefined)
		return false
	if (abil.Cooldown <= 0) {
		if (ShrineStateIcon.value) {
			RenderIcon(position_unit, `panorama/images/control_icons/check_png.vtex_c`, ShrineStateIconColor)
		}
		RendererSDK.Text("Is Ready", position_unit, DrawTextColorShrineIsReady.Color, "Verdana", DrawTextSizeShrine.value, FontFlags_t.ANTIALIAS)	
	}
	else{
		if (ShrineStateIcon.value) {
			RenderIcon(position_unit, `panorama/images/status_icons/ability_cooldown_icon_psd.vtex_c`, ShrineStateIconColor)
		}
		RendererSDK.Text(Time, position_unit, DrawTextColorShrine.Color, "Verdana", DrawTextSizeShrine.value, FontFlags_t.ANTIALIAS)
	}
}

export function Draw() {
	if (!State.value || Units.length <= 0) {
		return false
	}
	// ============================== Shrine ============================ //
	if (ShrineState.value) {
		// loop-optimizer: FORWARD, POSSIBLE_UNDEFINED
		Units.filter(x => {
			if (!x.Name.includes("healers")) {
				return false
			}
			switch (DrawEnemyOrAllies.selected_id) {
				case 0: return IsShrine(x)
				case 1: return !x.IsEnemy() && IsShrine(x) //&& CreateRange(x, 500)
				case 2: return x.IsEnemy(Owner) && IsShrine(x) //&& CreateRange(x, 500)
			}
		}).map(DrawShrineTime)
	}
	
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
				DrawTimer(Owner.Team !== Team.Radiant
					? Game.GlyphCooldownRediant
					: Game.GlyphCooldownDire,
				DrawTimerGliphX, DrawTimerGliphY, DrawTimerGliphSize)
			}
		}
	}
	if (RadarState.value) {
		if (RadarTreeSettingsState.value) {
			if (Owner !== undefined) {
				DrawTimer(Owner.Team !== Team.Radiant
					? Game.ScanCooldownRadiant
					: Game.ScanCooldownDire,
				DrawTimerRadarX, DrawTimerRadarY, DrawTimerRadarSize)
			}
		}
	}
}


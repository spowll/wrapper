import { EventsSDK, Game, Menu as MenuSDK } from "./wrapper/Imports"

let Menu = MenuSDK.AddEntry("Misc");

const CameraMaxDistance = 10000;
const CameraMinDistance = 1300;

let CameraTree = Menu.AddNode("Camera"),
	CamDist = CameraTree.AddSliderFloat("Camera Distance", CameraMinDistance, 0, CameraMaxDistance).OnValue(UpdateCameraDistance),
	CamMouseTree = CameraTree.AddNode("Mouse wheel"),
	CamMouseState = CamMouseTree.AddToggle("Active"),
	CamStep = CamMouseTree.AddSliderFloat("Camera Step", 50, 10, 1000),
	Weather = Menu.AddSwitcher("Weather", [
		"Default",
		"Snow",
		"Rain",
		"Moonbeam",
		"Pestilence",
		"Harvest",
		"Sirocco",
		"Spring",
		"Ash",
		"Aurora",
	], 8).OnValue(caller => ConVars.Set("cl_weather", caller.selected_id));

Menu.AddKeybind("Menu (Open/Close)", "Insert").OnPressed(() => MenuSDK.MenuManager.is_open = !MenuSDK.MenuManager.is_open).activates_in_menu = true;


function ReloadScripts() {
	EventsSDK.emit("GameEnded", false);
	global.reload("eTE9Te5rgBYThsO", true);
}

Menu.AddButton("Reload Scripts").OnValue(ReloadScripts);
Menu.AddKeybind("Reload keybind", "Numpad 2").OnPressed(ReloadScripts);

CameraTree.AddButton("Reset camera").OnValue(() => {
	Camera.Distance = CamDist.value = 1134;
	ConVars.Set("r_farz", -1);
});

function UpdateCameraDistance(slid: MenuSDK.Slider = CamDist) {
	ConVars.Set("r_farz", slid.value * 2);
	if (Game.IsInGame) {
		Camera.Distance = slid.value;
	}
}

EventsSDK.on("GameConnected", () => {
	// if (!enable_modifications)
	// 	return
	UpdateCameraDistance();
	ConVars.Set("cl_weather", Weather.selected_id);
	ConVars.Set("fog_enable", false);
	ConVars.Set("fow_client_nofiltering", false);
	ConVars.Set("dota_use_particle_fow", false);
	ConVars.Set("demo_recordcommands", false);
	ConVars.Set("dota_unit_orders_rate", 512);
});

EventsSDK.on("WndProc", (msg, wParam) => {
	if (msg == 522 /* WM_MOUSEWHEEL */ &&
		CamMouseState.value) {

		if (wParam === 7864320n) { //wheel up

			CamDist.value -= CamStep.value;
		}
		if (wParam === 4287102976n) { //wheel down
			CamDist.value += CamStep.value;
		}

		if (CamDist.value < CameraMinDistance) {
			CamDist.value = CameraMinDistance;
		}
		else if (CamDist.value > CameraMaxDistance) {
			CamDist.value = CameraMaxDistance;
		}

		UpdateCameraDistance();
		return false;
	}
});

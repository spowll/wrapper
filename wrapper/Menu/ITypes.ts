import Color from "../Base/Color"
import Toggle from "./Toggle"
import Slider from "./Slider"
import Switcher from "./Switcher"
import Node from "./Node"

export interface IMenuColorPicker {
	Node: Node
	R: Slider
	G: Slider
	B: Slider
	A: Slider
	Color: Color
}

export interface IMenuParticlePicker {
	Node: Node
	State: Nullable<Toggle>
	R: Slider
	G: Slider
	B: Slider
	A: Slider
	Width: Slider
	Style: Switcher
	Color: Color
}
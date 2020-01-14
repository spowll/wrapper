import EventsSDK from "./EventsSDK"
import InputManager from "./InputManager"
import Events from "./Events"
import UserCmd from "../Native/UserCmd"
import { ParseProtobufDesc, RecursiveProtobuf, CMsgVectorToVector3, ParseProtobufNamed, ServerHandleToEntity, ServerHandleToIndex } from "../Utils/ParseProtobuf"
import EntityManager, { AddToCache, LocalPlayer } from "./EntityManager"
import Unit from "../Objects/Base/Unit"
import Vector3 from "../Base/Vector3"
import QAngle from "../Base/QAngle"
import Player from "../Objects/Base/Player"
import Ability from "../Objects/Base/Ability"
import Hero from "../Objects/Base/Hero"
import Item from "../Objects/Base/Item"
import Game from "../Objects/GameResources/GameRules"
import { ReloadGlobalAbilityStorage } from "../Objects/DataBook/AbilityData"
import Entity from "../Objects/Base/Entity"

Events.on("Update", cmd => {
	let cmd_ = new UserCmd(cmd)
	InputManager.CursorOnWorld = cmd_.VectorUnderCursor
	EventsSDK.emit("Update", false, cmd_)
})

enum PARTICLE_MESSAGE {
	GAME_PARTICLE_MANAGER_EVENT_CREATE = 0,
	GAME_PARTICLE_MANAGER_EVENT_UPDATE = 1,
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_FORWARD = 2,
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_ORIENTATION = 3,
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_FALLBACK = 4,
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_ENT = 5,
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_OFFSET = 6,
	GAME_PARTICLE_MANAGER_EVENT_DESTROY = 7,
	GAME_PARTICLE_MANAGER_EVENT_DESTROY_INVOLVING = 8,
	GAME_PARTICLE_MANAGER_EVENT_RELEASE = 9,
	GAME_PARTICLE_MANAGER_EVENT_LATENCY = 10,
	GAME_PARTICLE_MANAGER_EVENT_SHOULD_DRAW = 11,
	GAME_PARTICLE_MANAGER_EVENT_FROZEN = 12,
	GAME_PARTICLE_MANAGER_EVENT_CHANGE_CONTROL_POINT_ATTACHMENT = 13,
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_ENTITY_POSITION = 14,
	GAME_PARTICLE_MANAGER_EVENT_SET_FOW_PROPERTIES = 15,
	GAME_PARTICLE_MANAGER_EVENT_SET_TEXT = 16,
	GAME_PARTICLE_MANAGER_EVENT_SET_SHOULD_CHECK_FOW = 17,
	GAME_PARTICLE_MANAGER_EVENT_SET_CONTROL_POINT_MODEL = 18,
	GAME_PARTICLE_MANAGER_EVENT_SET_CONTROL_POINT_SNAPSHOT = 19,
	GAME_PARTICLE_MANAGER_EVENT_SET_TEXTURE_ATTRIBUTE = 20,
}
enum EDotaEntityMessages {
	DOTA_UNIT_SPEECH = 0,
	DOTA_UNIT_SPEECH_MUTE = 1,
	DOTA_UNIT_ADD_GESTURE = 2,
	DOTA_UNIT_REMOVE_GESTURE = 3,
	DOTA_UNIT_REMOVE_ALL_GESTURES = 4,
	DOTA_UNIT_FADE_GESTURE = 6,
	DOTA_UNIT_SPEECH_CLIENTSIDE_RULES = 7,
}
ParseProtobufDesc(`
message CNETMsg_Tick {
	optional uint32 tick = 1;
	optional uint32 host_frametime = 2;
	optional uint32 host_frametime_std_deviation = 3;
	optional uint32 host_computationtime = 4;
	optional uint32 host_computationtime_std_deviation = 5;
	optional uint32 host_framestarttime_std_deviation = 6;
	optional uint32 host_loss = 7;
}

message CSVCMsg_GameSessionConfiguration {
	optional bool is_multiplayer = 1;
	optional bool is_loadsavegame = 2;
	optional bool is_background_map = 3;
	optional bool is_headless = 4;
	optional uint32 min_client_limit = 5;
	optional uint32 max_client_limit = 6;
	optional uint32 max_clients = 7;
	optional fixed32 tick_interval = 8;
	optional string hostname = 9;
	optional string savegamename = 10;
	optional string s1_mapname = 11;
	optional string gamemode = 12;
	optional string server_ip_address = 13;
	optional bytes data = 14;
	optional bool is_localonly = 15;
	optional bool no_steam_server = 19;
	optional bool is_transition = 16;
	optional string previouslevel = 17;
	optional string landmarkname = 18;
}

message CSVCMsg_ServerInfo {
	optional int32 protocol = 1;
	optional int32 server_count = 2;
	optional bool is_dedicated = 3;
	optional bool is_hltv = 4;
	optional bool is_replay = 5;
	optional int32 c_os = 6;
	optional int32 max_clients = 10;
	optional int32 max_classes = 11;
	optional int32 player_slot = 12;
	optional float tick_interval = 13;
	optional string game_dir = 14;
	optional string map_name = 15;
	optional string sky_name = 16;
	optional string host_name = 17;
	optional string addon_name = 18;
	optional .CSVCMsg_GameSessionConfiguration game_session_config = 19;
	optional bytes game_session_manifest = 20;
}

enum PARTICLE_MESSAGE {
	GAME_PARTICLE_MANAGER_EVENT_CREATE = 0;
	GAME_PARTICLE_MANAGER_EVENT_UPDATE = 1;
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_FORWARD = 2;
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_ORIENTATION = 3;
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_FALLBACK = 4;
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_ENT = 5;
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_OFFSET = 6;
	GAME_PARTICLE_MANAGER_EVENT_DESTROY = 7;
	GAME_PARTICLE_MANAGER_EVENT_DESTROY_INVOLVING = 8;
	GAME_PARTICLE_MANAGER_EVENT_RELEASE = 9;
	GAME_PARTICLE_MANAGER_EVENT_LATENCY = 10;
	GAME_PARTICLE_MANAGER_EVENT_SHOULD_DRAW = 11;
	GAME_PARTICLE_MANAGER_EVENT_FROZEN = 12;
	GAME_PARTICLE_MANAGER_EVENT_CHANGE_CONTROL_POINT_ATTACHMENT = 13;
	GAME_PARTICLE_MANAGER_EVENT_UPDATE_ENTITY_POSITION = 14;
	GAME_PARTICLE_MANAGER_EVENT_SET_FOW_PROPERTIES = 15;
	GAME_PARTICLE_MANAGER_EVENT_SET_TEXT = 16;
	GAME_PARTICLE_MANAGER_EVENT_SET_SHOULD_CHECK_FOW = 17;
	GAME_PARTICLE_MANAGER_EVENT_SET_CONTROL_POINT_MODEL = 18;
	GAME_PARTICLE_MANAGER_EVENT_SET_CONTROL_POINT_SNAPSHOT = 19;
	GAME_PARTICLE_MANAGER_EVENT_SET_TEXTURE_ATTRIBUTE = 20;
}
message CUserMsg_ParticleManager {
	message ReleaseParticleIndex {
	}

	message CreateParticle {
		optional fixed64 particle_name_index = 1;
		optional int32 attach_type = 2;
		optional int32 entity_handle = 3;
		optional int32 entity_handle_for_modifiers = 4;
		optional bool apply_voice_ban_rules = 5;
		optional int32 team_behavior = 6;
	}

	message DestroyParticle {
		optional bool destroy_immediately = 1;
	}

	message DestroyParticleInvolving {
		optional bool destroy_immediately = 1;
		optional int32 entity_handle = 3;
	}

	message UpdateParticle {
		optional int32 control_point = 1;
		optional .CMsgVector position = 2;
	}

	message UpdateParticleFwd {
		optional int32 control_point = 1;
		optional .CMsgVector forward = 2;
	}

	message UpdateParticleOrient {
		optional int32 control_point = 1;
		optional .CMsgVector forward = 2;
		optional .CMsgVector right = 3 [deprecated = true];
		optional .CMsgVector up = 4;
		optional .CMsgVector left = 5;
	}

	message UpdateParticleFallback {
		optional int32 control_point = 1;
		optional .CMsgVector position = 2;
	}

	message UpdateParticleOffset {
		optional int32 control_point = 1;
		optional .CMsgVector origin_offset = 2;
		optional .CMsgQAngle angle_offset = 3;
	}

	message UpdateParticleEnt {
		optional int32 control_point = 1;
		optional int32 entity_handle = 2;
		optional int32 attach_type = 3;
		optional int32 attachment = 4;
		optional .CMsgVector fallback_position = 5;
		optional bool include_wearables = 6;
	}

	message UpdateParticleSetFrozen {
		optional bool set_frozen = 1;
	}

	message UpdateParticleShouldDraw {
		optional bool should_draw = 1;
	}

	message ChangeControlPointAttachment {
		optional int32 attachment_old = 1;
		optional int32 attachment_new = 2;
		optional int32 entity_handle = 3;
	}

	message UpdateEntityPosition {
		optional int32 entity_handle = 1;
		optional .CMsgVector position = 2;
	}

	message SetParticleFoWProperties {
		optional int32 fow_control_point = 1;
		optional int32 fow_control_point2 = 2;
		optional float fow_radius = 3;
	}

	message SetParticleShouldCheckFoW {
		optional bool check_fow = 1;
	}

	message SetControlPointModel {
		optional int32 control_point = 1;
		optional string model_name = 2;
	}

	message SetControlPointSnapshot {
		optional int32 control_point = 1;
		optional string snapshot_name = 2;
	}

	message SetParticleText {
		optional string text = 1;
	}

	message SetTextureAttribute {
		optional string attribute_name = 1;
		optional string texture_name = 2;
	}

	required .PARTICLE_MESSAGE type = 1 [default = GAME_PARTICLE_MANAGER_EVENT_CREATE];
	required uint32 index = 2;
	optional .CUserMsg_ParticleManager.ReleaseParticleIndex release_particle_index = 3;
	optional .CUserMsg_ParticleManager.CreateParticle create_particle = 4;
	optional .CUserMsg_ParticleManager.DestroyParticle destroy_particle = 5;
	optional .CUserMsg_ParticleManager.DestroyParticleInvolving destroy_particle_involving = 6;
	optional .CUserMsg_ParticleManager.UpdateParticle update_particle = 7;
	optional .CUserMsg_ParticleManager.UpdateParticleFwd update_particle_fwd = 8;
	optional .CUserMsg_ParticleManager.UpdateParticleOrient update_particle_orient = 9;
	optional .CUserMsg_ParticleManager.UpdateParticleFallback update_particle_fallback = 10;
	optional .CUserMsg_ParticleManager.UpdateParticleOffset update_particle_offset = 11;
	optional .CUserMsg_ParticleManager.UpdateParticleEnt update_particle_ent = 12;
	optional .CUserMsg_ParticleManager.UpdateParticleShouldDraw update_particle_should_draw = 14;
	optional .CUserMsg_ParticleManager.UpdateParticleSetFrozen update_particle_set_frozen = 15;
	optional .CUserMsg_ParticleManager.ChangeControlPointAttachment change_control_point_attachment = 16;
	optional .CUserMsg_ParticleManager.UpdateEntityPosition update_entity_position = 17;
	optional .CUserMsg_ParticleManager.SetParticleFoWProperties set_particle_fow_properties = 18;
	optional .CUserMsg_ParticleManager.SetParticleText set_particle_text = 19;
	optional .CUserMsg_ParticleManager.SetParticleShouldCheckFoW set_particle_should_check_fow = 20;
	optional .CUserMsg_ParticleManager.SetControlPointModel set_control_point_model = 21;
	optional .CUserMsg_ParticleManager.SetControlPointSnapshot set_control_point_snapshot = 22;
	optional .CUserMsg_ParticleManager.SetTextureAttribute set_texture_attribute = 23;
}

enum EDotaEntityMessages {
	DOTA_UNIT_SPEECH = 0;
	DOTA_UNIT_SPEECH_MUTE = 1;
	DOTA_UNIT_ADD_GESTURE = 2;
	DOTA_UNIT_REMOVE_GESTURE = 3;
	DOTA_UNIT_REMOVE_ALL_GESTURES = 4;
	DOTA_UNIT_FADE_GESTURE = 6;
	DOTA_UNIT_SPEECH_CLIENTSIDE_RULES = 7;
}

message CDOTAResponseQuerySerialized {
	message Fact {
		enum ValueType {
			NUMERIC = 1;
			STRING = 2;
		}

		required int32 key = 1;
		required .CDOTAResponseQuerySerialized.Fact.ValueType valtype = 2 [default = NUMERIC];
		optional float val_numeric = 3;
		optional string val_string = 4;
	}

	repeated .CDOTAResponseQuerySerialized.Fact facts = 1;
}

message CDOTASpeechMatchOnClient {
	optional int32 concept = 1;
	optional int32 recipient_type = 2;
	optional .CDOTAResponseQuerySerialized responsequery = 3;
	optional sfixed32 randomseed = 4 [default = 0];
}

message CDOTAUserMsg_UnitEvent {
	message Speech {
		optional int32 concept = 1;
		optional string response = 2;
		optional int32 recipient_type = 3;
		optional int32 level = 4;
		optional bool muteable = 5 [default = false];
	}

	message SpeechMute {
		optional float delay = 1 [default = 0.5];
	}

	message AddGesture {
		optional int32 activity = 1;
		optional int32 slot = 2;
		optional float fade_in = 3 [default = 0];
		optional float fade_out = 4 [default = 0.1];
		optional float playback_rate = 5 [default = 1];
		optional int32 sequence_variant = 6;
	}

	message RemoveGesture {
		optional int32 activity = 1;
	}

	message BloodImpact {
		optional int32 scale = 1;
		optional int32 x_normal = 2;
		optional int32 y_normal = 3;
	}

	message FadeGesture {
		optional int32 activity = 1;
	}

	required .EDotaEntityMessages msg_type = 1 [default = DOTA_UNIT_SPEECH];
	required int32 entity_index = 2;
	optional .CDOTAUserMsg_UnitEvent.Speech speech = 3;
	optional .CDOTAUserMsg_UnitEvent.SpeechMute speech_mute = 4;
	optional .CDOTAUserMsg_UnitEvent.AddGesture add_gesture = 5;
	optional .CDOTAUserMsg_UnitEvent.RemoveGesture remove_gesture = 6;
	optional .CDOTAUserMsg_UnitEvent.BloodImpact blood_impact = 7;
	optional .CDOTAUserMsg_UnitEvent.FadeGesture fade_gesture = 8;
	optional .CDOTASpeechMatchOnClient speech_match_on_client = 9;
}

message CDOTAUserMsg_TE_DotaBloodImpact {
	optional int32 entity = 1;
	optional float scale = 2;
	optional float xnormal = 3;
	optional float ynormal = 4;
}

message CDOTAUserMsg_TE_UnitAnimation {
	optional int32 entity = 1;
	optional int32 sequenceVariant = 2;
	optional float playbackrate = 3;
	optional float castpoint = 4;
	optional int32 type = 5;
	optional int32 activity = 6;
}

message CDOTAUserMsg_TE_UnitAnimationEnd {
	optional int32 entity = 1;
	optional bool snap = 2;
}
`)

Events.on("ServerMessage", (msg_id, buf) => {
	switch (msg_id) {
		case 4: {
			let msg = ParseProtobufNamed(buf, "CNETMsg_Tick")
			EventsSDK.emit(
				"ServerTick", false,
				msg.get("tick") as number,
				msg.get("host_frametime") as number,
				msg.get("host_frametime_std_deviation") as number,
				msg.get("host_computationtime") as number,
				msg.get("host_computationtime_std_deviation") as number,
				msg.get("host_framestarttime_std_deviation") as number,
				msg.get("host_loss") as number,
			)
			break
		}
		case 40:
			EventsSDK.emit('ServerInfo', false, ParseProtobufNamed(buf, "CSVCMsg_ServerInfo"))
			break
		case 145: {
			let msg = ParseProtobufNamed(buf, "CUserMsg_ParticleManager")
			let index = msg.get("index") as number
			switch (msg.get("type") as PARTICLE_MESSAGE) {
				case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_CREATE: {
					let submsg = msg.get("create_particle") as RecursiveProtobuf
					let particleSystemHandle = submsg.get("particle_name_index") as bigint
					let ent = ServerHandleToEntity(submsg.get("entity_handle") as number),
						path = HashToPath(particleSystemHandle ?? 0n)
					if (path === undefined)
						break
					EventsSDK.emit(
						"ParticleCreated", false,
						index,
						path,
						particleSystemHandle,
						submsg.get("attach_type") as number,
						ent,
					)
					break
				}
				case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_UPDATE: {
					let submsg = msg.get("update_particle") as RecursiveProtobuf
					EventsSDK.emit(
						"ParticleUpdated", false,
						index,
						submsg.get("control_point") as number,
						CMsgVectorToVector3(submsg.get("position") as RecursiveProtobuf),
					)
					break
				}
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_UPDATE_FORWARD: {
				// 	let submsg = msg.get("update_particle_fwd") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_UPDATE_ORIENTATION: {
				// 	let submsg = msg.get("update_particle_orient") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_UPDATE_FALLBACK: {
				// 	let submsg = msg.get("update_particle_fallback") as RecursiveProtobuf

				// 	break
				// }
				case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_UPDATE_ENT: {
					let submsg = msg.get("update_particle_ent") as RecursiveProtobuf
					let ent = ServerHandleToEntity(submsg.get("entity_handle") as number)
					EventsSDK.emit(
						"ParticleUpdatedEnt", false,
						index,
						submsg.get("control_point") as number,
						ent,
						submsg.get("attach_type") as number,
						submsg.get("attachment") as number,
						CMsgVectorToVector3(submsg.get("fallback_position") as RecursiveProtobuf),
						submsg.get("include_wearables") as boolean,
					)
					break
				}
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_UPDATE_OFFSET: {
				// 	let submsg = msg.get("update_particle_offset") as RecursiveProtobuf

				// 	break
				// }
				case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_DESTROY: {
					let submsg = msg.get("destroy_particle") as RecursiveProtobuf
					EventsSDK.emit(
						"ParticleDestroyed", false,
						index,
						submsg.get("destroy_immediately") as boolean,
					)
					break
				}
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_DESTROY_INVOLVING: {
				// 	let submsg = msg.get("destroy_particle_involving") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_RELEASE: {
				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_SHOULD_DRAW: {
				// 	let submsg = msg.get("update_particle_should_draw") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_FROZEN: {
				// 	let submsg = msg.get("update_particle_set_frozen") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_CHANGE_CONTROL_POINT_ATTACHMENT: {
				// 	let submsg = msg.get("change_control_point_attachment") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_UPDATE_ENTITY_POSITION: {
				// 	let submsg = msg.get("update_entity_position") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_SET_TEXT: {
				// 	let submsg = msg.get("set_particle_text") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_SET_CONTROL_POINT_MODEL: {
				// 	let submsg = msg.get("set_control_point_model") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_SET_CONTROL_POINT_SNAPSHOT: {
				// 	let submsg = msg.get("set_control_point_snapshot") as RecursiveProtobuf

				// 	break
				// }
				// case PARTICLE_MESSAGE.GAME_PARTICLE_MANAGER_EVENT_SET_TEXTURE_ATTRIBUTE: {
				// 	let submsg = msg.get("set_texture_attribute") as RecursiveProtobuf

				// 	break
				// }
			}
			break
		}
		case 488: {
			let msg = ParseProtobufNamed(buf, "CDOTAUserMsg_UnitEvent")
			let handle = msg.get("entity_index") as number
			let ent: Entity | number | undefined = ServerHandleToEntity(handle)
			if (ent === undefined)
				ent = ServerHandleToIndex(handle)
			else if (!(ent instanceof Unit))
				return
			switch (msg.get("msg_type") as EDotaEntityMessages) {
				case EDotaEntityMessages.DOTA_UNIT_SPEECH: {
					let submsg = msg.get("speech") as RecursiveProtobuf
					EventsSDK.emit(
						"UnitSpeech", false,
						ent,
						submsg.get("concept") as number,
						submsg.get("response") as string,
						submsg.get("recipient_type") as number,
						submsg.get("level") as number,
						submsg.get("muteable") as boolean,
					)
					break
				}
				case EDotaEntityMessages.DOTA_UNIT_SPEECH_MUTE: {
					let submsg = msg.get("speech_mute") as RecursiveProtobuf
					EventsSDK.emit(
						"UnitSpeechMute", false,
						ent,
						submsg.get("delay") as number,
					)
					break
				}
				case EDotaEntityMessages.DOTA_UNIT_ADD_GESTURE: {
					let submsg = msg.get("add_gesture") as RecursiveProtobuf
					EventsSDK.emit(
						"UnitAddGesture", false,
						ent,
						submsg.get("activity") as number,
						submsg.get("slot") as number,
						submsg.get("fade_in") as number,
						submsg.get("fade_out") as number,
						submsg.get("playback_rate") as number,
						submsg.get("sequence_variant") as number,
					)
					break
				}
				case EDotaEntityMessages.DOTA_UNIT_REMOVE_GESTURE: {
					let submsg = msg.get("remove_gesture") as RecursiveProtobuf
					EventsSDK.emit(
						"UnitRemoveGesture", false,
						ent,
						submsg.get("activity") as number,
					)
					break
				}
				case EDotaEntityMessages.DOTA_UNIT_FADE_GESTURE: {
					let submsg = msg.get("fade_gesture") as RecursiveProtobuf
					EventsSDK.emit(
						"UnitFadeGesture", false,
						ent,
						submsg.get("activity") as number,
					)
					break
				}
			}
			break
		}
		case 520: {
			let msg = ParseProtobufNamed(buf, "CDOTAUserMsg_TE_DotaBloodImpact")
			let ent = ServerHandleToEntity(msg.get("entity") as number)
			if (ent === undefined)
				break
			EventsSDK.emit(
				"BloodImpact", false,
				ent,
				msg.get("scale") as number,
				msg.get("xnormal") as number,
				msg.get("ynormal") as number,
			)
			break
		}
		case 521: {
			let msg = ParseProtobufNamed(buf, "CDOTAUserMsg_TE_UnitAnimation")
			let ent = ServerHandleToEntity(msg.get("entity") as number)
			if (!(ent instanceof Unit))
				break
			EventsSDK.emit(
				"UnitAnimation", false,
				ent,
				msg.get("sequenceVariant") as number,
				msg.get("playbackrate") as number,
				msg.get("castpoint") as number,
				msg.get("type") as number,
				msg.get("activity") as number,
			)
			break
		}
		case 522: {
			let msg = ParseProtobufNamed(buf, "CDOTAUserMsg_TE_UnitAnimationEnd")
			let ent = ServerHandleToEntity(msg.get("entity") as number)
			if (!(ent instanceof Unit))
				break
			EventsSDK.emit("UnitAnimationEnd", false, ent, msg.get("snap") as boolean)
			break
		}
		default:
			break
	}
})

Events.on("GameEvent", (name, obj) => EventsSDK.emit("GameEvent", false, name, obj))
Events.on("CustomGameEvent", (name, obj) => EventsSDK.emit("CustomGameEvent", false, name, obj))

Events.on("EntityPositionsChanged", ents => ents.forEach(ent_ => {
	let ent = EntityManager.GetEntityByNative(ent_)
	if (ent === undefined || !ent_.m_VisualData)
		return // probably ent.m_pGameSceneNode === undefined

	let m_vecOrigin = Vector3.fromIOBuffer()!
	let m_angAbsRotation = QAngle.fromIOBuffer(true, 3)!
	ent.OnGameSceneNodeChanged(m_vecOrigin, m_angAbsRotation)
}))

Events.on("EntitiesVisiblityChanged", ents => {
	for (let [ent_, is_visible] of ents.entries()) {
		let ent = EntityManager.GetEntityByNative(ent_)
		if (ent === undefined)
			continue
		ent.IsVisible = is_visible
	}
})

Events.on("InputCaptured", is_captured => EventsSDK.emit("InputCaptured", false, is_captured))

Events.on("NetworkFieldsChanged", map => {
	// loop-optimizer: KEEP
	map.forEach((ar, native_ent) => {
		let entity_ = EntityManager.GetEntityByNative(native_ent)
		if (entity_ === undefined) {
			if (native_ent instanceof C_DOTABaseAbility && ar.some(([field_name]) => field_name === "m_name")) {
				AddToCache(native_ent)
				entity_ = EntityManager.GetEntityByNative(native_ent)
				if (entity_ === undefined)
					return
			} else
				return
		}

		const entity = entity_
		// loop-optimizer: KEEP
		ar.forEach(([field_name, array_index]) => {
			if (array_index === -1)
				switch (field_name) {
					case "m_hOwnerEntity":
						entity.Owner_ = entity.m_pBaseEntity.m_hOwnerEntity
						break
					case "m_iPlayerID":
						if (entity instanceof Player)
							entity.PlayerID = entity.m_pBaseEntity.m_iPlayerID
						break
					case "m_hAssignedHero":
						if (entity instanceof Player) {
							entity.Hero_ = entity.m_pBaseEntity.m_hAssignedHero
							if (entity === LocalPlayer && LocalPlayer.Hero !== undefined && !gameInProgress) {
								gameInProgress = true
								EventsSDK.emit("GameStarted", false, LocalPlayer.Hero)
							}
						}
						break
					case "m_iTeamNum":
						entity.Team = entity.m_pBaseEntity.m_iTeamNum
						EventsSDK.emit("EntityTeamChanged", false, entity)
						if (entity instanceof Unit) {
							let old_visibility = entity.IsVisibleForEnemies
							entity.IsVisibleForEnemies = Unit.IsVisibleForEnemies(entity)
							if (entity.IsVisibleForEnemies !== old_visibility)
								EventsSDK.emit("EntityTeamChanged", false, entity)
						}
						break
					case "m_lifeState":
						entity.LifeState = entity.m_pBaseEntity.m_lifeState
						EventsSDK.emit("LifeStateChanged", false, entity)
						break
					case "m_NetworkActivity":
						if (entity instanceof Unit) {
							entity.NetworkActivity = entity.m_pBaseEntity.m_NetworkActivity
							EventsSDK.emit("NetworkActivityChanged", false, entity)
						}
						break
					case "m_iIsControllableByPlayer64":
						if (entity instanceof Unit)
							entity.IsControllableByPlayerMask = entity.m_pBaseEntity.m_iIsControllableByPlayer64
						break
					case "m_iHealth":
						entity.HP = entity.m_pBaseEntity.m_iHealth
						break
					case "m_iMaxHealth":
						entity.MaxHP = entity.m_pBaseEntity.m_iMaxHealth
						break
					case "m_flHealthThinkRegen":
						if (entity instanceof Unit)
							entity.HPRegen = entity.m_pBaseEntity.m_flHealthThinkRegen
						break
					case "m_flManaThinkRegen":
						if (entity instanceof Unit)
							entity.ManaRegen = entity.m_pBaseEntity.m_flManaThinkRegen
						break
					case "m_anglediff":
						if (entity instanceof Unit)
							entity.RotationDifference = entity.m_pBaseEntity.m_anglediff
						break
					case "m_iLevel":
						if (entity instanceof Ability)
							entity.Level = entity.m_pBaseEntity.m_iLevel
						break
					case "m_fCooldown":
						if (entity instanceof Ability)
							entity.Cooldown = entity.m_pBaseEntity.m_fCooldown
						break
					case "m_flCooldownLength":
						if (entity instanceof Ability)
							entity.CooldownLength = entity.m_pBaseEntity.m_flCooldownLength
						break
					case "m_bInAbilityPhase":
						if (entity instanceof Ability)
							entity.IsInAbilityPhase = entity.m_pBaseEntity.m_bInAbilityPhase
						break
					case "m_flCastStartTime":
						if (entity instanceof Ability)
							entity.CastStartTime = entity.m_pBaseEntity.m_flCastStartTime
						break
					case "m_flChannelStartTime":
						if (entity instanceof Ability)
							entity.ChannelStartTime = entity.m_pBaseEntity.m_flChannelStartTime
						break
					case "m_bToggleState":
						if (entity instanceof Ability)
							entity.IsToggled = entity.m_pBaseEntity.m_bToggleState
						break
					case "m_flLastCastClickTime":
						if (entity instanceof Ability)
							entity.LastCastClickTime = entity.m_pBaseEntity.m_flLastCastClickTime
						break
					case "m_iTaggedAsVisibleByTeam":
						if (entity instanceof Unit) {
							entity.IsVisibleForTeamMask = entity.m_pBaseEntity.m_iTaggedAsVisibleByTeam
							entity.IsVisibleForEnemies = Unit.IsVisibleForEnemies(entity)
							EventsSDK.emit("TeamVisibilityChanged", false, entity)
						}
						break
					case "m_hReplicatingOtherHeroModel":
						if (entity instanceof Hero)
							entity.ReplicatingOtherHeroModel_ = entity.m_pBaseEntity.m_hReplicatingOtherHeroModel
						break
					case "m_bHidden":
						if (entity instanceof Ability)
							entity.IsHidden = entity.m_pBaseEntity.m_bHidden
						break
					case "m_flEnableTime":
						if (entity instanceof Item)
							entity.EnableTime = entity.m_pBaseEntity.m_flEnableTime
						break
					case "m_iSharability":
						if (entity instanceof Item)
							entity.Shareability = entity.m_pBaseEntity.m_iSharability
						break
					case "m_iCurrentCharges":
						if (entity instanceof Item)
							entity.CurrentCharges = entity.m_pBaseEntity.m_iCurrentCharges
						break

					// manually whitelisted
					case "m_angRotation":
						entity.OnNetworkRotationChanged()
						break
					case "m_fGameTime":
						Game.RawGameTime = Game.m_GameRules?.m_fGameTime ?? 0

						EntityManager.GetEntitiesByClass(Unit).forEach(ent => {
							if (ent.IsVisible)
								ent.LastVisibleTime = Game.RawGameTime
							else
								ent.LastDormantTime = Game.RawGameTime
						})

						if (LocalPlayer !== undefined)
							EventsSDK.emit("Tick", false)
						break
					case "m_bGamePaused":
						Game.IsPaused = Game.m_GameRules?.m_bGamePaused ?? false
						break
					case "m_name":
						entity.Name_ = entity.Entity?.m_name ?? entity.m_pBaseEntity.m_pEntity.m_name!
						EventsSDK.emit("EntityNameChanged", false, entity)
						break

					default:
						break
				}
			else
				switch (field_name) {
					case "m_hAbilities":
						if (entity instanceof Unit)
							entity.AbilitiesBook.Spells_[array_index] = entity.m_pBaseEntity.m_hAbilities[array_index]
						break

					// manually whitelisted
					case "m_hItems":
						if (entity instanceof Unit)
							entity.Inventory.TotalItems_[array_index] = entity.m_pBaseEntity.m_Inventory.m_hItems[array_index]
						break

					default:
						break
				}
		})
	})
})

EventsSDK.on("InputCaptured", is_captured => Game.IsInputCaptured = is_captured)
EventsSDK.on("ServerTick", tick => Game.CurrentServerTick = tick)
Events.on("UIStateChanged", new_state => Game.UIState = new_state)

let gameInProgress = false
EventsSDK.on("EntityCreated", ent => {
	EventsSDK.emit("LifeStateChanged", false, ent)
	if (ent instanceof Unit) {
		EventsSDK.emit("TeamVisibilityChanged", false, ent)
		EventsSDK.emit("NetworkActivityChanged", false, ent)
	}

	if (ent !== LocalPlayer || !LocalPlayer.HeroAssigned || gameInProgress)
		return
	gameInProgress = true
	EventsSDK.emit("GameStarted", false, LocalPlayer.Hero)
})
Events.on("SignonStateChanged", new_state => {
	let old_val = Game.IsConnected

	Game.SignonState = new_state
	let new_val = Game.IsConnected

	if (!old_val && new_val)
		ReloadGlobalAbilityStorage()
	if (old_val && !new_val) {
		gameInProgress = false
		EventsSDK.emit("GameEnded", false)
		Particles.DeleteAll()
	} else if (!gameInProgress && new_val && LocalPlayer?.Hero !== undefined) {
		gameInProgress = true
		EventsSDK.emit("GameStarted", false, LocalPlayer.Hero)
	}
})

EventsSDK.on("ServerInfo", info => {
	let old_val = Game.IsConnected

	Game.MapName = info.get("map_name")! as string
	let new_val = Game.IsConnected

	if (!old_val && new_val)
		ReloadGlobalAbilityStorage()
	if (old_val && !new_val) {
		gameInProgress = false
		EventsSDK.emit("GameEnded", false)
		Particles.DeleteAll()
	} else if (!gameInProgress && new_val && LocalPlayer?.Hero !== undefined) {
		gameInProgress = true
		EventsSDK.emit("GameStarted", false, LocalPlayer.Hero)
	}
})

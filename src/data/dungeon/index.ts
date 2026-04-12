export type {
	Atmosphere,
	ChannelRoom,
	Difficulty,
	DungeonRegion,
	ElementalAffinity,
	LightLevel,
	LootQuality,
	OutcomeType,
	RoomData,
	RoomType,
	RoomVariant,
	SeasonInfo,
	ServerEnvironment,
	Temperature,
} from './__types/index.js';

export { DUNGEON_REGIONS } from './_data/regions.js';
export { BASE_ROOM_WEIGHTS, ROOM_OUTCOME_WEIGHTS, ROOM_VARIANTS } from './_data/roomConfig.js';

export {
	DEFAULT_SEASON_EPOCH_MS,
	getChannelRoom,
	getOutcomeRates,
	getSeasonInfo,
	getServerEnvironment,
	sampleOutcome,
} from './dungeonGenerator.js';

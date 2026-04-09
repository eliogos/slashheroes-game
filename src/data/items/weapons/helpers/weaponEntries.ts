import type { WeaponDefinition } from './types.js';

import { halberd } from '../_entries/axe/halberd.js';
import { hatchet } from '../_entries/axe/hatchet.js';
import { hand_axe } from '../_entries/axe/hand_axe.js';
import { pickaxe } from '../_entries/axe/pickaxe.js';
import { battle_axe } from '../_entries/axe/battle_axe.js';
import { war_pick } from '../_entries/axe/war_pick.js';
import { greataxe } from '../_entries/axe/greataxe.js';
import { chainsaw } from '../_entries/battery/chainsaw.js';
import { electric_baton } from '../_entries/battery/electric_baton.js';
import { charged_gloves } from '../_entries/battery/charged_gloves.js';
import { laser_pistol } from '../_entries/battery/laser_pistol.js';
import { taser } from '../_entries/battery/taser.js';
import { lightsabre } from '../_entries/battery/lightsabre.js';
import { electric_whip } from '../_entries/battery/electric_whip.js';
import { forcefield_band } from '../_entries/battery/forcefield_band.js';
import { electric_guitar } from '../_entries/battery/electric_guitar.js';
import { electric_racket } from '../_entries/battery/electric_racket.js';
import { mecha_mitt } from '../_entries/battery/mecha_mitt.js';
import { cleaver } from '../_entries/blade/cleaver.js';
import { shortsword } from '../_entries/blade/shortsword.js';
import { saw } from '../_entries/blade/saw.js';
import { rapier } from '../_entries/blade/rapier.js';
import { two_hander } from '../_entries/blade/two_hander.js';
import { falchion } from '../_entries/blade/falchion.js';
import { longsword } from '../_entries/blade/longsword.js';
import { greatsword } from '../_entries/blade/greatsword.js';
import { obsidian_sword } from '../_entries/blade/obsidian_sword.js';
import { claymore } from '../_entries/blade/claymore.js';
import { excalibur } from '../_entries/blade/excalibur.js';
import { chain_sickle } from '../_entries/blade/chain_sickle.js';
import { buster_sword } from '../_entries/blade/buster_sword.js';
import { club } from '../_entries/blunt/club.js';
import { bat } from '../_entries/blunt/bat.js';
import { crowbar } from '../_entries/blunt/crowbar.js';
import { blackjack } from '../_entries/blunt/blackjack.js';
import { baton } from '../_entries/blunt/baton.js';
import { bludgeon } from '../_entries/blunt/bludgeon.js';
import { sledgehammer } from '../_entries/blunt/sledgehammer.js';
import { mace } from '../_entries/blunt/mace.js';
import { nunchaku } from '../_entries/blunt/nunchaku.js';
import { flail } from '../_entries/blunt/flail.js';
import { morningstar } from '../_entries/blunt/morningstar.js';
import { maul } from '../_entries/blunt/maul.js';
import { war_hammer } from '../_entries/blunt/war_hammer.js';
import { lucerne_hammer } from '../_entries/blunt/lucerne_hammer.js';
import { iron_club } from '../_entries/blunt/iron_club.js';
import { mjolnir } from '../_entries/blunt/mjolnir.js';
import { colossal_crusher } from '../_entries/blunt/colossal_crusher.js';
import { gauntlet } from '../_entries/blunt/gauntlet.js';
import { yo_yo } from '../_entries/blunt/yo_yo.js';
import { monkey_fist } from '../_entries/blunt/monkey_fist.js';
import { sickle } from '../_entries/curved_blade/sickle.js';
import { bolo_knife } from '../_entries/curved_blade/bolo_knife.js';
import { machete } from '../_entries/curved_blade/machete.js';
import { cutlass } from '../_entries/curved_blade/cutlass.js';
import { sabre } from '../_entries/curved_blade/sabre.js';
import { scimitar } from '../_entries/curved_blade/scimitar.js';
import { katana } from '../_entries/curved_blade/katana.js';
import { sickle_sword } from '../_entries/curved_blade/sickle_sword.js';
import { great_blade } from '../_entries/curved_blade/great_blade.js';
import { tigerclaw } from '../_entries/curved_blade/tigerclaw.js';
import { flintlock } from '../_entries/firearm/flintlock.js';
import { blunderbuss } from '../_entries/firearm/blunderbuss.js';
import { musket } from '../_entries/firearm/musket.js';
import { rifle } from '../_entries/firearm/rifle.js';
import { handcannon } from '../_entries/firearm/handcannon.js';
import { bazooka } from '../_entries/firearm/bazooka.js';
import { machine_gun } from '../_entries/firearm/machine_gun.js';
import { gloves } from '../_entries/fist/gloves.js';
import { knuckleduster } from '../_entries/fist/knuckleduster.js';
import { ninjaclaw } from '../_entries/fist/ninjaclaw.js';
import { baseball_gloves } from '../_entries/fist/baseball_gloves.js';
import { boxing_gloves } from '../_entries/fist/boxing_gloves.js';
import { tactical_gloves } from '../_entries/fist/tactical_gloves.js';
import { dagger } from '../_entries/knife/dagger.js';
import { dirk } from '../_entries/knife/dirk.js';
import { stiletto } from '../_entries/knife/stiletto.js';
import { butterfly_knife } from '../_entries/knife/butterfly_knife.js';
import { short_blade } from '../_entries/knife/short_blade.js';
import { wavy_dagger } from '../_entries/knife/wavy_dagger.js';
import { assassins_blade } from '../_entries/knife/assassins_blade.js';
import { monkey_staff } from '../_entries/legendary/monkey_staff.js';
import { warfan } from '../_entries/legendary/warfan.js';
import { fork_baton } from '../_entries/misc/fork_baton.js';
import { scissors } from '../_entries/misc/scissors.js';
import { great_scissors } from '../_entries/misc/great_scissors.js';
import { ukulele } from '../_entries/misc/ukulele.js';
import { pitchfork } from '../_entries/polearm/pitchfork.js';
import { spear } from '../_entries/polearm/spear.js';
import { pike } from '../_entries/polearm/pike.js';
import { battle_rake } from '../_entries/polearm/battle_rake.js';
import { harpoon } from '../_entries/polearm/harpoon.js';
import { trident } from '../_entries/polearm/trident.js';
import { pole_blade } from '../_entries/polearm/pole_blade.js';
import { glaive } from '../_entries/polearm/glaive.js';
import { war_scythe } from '../_entries/polearm/war_scythe.js';
import { umbrella } from '../_entries/polearm/umbrella.js';
import { sling } from '../_entries/projectile/sling.js';
import { shortbow } from '../_entries/projectile/shortbow.js';
import { slingshot } from '../_entries/projectile/slingshot.js';
import { bow } from '../_entries/projectile/bow.js';
import { crossbow } from '../_entries/projectile/crossbow.js';
import { longbow } from '../_entries/projectile/longbow.js';
import { recurve_bow } from '../_entries/projectile/recurve_bow.js';
import { composite_bow } from '../_entries/projectile/composite_bow.js';
import { whip } from '../_entries/ranged/whip.js';
import { buckler } from '../_entries/shield/buckler.js';
import { round_shield } from '../_entries/shield/round_shield.js';
import { targe } from '../_entries/shield/targe.js';
import { heater_shield } from '../_entries/shield/heater_shield.js';
import { pavise } from '../_entries/shield/pavise.js';
import { scutum } from '../_entries/shield/scutum.js';
import { greatshield } from '../_entries/shield/greatshield.js';
import { staff } from '../_entries/staff/staff.js';
import { quarterstaff } from '../_entries/staff/quarterstaff.js';
import { scepter } from '../_entries/staff/scepter.js';
import { war_staff } from '../_entries/staff/war_staff.js';
import { tomahawk } from '../_entries/throwable/tomahawk.js';
import { bolas } from '../_entries/throwable/bolas.js';
import { boomerang } from '../_entries/throwable/boomerang.js';
import { dart } from '../_entries/throwable/dart.js';
import { shuriken } from '../_entries/throwable/shuriken.js';
import { kunai } from '../_entries/throwable/kunai.js';
import { javelin } from '../_entries/throwable/javelin.js';
import { bomb } from '../_entries/throwable/bomb.js';
import { grenade } from '../_entries/throwable/grenade.js';
import { smokeGrenade } from '../_entries/throwable/smokeGrenade.js';
import { molotov } from '../_entries/throwable/molotov.js';
import { gravitySphere } from '../_entries/throwable/gravitySphere.js';
import { dynamite } from '../_entries/throwable/dynamite.js';
import { flashbang } from '../_entries/throwable/flashbang.js';
import { onzil } from '../_entries/throwable/onzil.js';
import { swissArrow } from '../_entries/throwable/swissArrow.js';
import { chakram } from '../_entries/throwable/chakram.js';
import { tacticalShovel } from '../_entries/throwable/tacticalShovel.js';
import { brick } from '../_entries/throwable/brick.js';
import { razorDisc } from '../_entries/throwable/razorDisc.js';
import { bottledLightning } from '../_entries/throwable/bottledLightning.js';
import { horseshoe } from '../_entries/throwable/horseshoe.js';
import { kpinga } from '../_entries/throwable/kpinga.js';
import { chalk } from '../_entries/throwable/chalk.js';
import { baseball } from '../_entries/throwable/baseball.js';
import { snowball } from '../_entries/throwable/snowball.js';
import { water_balloon } from '../_entries/throwable/water_balloon.js';
import { icicle } from '../_entries/throwable/icicle.js';

export const axeWeapons = [
	halberd,
	hatchet,
	hand_axe,
	pickaxe,
	battle_axe,
	war_pick,
	greataxe,
] as const;

export const batteryWeapons = [
	chainsaw,
	electric_baton,
	charged_gloves,
	laser_pistol,
	taser,
	lightsabre,
	electric_whip,
	forcefield_band,
	electric_guitar,
	electric_racket,
	mecha_mitt,
] as const;

export const bladeWeapons = [
	cleaver,
	shortsword,
	saw,
	rapier,
	two_hander,
	falchion,
	longsword,
	greatsword,
	obsidian_sword,
	claymore,
	excalibur,
	chain_sickle,
	buster_sword,
] as const;

export const bluntWeapons = [
	club,
	bat,
	crowbar,
	blackjack,
	baton,
	bludgeon,
	sledgehammer,
	mace,
	nunchaku,
	flail,
	morningstar,
	maul,
	war_hammer,
	lucerne_hammer,
	iron_club,
	mjolnir,
	colossal_crusher,
	gauntlet,
	yo_yo,
	monkey_fist,
] as const;

export const curved_bladeWeapons = [
	sickle,
	bolo_knife,
	machete,
	cutlass,
	sabre,
	scimitar,
	katana,
	sickle_sword,
	great_blade,
	tigerclaw,
] as const;

export const firearmWeapons = [
	flintlock,
	blunderbuss,
	musket,
	rifle,
	handcannon,
	bazooka,
	machine_gun,
] as const;

export const fistWeapons = [
	gloves,
	knuckleduster,
	ninjaclaw,
	baseball_gloves,
	boxing_gloves,
	tactical_gloves,
] as const;

export const knifeWeapons = [
	dagger,
	dirk,
	stiletto,
	butterfly_knife,
	short_blade,
	wavy_dagger,
	assassins_blade,
] as const;

export const legendaryWeapons = [
	monkey_staff,
	warfan,
] as const;

export const miscWeapons = [
	fork_baton,
	scissors,
	great_scissors,
	ukulele,
] as const;

export const polearmWeapons = [
	pitchfork,
	spear,
	pike,
	battle_rake,
	harpoon,
	trident,
	pole_blade,
	glaive,
	war_scythe,
	umbrella,
] as const;

export const projectileWeapons = [
	sling,
	shortbow,
	slingshot,
	bow,
	crossbow,
	longbow,
	recurve_bow,
	composite_bow,
] as const;

export const rangedWeapons = [
	whip,
] as const;

export const shieldWeapons = [
	buckler,
	round_shield,
	targe,
	heater_shield,
	pavise,
	scutum,
	greatshield,
] as const;

export const staffWeapons = [
	staff,
	quarterstaff,
	scepter,
	war_staff,
] as const;

export const throwableWeapons = [
	tomahawk,
	bolas,
	boomerang,
	dart,
	shuriken,
	kunai,
	javelin,
	bomb,
	grenade,
	smokeGrenade,
	molotov,
	gravitySphere,
	dynamite,
	flashbang,
	onzil,
	swissArrow,
	chakram,
	tacticalShovel,
	brick,
	razorDisc,
	bottledLightning,
	horseshoe,
	kpinga,
	chalk,
	baseball,
	snowball,
	water_balloon,
	icicle,
] as const;

export const weapons: WeaponDefinition[] = [
	...axeWeapons,
	...batteryWeapons,
	...bladeWeapons,
	...bluntWeapons,
	...curved_bladeWeapons,
	...firearmWeapons,
	...fistWeapons,
	...knifeWeapons,
	...legendaryWeapons,
	...miscWeapons,
	...polearmWeapons,
	...projectileWeapons,
	...rangedWeapons,
	...shieldWeapons,
	...staffWeapons,
	...throwableWeapons,
];

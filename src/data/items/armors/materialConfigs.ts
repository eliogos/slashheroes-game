import type { ArmorMaterialDefinition, ArmorMaterialId } from './types.js';
import { boneMaterial } from './_materials/bone.ts';
import { breadMaterial } from './_materials/bread.ts';
import { cardboardMaterial } from './_materials/cardboard.ts';
import { chainmailMaterial } from './_materials/chainmail.ts';
import { diamondplateMaterial } from './_materials/diamondplate.ts';
import { fabricMaterial } from './_materials/fabric.ts';
import { ironplateMaterial } from './_materials/ironplate.ts';
import { kevlarMaterial } from './_materials/kevlar.ts';
import { leatherMaterial } from './_materials/leather.ts';
import { obsidianMaterial } from './_materials/obsidian.ts';
import { paperMaterial } from './_materials/paper.ts';
import { scalesMaterial } from './_materials/scales.ts';
import { seashellsMaterial } from './_materials/seashells.ts';
import { woodMaterial } from './_materials/wood.ts';

export {
	boneMaterial,
	breadMaterial,
	cardboardMaterial,
	chainmailMaterial,
	diamondplateMaterial,
	fabricMaterial,
	ironplateMaterial,
	kevlarMaterial,
	leatherMaterial,
	obsidianMaterial,
	paperMaterial,
	scalesMaterial,
	seashellsMaterial,
	woodMaterial,
};

export const materialConfigs: Readonly<Record<ArmorMaterialId, ArmorMaterialDefinition>> = {
	paper: paperMaterial,
	bread: breadMaterial,
	cardboard: cardboardMaterial,
	fabric: fabricMaterial,
	seashells: seashellsMaterial,
	bone: boneMaterial,
	leather: leatherMaterial,
	wood: woodMaterial,
	scales: scalesMaterial,
	chainmail: chainmailMaterial,
	ironplate: ironplateMaterial,
	obsidian: obsidianMaterial,
	kevlar: kevlarMaterial,
	diamondplate: diamondplateMaterial,
} as const;

export const materialIds: ArmorMaterialId[] = Object.keys(materialConfigs) as ArmorMaterialId[];

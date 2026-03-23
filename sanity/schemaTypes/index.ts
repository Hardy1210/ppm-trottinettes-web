import { scooterType } from './documents/scooterType';
import { serviceListSectionType } from './documents/serviceListSectionType';
import { sparePartType } from './documents/sparePartType';
import { scooterSpecsType } from './objects/scooterSpecsType';
import { serviceItemType } from './objects/serviceItemType';

export const schema = {
  types: [
    serviceItemType,
    serviceListSectionType,
    scooterSpecsType,
    scooterType,
    sparePartType,
  ],
};

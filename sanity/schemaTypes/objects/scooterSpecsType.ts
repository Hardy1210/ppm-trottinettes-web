import { defineField, defineType } from 'sanity';

export const scooterSpecsType = defineType({
  name: 'scooterSpecs',
  title: 'Spécifications trottinette',
  type: 'object',
  fields: [
    defineField({
      name: 'autonomie',
      title: 'Autonomie',
      type: 'string',
    }),
    defineField({
      name: 'vitesse',
      title: 'Vitesse max',
      type: 'string',
    }),
    defineField({
      name: 'puissance',
      title: 'Puissance',
      type: 'string',
    }),
    defineField({
      name: 'poids',
      title: 'Poids',
      type: 'string',
    }),
    defineField({
      name: 'pneus',
      title: 'Pneus',
      type: 'string',
    }),
    defineField({
      name: 'freins',
      title: 'Freins',
      type: 'string',
    }),
  ],
});

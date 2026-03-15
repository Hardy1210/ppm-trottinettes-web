import { defineField, defineType } from 'sanity';

export const serviceItemType = defineType({
  name: 'serviceItem',
  title: 'Service item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Label du prix',
      type: 'string',
      initialValue: 'Prix indicatif',
    }),
    defineField({
      name: 'priceValue',
      title: 'Valeur du prix',
      type: 'string',
      description: 'Ex: 20-30 €',
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'priceValue',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Tarif: ${subtitle}` : 'Sans tarif affiché',
      };
    },
  },
});

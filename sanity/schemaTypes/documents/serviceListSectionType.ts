import { defineField, defineType } from 'sanity';

export const serviceListSectionType = defineType({
  name: 'serviceListSection',
  title: 'Section services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de section',
      type: 'string',
      initialValue: 'Nos services',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Texte d’introduction',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'footnote',
      title: 'Texte bas de section',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'services',
      title: 'Liste des services',
      type: 'array',
      of: [{ type: 'serviceItem' }],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      services: 'services',
    },
    prepare({ title, services }) {
      return {
        title,
        subtitle: `${services?.length || 0} service(s)`,
      };
    },
  },
});

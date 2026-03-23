export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r: any) => r.required() },
    { name: 'county', title: 'County', type: 'string', options: { list: ['Trinity', 'Shasta'] } },
    { name: 'overview', title: 'Overview', type: 'text' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
}

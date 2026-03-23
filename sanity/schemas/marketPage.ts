export default {
  name: 'marketPage',
  title: 'Market Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'county', title: 'County', type: 'string', options: { list: ['Trinity', 'Shasta'] } },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'lastUpdated', title: 'Last Updated', type: 'datetime' },
  ],
}

export default {
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Buying', 'Selling', 'Investing', 'Living'] } },
  ],
}

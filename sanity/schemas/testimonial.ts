export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'author', title: 'Author Name', type: 'string', validation: (r: any) => r.required() },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'text', title: 'Testimonial Text', type: 'text', validation: (r: any) => r.required() },
    { name: 'agentName', title: 'Agent Name', type: 'string' },
    { name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (r: any) => r.min(1).max(5) },
  ],
}

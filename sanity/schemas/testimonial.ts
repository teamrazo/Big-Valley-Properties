export default {
  name: 'testimonial', title: 'Testimonial', type: 'document',
  fields: [
    { name: 'author', title: 'Author Name', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'text', title: 'Testimonial Text', type: 'text' },
    { name: 'agentName', title: 'Agent Name', type: 'string' },
    { name: 'rating', title: 'Rating (1-5)', type: 'number' },
  ],
}

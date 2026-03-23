export default function EditListingPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="font-heading text-h2 text-charcoal-ink dark:text-white mb-8">Edit Listing</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-800">
        <p className="text-cabin-timber dark:text-gray-400">Editing listing: {params.id}</p>
        <p className="text-sm text-gray-400 mt-4">Listing edit form will load from database once connected.</p>
      </div>
    </div>
  )
}

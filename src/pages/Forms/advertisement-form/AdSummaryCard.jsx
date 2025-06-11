import React from 'react'

const AdSummaryCard = ({
  imageUrl = '/placeholder.png',
  imageFile,
  title = 'Untitled Campaign',
  type = 'Ad',
  time = 'Time not set',
  selectedDays = [],
  bid = 'N/A',
  reach = 'N/A',
}) => {
    // Determine the image source: use File if provided, else fallback to imageUrl
    let displayImageUrl = imageUrl;
    if (imageFile instanceof File) {
      displayImageUrl = URL.createObjectURL(imageFile);
    }
    
  return (
    <div className="border rounded-md p-2 shadow-sm bg-white w-full max-w-sm">
      <div className="flex items-start gap-2">
        <img
          src={displayImageUrl}
          alt="ad"
          className="w-12 h-12 rounded object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/placeholder.png'
          }}
        />
        <div className="flex-1">
          <h2 className="font-semibold text-sm">{title}</h2>
          <p className="text-xs text-gray-600">
            {type} · {time} · {selectedDays && selectedDays.length > 0 ? selectedDays.join(', ') : 'No days selected'}
          </p>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-600">Blu: {bid}</span>
            <span className="text-gray-600">Reach: {reach}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdSummaryCard

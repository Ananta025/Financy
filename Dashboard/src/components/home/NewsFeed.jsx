import React from 'react';

const NewsFeed = () => {
  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: 'Market Commentary: Sensex, Nifty end higher on IT, banking stocks gain',
      source: 'Economic Times',
      time: '2 hours ago',
      image: 'https://picsum.photos/id/1/60/60'
    },
    {
      id: 2,
      title: 'Reliance Industries announces new green energy strategy',
      source: 'Mint',
      time: '4 hours ago',
      image: 'https://picsum.photos/id/2/60/60'
    },
    {
      id: 3,
      title: 'SEBI introduces new mutual fund categorization norms',
      source: 'Financial Express',
      time: '5 hours ago',
      image: 'https://picsum.photos/id/3/60/60'
    },
    {
      id: 4,
      title: 'Indian Rupee rises 10 paise against US Dollar in early trade',
      source: 'Bloomberg',
      time: '6 hours ago',
      image: 'https://picsum.photos/id/4/60/60'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Market News</h2>
        <button className="text-sm text-blue-600 hover:underline">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {newsItems.map((news) => (
          <div key={news.id} className="flex gap-3 hover:bg-gray-50 p-2 rounded cursor-pointer">
            <div className="flex-shrink-0">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-12 h-12 rounded object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium line-clamp-2">{news.title}</h3>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <span>{news.source}</span>
                <span className="mx-1">•</span>
                <span>{news.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {newsItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No news available</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;

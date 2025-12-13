export default async function geocodeAddress({address}) {
  
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'YourAppName', // Required by Nominatim
    },
  });

  const data = await res.json();
  return data.length > 0 ? data[0] : null;
};

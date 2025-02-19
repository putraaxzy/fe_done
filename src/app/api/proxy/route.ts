import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://api-wonderwise.up.railway.app/api';

function convertEndpoint(endpoint: string): string {
  // If the endpoint contains a slash (e.g., "history/2")
  if (endpoint.includes('/')) {
    const parts = endpoint.split('/');
    const key = parts[0].toLowerCase();
    const id = parts[1];
    let convertedKey = key;
    switch (key) {
      case 'history':
        convertedKey = 'sejarah';
        break;
      case 'tourism':
        convertedKey = 'wisata';
        break;
      case 'culinary':
        convertedKey = 'kuliner';
        break;
      case 'events':
        convertedKey = 'event';
        break;
    }
    return `${convertedKey}/${id}`;
  } else {
    // If it's a single category, convert accordingly
    switch (endpoint.toLowerCase()) {
      case 'history':
        return 'sejarah';
      case 'tourism':
        return 'wisata';
      case 'culinary':
        return 'kuliner';
      case 'events':
        return 'event';
      default:
        return endpoint;
    }
  }
}

export async function GET(request: NextRequest) {
  const rawEndpoint = request.nextUrl.searchParams.get('endpoint');
  if (!rawEndpoint) return NextResponse.json({ error: 'No endpoint specified' });

  try {
    if (rawEndpoint === 'all') {
      // Fetch all categories at once
      const responses = await Promise.all([
        fetch(`${BASE_URL}/sejarah`),
        fetch(`${BASE_URL}/wisata`),
        fetch(`${BASE_URL}/kuliner`),
        fetch(`${BASE_URL}/event`)
      ]);

      const results = await Promise.all(responses.map(r => r.json()));
      const allData = results.flat();
      console.log('Combined data:', allData.length, 'items');
      return NextResponse.json(allData);
    }

    // Convert English endpoint to Indonesian if needed
    const endpoint = convertEndpoint(rawEndpoint);
    console.log(`Converted endpoint: ${rawEndpoint} -> ${endpoint}`);

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (err) {
      const text = await response.text();
      console.error("Failed to parse JSON:", text);
      data = { error: "Failed to parse JSON", details: text };
    }
    
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json([]);
  }
}

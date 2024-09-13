import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  try {
    const response = await fetch(`https://api.deezer.com/search?q=${query}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from Deezer:', error);
    return NextResponse.json({ error: 'Error fetching data from Deezer' }, { status: 500 });
  }
}
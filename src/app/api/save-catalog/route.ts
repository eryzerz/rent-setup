import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { itemId, scale, slotPosition, rotation } = await request.json();

    const configPath = path.join(process.cwd(), 'public/data/model-config.json');
    const content = fs.readFileSync(configPath, 'utf-8');
    const data = JSON.parse(content);

    const itemIndex = data.items.findIndex((item: { id: string }) => item.id === itemId);
    if (itemIndex === -1) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    if (scale !== undefined) data.items[itemIndex].scale = scale;
    if (slotPosition !== undefined) data.items[itemIndex].slotPosition = slotPosition;
    if (rotation !== undefined) data.items[itemIndex].rotation = rotation;

    fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save catalog:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
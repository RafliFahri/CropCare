// noinspection JSCheckFunctionSignatures

import { NextResponse } from "next/server";
import { predictAction } from "@/lib/inferences"

export async function GET() {

  return NextResponse.json({ result: "data" })
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");
    const plantType = formData.get("type");
    if (!imageFile || !plantType) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    if (!imageFile) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 })
      // throw new Error("Image file is required");
    }
    if (!plantType) {
      return NextResponse.json({ error: "Plant type is required" }, { status: 400 })
      // throw new Error("Plant type is required");
    }
    // this for converting image file to buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    console.log(buffer);
    const result = await predictAction(buffer, plantType);

    return NextResponse.json(result, {status: 200});
  } catch (error) {
    console.error("Error processing request");
    return NextResponse.json({ error: "Kesalahan Prediksi" }, { status: 400 });
  }
}

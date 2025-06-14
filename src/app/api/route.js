import { NextRequest, NextResponse } from "next/server";
import { predictAction } from "@/lib/inferences"
// import * as tf from "@tensorflow/tfjs-node";

export async function GET() {
  // const data = await getModel("cassava");
//   console.log(data);
  
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

    // this for converting image file to buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    console.log(buffer);
    const result = await predictAction(buffer, plantType);
    
    return NextResponse.json(result, {status: 201});
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

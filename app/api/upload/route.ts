import { useMutation } from "convex/react";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Do whatever you want
  const blob = await request.blob();
  if (!blob) {
    return new Response(
      JSON.stringify({ error: 'Missing URL parameter' }),
      { status: 400 }
    );
  }

  const filename = await uploadImage(blob);
  // save page to database
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function uploadImage(file: Blob) {
  let buffer = Buffer.from(await file.arrayBuffer());
  const filename = uuidv4();
  const { AWS_REGION, AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ENDPOINT_URL_S3 } = process.env;
  const s3Client = new S3Client({
    endpoint: AWS_ENDPOINT_URL_S3!,
    region: AWS_REGION!,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID!,
      secretAccessKey: AWS_SECRET_ACCESS_KEY!,
    },
  });

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: "image/jpeg",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return filename;
  } catch (error) {
    console.error(error);
    return false;
  }
}
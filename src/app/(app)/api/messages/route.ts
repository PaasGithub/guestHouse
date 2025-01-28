import payloadConfig from '@payload-config';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

// Handle POST requests
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: payloadConfig });

    // Create a new message document in Payload
    await payload.create({
      collection: 'messages',
      data: {
        name,
        email,
        message,
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: 'Form submitted successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional)
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed.' },
    { status: 405 }
  );
}
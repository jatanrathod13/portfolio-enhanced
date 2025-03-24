export async function GET() {
  return Response.json({ status: 'ok', message: 'API is working!' });
}

export async function POST() {
  return Response.json({ status: 'ok', message: 'POST request received!' });
} 
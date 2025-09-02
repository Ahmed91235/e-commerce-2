import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
	try {
		const { supabase, response } = createClient(request);
		await supabase.auth.getUser();
		
		// Add security headers
		response.headers.set('X-Frame-Options', 'SAMEORIGIN');
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('X-XSS-Protection', '1; mode=block');
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
		response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
		
		// Add CORS headers for development
		const origin = request.headers.get('origin');
		const allowedOrigins = [
			'https://54287.kooder.dev',
			'https://57588.kooder.dev',
			'http://localhost:54287',
			'http://localhost:57588'
		];
		
		if (origin && allowedOrigins.includes(origin)) {
			response.headers.set('Access-Control-Allow-Origin', origin);
			response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			response.headers.set('Access-Control-Allow-Credentials', 'true');
		}
		
		// Handle preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 200, headers: response.headers });
		}
		
		return response;
	} catch (e) {
		const response = NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
		
		// Add security headers even for error cases
		response.headers.set('X-Frame-Options', 'SAMEORIGIN');
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('X-XSS-Protection', '1; mode=block');
		
		return response;
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};

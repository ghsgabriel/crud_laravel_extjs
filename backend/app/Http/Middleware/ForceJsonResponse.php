<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Middleware to force JSON responses.
 */
class ForceJsonResponse
{
    /**
     * Handle the incoming request.
     *
     * This method forces the 'Accept' header of the request to 'application/json',
     * ensuring that the response is always in JSON format.
     *
     * @param  Request  $request  The incoming HTTP request.
     * @param  Closure  $next  The next middleware function in the stack.
     */
    public function handle(Request $request, Closure $next)
    {
        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}

<?php

namespace nono\auth\api\app\actions;

use Slim\Psr7\Request;
use Slim\Psr7\Response;

Abstract class AbstractAction
{
    abstract public function __invoke(Request $request, Response $response, array $args);

    protected function addCorsHeaders(Response $response): Response
    {
        $response = $response->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Max-Age', '3600');

        return $response;
    }
}
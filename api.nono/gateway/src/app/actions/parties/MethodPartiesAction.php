<?php

namespace nono\gate\app\actions\parties;

use nono\gate\app\actions\AbstractAction;
use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class MethodPartiesAction extends AbstractAction {
    private Client $client;

    public function __construct(Client $c) {
        $this->client = $c;
    }

    public function __invoke(Request $request, Response $response, array $args): Response
    {
        $headers = $request->getHeaders();
        $uri = $request->getUri()->getPath();
        $method = $request->getMethod();
        $body = $request->getBody();
        if ($method == 'GET'){
            $data = $this->client->get($uri,["headers"=>$headers,"body"=>$body]);
        }
        if ($method == 'POST'){
            $data = $this->client->post($uri,["headers"=>$headers,"body"=>$body]);
        }
        $json = json_decode($data->getBody()->getContents(),true);
        $response->getBody()->write(json_encode($json,JSON_PRETTY_PRINT));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
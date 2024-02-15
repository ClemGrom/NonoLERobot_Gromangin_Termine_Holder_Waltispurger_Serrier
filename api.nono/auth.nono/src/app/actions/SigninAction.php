<?php

namespace nono\auth\api\app\actions;

use Exception;
use nono\auth\api\domain\dto\CredentialsDTO;
use nono\auth\api\domain\service\AuthServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class SignInAction extends AbstractAction
{

    private AuthServiceInterface $authService;

    public function __construct(AuthServiceInterface $s)
    {
        $this->authService = $s;
    }
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $headers = $request->getHeaders();
        if (isset($headers['Authorization'])) {
            $auth = $headers['Authorization'][0];

            list($scheme, $Credentials_encode) = explode(' ', $auth, 2);

            $credentials = base64_decode($Credentials_encode);

            list($email, $password) = explode(':', $credentials);

            try{
                $token = $this->authService->signin(new CredentialsDTO($email,$password));
                $data = [
                    'access_token' => $token->jwt,
                    'expiration' => 43200,
                    'refresh_token' => $token->refreshToken,
                ];

                $response = $response->withStatus(200)->withHeader('Content-Type', 'application/json');
                $response->getBody()->write(json_encode($data));

            } catch(Exception $e) {
                $responseMessage = array(
                    "message" => "401 Authentification failed",
                    "exception" => array(
                        "type" => $e::class,
                        "code" => $e->getCode(),
                        "message" => $e->getMessage(),
                        "file" => $e->getFile(),
                        "line" => $e->getLine()
                    )
                );
                $response = $response->withStatus(401)->withHeader('Content-Type', 'application/json');
                $response->getBody()->write(json_encode($responseMessage));
            }
        }

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json');;
    }
}
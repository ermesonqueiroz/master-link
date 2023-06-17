<?php

namespace App\Main\Config;

use App\Utils\HttpUtils;

enum HttpRequestMethod: string
{
    case GET = "get";
    case POST = "post";
    case PUT = "put";
    case DELETE = "delete";
}

class Router
{
    private static array $routes = [
        "get" => [],
        "post" => [],
        "put" => [],
        "delete" => []
    ];
    
    private static function addRoute(string $route, HttpRequestMethod $requestMethod, callable $handler): void
    {
        $parsedRoute = Router::parseRoute($route);
        
        self::$routes[$requestMethod->value][$parsedRoute] = $handler;
    }
    
    private static function parseRoute(string $route): string
    {
        $parsedRoute = $route;
        
        if (str_ends_with($route, "/") && strlen($route) > 1) {
            $parsedRoute = substr_replace(
                $parsedRoute,
                "",
                -1
            );
        }
        
        return $parsedRoute;
    }

    static function get(string $route, callable $handler): void
    {
        self::addRoute(
            $route,
            HttpRequestMethod::GET,
            $handler
        );
    }

    static function post(string $route, callable $handler): void
    {
        self::addRoute(
            $route,
            HttpRequestMethod::POST,
            $handler
        );
    }

    static function put(string $route, callable $handler): void
    {
        self::addRoute(
            $route,
            HttpRequestMethod::PUT,
            $handler
        );
    }

    static function delete(string $route, callable $handler): void
    {
        self::addRoute(
            $route,
            HttpRequestMethod::DELETE,
            $handler
        );
    }
    
    private static function getRouteHandler(HttpRequestMethod $requestMethod, string $route): callable | null
    {
        return self::$routes[$requestMethod->value][$route];
    }
    
    private static function getRequestBody(): array
    {
        return json_decode(
            file_get_contents('php://input'),
            true
        );
    }

    static function dispatch(): void
    {
        $uri = self::parseRoute($_SERVER["REQUEST_URI"]);
        $requestMethod = strtolower($_SERVER["REQUEST_METHOD"]);
        
        $handler = self::getRouteHandler(
            HttpRequestMethod::from($requestMethod),
            $uri
        );
        
        
        if (!isset($handler)) {
            HttpUtils::notFound();
        }
        
        $handler(self::getRequestBody());
    }
}

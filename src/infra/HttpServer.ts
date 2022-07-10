import express from "express";

export type RouteConfig = {
    method: string;
    path: string;
};

export default class HttpServer {
    private app: any;

    constructor() {
        this.app = express();
    }

    route(config: RouteConfig) {
        return (target: any, propertyKey: any, descriptor: any) => {
            this.app[config.method](config.path, function (req: any, res: any) {
                const output = descriptor.value(req.params, req.body);
                res.json(output);
            });
        };
    }

    listen(port: number) {
        this.app.listen(port);
    }
}

const httpServer = new HttpServer();
httpServer.listen(3000);

export const http = httpServer;

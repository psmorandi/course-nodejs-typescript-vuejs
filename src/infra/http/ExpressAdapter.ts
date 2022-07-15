import Http from "./Http";
import express, { Request, Response } from "express";

export default class ExpressAdapter implements Http {
    app: any;

    constructor() {
        this.app = express();
    }

    route(method: string, url: string, callback: Function): void {
        this.app[method](url, function (req: Request, res: Response) {
            const output = callback(req.params, req.body);
            res.json(output);
        });
    }
    listen(port: number): void {
        this.app.listen(port);
    }
}

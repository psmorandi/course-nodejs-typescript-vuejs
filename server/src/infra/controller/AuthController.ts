import Http from "../http/Http";
export default class AuthController {
    constructor(readonly http: Http) {
        http.route("post", "/login", async function (_params: any, _body: any) {
            return {
                token: "123456"
            };
        });
    }
}

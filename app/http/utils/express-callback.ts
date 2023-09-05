import handleError from "./handle-error";

/**
 * @typedef {{body:object,headers?:object,statusCode?:number}} HttpResponse
 */

const makeExpressCallback = (controller) => {
    return (req, res) => {
        const httpRequest = makeHttpRequest(req);
        controller(httpRequest)
            .then((httpResponse) => {
                const headers = httpResponse.headers || {
                    "Content-Type": "application/json",
                };
                const statusCode = httpResponse.statusCode || 200;

                res.set(headers);

                return res.status(statusCode).send(httpResponse.body);
            })
            .catch((err) => {
                handleError(err, res, req);
            });
    };
};

/**
 * @typedef {{files?: object[],file?:object,body:object,query:object,params:object,ip:string,method:string,path:string,headers:object,user?:object,adminUser?:object,decoded?:object,userId:string,isAdminRequest:boolean}} HttpRequest
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {HttpRequest}
 */
function makeHttpRequest(req) {
    return {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
            "Content-Type": req.get("Content-Type"),
            Referer: req.get("referer"),
            "User-Agent": req.get("User-Agent"),
            "Access-Control-Allow-Origin": "*",
        },
        user: req.user,
        adminUser: req.adminUser,
        files: req.files,
        file: req.file,
        clientIp: req.clientIp,
        decoded: req.decoded,
        userId: req.decoded
            ? req.decoded.id
            : req.adminUser && req.params.id
            ? req.params.id
            : null,
    };
}

export default makeExpressCallback;

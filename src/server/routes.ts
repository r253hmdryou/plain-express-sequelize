import express from "express";

/**
 * routing function
 * @returns Router
 */
export function routing(): express.Router {
	return express.Router()
		.get("/hello", getHello)
		.get("/down", getDown)
		.use(notFound)
		.use(errorHandler);
}

/**
 * GET /hello
 * Hello World
 * @param _req request
 * @param res response
 * @returns void
 */
function getHello(_req: express.Request, res: express.Response): void {
	res
		.status(200)
		.json("Hello World!!");
}

/**
 * GET /down
 * Server Down
 * @param _req request
 * @param _res response
 * @param _next next
 * @returns void
 */
function getDown(_req: express.Request, _res: express.Response, _next: express.NextFunction): void {
	throw new Error("Down");
}

/**
 * Request Not Found
 * @param _req request
 * @param res response
 * @param _next next
 * @returns void
 */
function notFound(_req: express.Request, res: express.Response, _next: express.NextFunction): void {
	res
		.status(404)
		.json({
			code: "apiNotFound",
			message: "API Not Found. Please check the URL.",
		});
}

/**
 * Error Handler
 * @param _error error
 * @param _req request
 * @param res response
 * @param _next next
 * @returns void
 */
export function errorHandler(_error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction): void {
	res
		.status(500)
		.json({
			code: "internalServerError",
			message: "Internal Server Error",
		});
}

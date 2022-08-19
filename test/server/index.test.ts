import express from "express";
import request from "supertest";
import app from "app";
import { errorHandler } from "routes";

{
	describe("error handling", testError);
}

/**
 * error handling
 * @returns void
 */
function testError() {
	test("error handling", async() => {
		// 404 not found
		{
			const response = await request(app)
				.get(`/`);

			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				code: "apiNotFound",
				message: "API Not Found. Please check the URL.",
			});
		}

		// 500 internal server error
		{
			const response = await request(app)
				.get(`/down`);

			expect(response.status).toEqual(500);
			expect(response.body).toEqual({
				code: "internalServerError",
				message: "Internal Server Error",
			});
		}

		// error handling
		{
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
			errorHandler(new Error("test"), {} as express.Request, res as unknown as express.Response, {} as express.NextFunction);
			expect(res.status.mock.calls).toEqual([[500]]);
			expect(res.json.mock.calls).toEqual([[{
				code: "internalServerError",
				message: "Internal Server Error",
			}]]);
		}
	});
}

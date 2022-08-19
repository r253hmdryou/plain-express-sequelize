import http from "http";
import app from "app";

main();

/**
 * main function
 * @returns void
 */
function main(): void {
	const server = app.listen(3000);

	process
		.on("SIGINT", () => {
			console.log("SIGINT");
			gracefulShutdown(server);
		})
		.on("SIGTERM", () => {
			console.log("SIGTERM");
			gracefulShutdown(server);
		});
}

/**
 * gracefulShutdown function
 * @param server http server
 * @returns void
 */
function gracefulShutdown(server: http.Server): void {
	server.close((error) => {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		process.exit(0);
	});
}

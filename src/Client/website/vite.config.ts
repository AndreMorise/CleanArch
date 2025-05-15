// @ts-check
/// <reference types="node" />
import { URL, fileURLToPath } from "node:url";

import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { env } from "node:process";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const baseFolder =
	env.APPDATA !== undefined && env.APPDATA !== ""
		? `${env.APPDATA}/ASP.NET/https`
		: `${env.HOME}/.aspnet/https`;

const certificateName = "cleanarch.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
	fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
	if (
		0 !==
		child_process.spawnSync(
			"dotnet",
			[
				"dev-certs",
				"https",
				"--export-path",
				certFilePath,
				"--format",
				"Pem",
				"--no-password",
			],
			{ stdio: "inherit" },
		).status
	) {
		throw new Error("Could not create certificate.");
	}
}

const target = env.ASPNETCORE_HTTPS_PORT
	? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
	: env.ASPNETCORE_URLS
		? env.ASPNETCORE_URLS.split(";")[0]
		: "https://localhost:7077";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		proxy: {
			"^/api": {
				target,
				secure: false,
			},
		},
		port: Number.parseInt(env.DEV_SERVER_PORT || "61307"),
		https: {
			key: fs.readFileSync(keyFilePath),
			cert: fs.readFileSync(certFilePath),
		},
	},
});

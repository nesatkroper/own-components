#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import ora from "ora";
import degit from "degit";
import fs from "fs-extra";
import prompts from "prompts";

program
    .command("init")
    .description("Install your components")
    .action(async () => {
        const spinner = ora("Setting up components...").start();
        const targetDir = "./src/components/app";

        try {
            // Check if components already exist
            if (fs.existsSync(targetDir)) {
                spinner.stop();
                const { overwrite } = await prompts({
                    type: "confirm",
                    name: "overwrite",
                    message: "Components already exist. Overwrite?",
                    initial: false,
                });

                if (!overwrite) {
                    console.log(chalk.yellow("Operation cancelled. No files were changed."));
                    process.exit(0);
                }
                spinner.start("Overwriting components...");
            }

            const emitter = degit("nesatkroper/own-components/components", {
                force: true,
            });

            await emitter.clone(targetDir);
            spinner.succeed(chalk.green("Components installed successfully! 🎉"));
        } catch (err) {
            spinner.fail(chalk.red(`Error: ${err.message}`));
        }
    });

program.parse(process.argv);


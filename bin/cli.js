
import { program } from "commander";
import chalk from "chalk";
import ora from "ora";
import degit from "degit";
import fs from "fs-extra";

program
    .command("init")
    .description("Install your components")
    .action(async () => {
        const spinner = ora("Setting up your components...").start();

        try {
            const emitter = degit("nesatkroper/own-components/components", {
                force: true,
            });

            await emitter.clone("./temp-components");

            await fs.copy("./temp-components", "./src/components/app");
            await fs.remove("./temp-components");

            spinner.succeed(chalk.green("Components added successfully! 🎉"));
        } catch (err) {
            spinner.fail(chalk.red("Failed to install components: " + err.message));
        }
    });

program.parse(process.argv);
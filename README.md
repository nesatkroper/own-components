Get started by customizing your environment (defined in the .idx/dev.nix file) with the tools and IDE extensions you'll need for your project!

Learn more at https://developers.google.com/idx/guides/customize-idx-env

<!-- #!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import ora from "ora";
import degit from "degit";
import fs from "fs-extra";
import prompts from "prompts";
import { execSync } from "child_process";

program
  .command("init")
  .description("Install your components")
  .action(async () => {
    const spinner = ora("Setting up components...").start();
    const targetDir = "./src/components/app";

    try {
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

      // Ask if user wants Tailwind
      const { installTailwind } = await prompts({
        type: "confirm",
        name: "installTailwind",
        message: "Install Tailwind CSS and its dependencies?",
        initial: true,
      });

      if (installTailwind) {
        spinner.text = "Installing Tailwind CSS...";

        // Detect package manager (npm/yarn/pnpm)
        const packageManager = fs.existsSync("yarn.lock") ? "yarn" :
                              fs.existsSync("pnpm-lock.yaml") ? "pnpm" :
                              "npm";

        try {
          // Install Tailwind
          execSync(`${packageManager} add tailwindcss @tailwindcss/vite postcss autoprefixer`, { stdio: 'inherit' });

          // Generate config files
          execSync("npx tailwindcss init -p", { stdio: 'inherit' });

          spinner.succeed(chalk.green("Tailwind CSS installed & configured!"));
        } catch (err) {
          spinner.warn(chalk.yellow("Failed to install Tailwind automatically."));
          console.log(chalk.blue("You can install it manually with:"));
          console.log(chalk.blue("npm install tailwindcss @tailwindcss/vite postcss autoprefixer"));
        }
      }

      spinner.succeed(chalk.green("Components installed successfully! 🎉"));
    } catch (err) {
      spinner.fail(chalk.red(`Error: ${err.message}`));
    }
  });

program.parse(process.argv); -->

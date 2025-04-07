#!/usr/bin/env node
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
          console.log(
            chalk.yellow("Operation cancelled. No files were changed.")
          );
          process.exit(0);
        }
        spinner.start("Overwriting components...");
      }

      const emitter = degit("nesatkroper/own-components/components", {
        force: true,
      });

      await emitter.clone(targetDir);

      // Add Tailwind installation
      spinner.text = "Installing Tailwind CSS and dependencies...";
      try {
        // Ask the user if they want Tailwind
        const { installTailwind } = await prompts({
          type: "confirm",
          name: "installTailwind",
          message: "Install Tailwind CSS and its dependencies?",
          initial: true,
        });

        if (installTailwind) {
          const packageManager = fs.existsSync("yarn.lock")
            ? "yarn"
            : fs.existsSync("pnpm-lock.yaml")
            ? "pnpm"
            : "npm";

          execSync(
            `${packageManager} add tailwindcss @tailwindcss/vite postcss autoprefixer`,
            { stdio: "inherit" }
          );
        }
        if (installTailwind) {
          spinner.text = "Setting up Tailwind CSS...";
          try {
            execSync("npx tailwindcss init -p", { stdio: "inherit" });
            spinner.succeed("Tailwind config created!");
          } catch (err) {
            spinner.fail("Failed to create Tailwind config.");
            spinner.warn("Failed to install Tailwind automatically.");
            console.log(chalk.blue("You can install it manually with:"));
            console.log(
              chalk.blue(
                "npm install tailwindcss @tailwindcss/vite postcss autoprefixer"
              )
            );
          }
        }

        spinner.succeed(chalk.green("Tailwind CSS installed successfully!"));
      } catch (err) {
        spinner.warn(
          chalk.yellow("Failed to install Tailwind CSS automatically.")
        );
        console.log(
          chalk.blue("You may need to install Tailwind CSS manually:")
        );
        console.log(
          chalk.blue(
            "npm install tailwindcss @tailwindcss/vite postcss autoprefixer"
          )
        );
      }
      spinner.succeed(chalk.green("Components installed successfully! 🎉"));
    } catch (err) {
      spinner.fail(chalk.red(`Error: ${err.message}`));
    }
  });

program.parse(process.argv);

export const tailwindcssSetup = async () => {
  // Add Tailwind installation
  spinner.text = "Installing Tailwind CSS and dependencies...";

  try {
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

      execSync(`${packageManager} add -D tailwindcss@3 postcss autoprefixer`, {
        stdio: "inherit",
      });
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
          chalk.blue("npm install -D tailwindcss@3 postcss autoprefixer")
        );
      }
    }

    spinner.succeed(chalk.green("Tailwind CSS installed successfully!"));
  } catch (err) {
    spinner.warn(chalk.yellow("Failed to install Tailwind CSS automatically."));
    console.log(chalk.blue("You may need to install Tailwind CSS manually:"));
    console.log(
      chalk.blue("npm install -D tailwindcss@3 postcss autoprefixer")
    );
  }
};

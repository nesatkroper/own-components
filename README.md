Get started by customizing your environment (defined in the .idx/dev.nix file) with the tools and IDE extensions you'll need for your project!

Learn more at https://developers.google.com/idx/guides/customize-idx-env



<!-- program
  .command("add <component>")
  .description("Add a single component")
  .action(async (component) => {
    const spinner = ora(`Adding ${component}...`).start();
    
    try {
      const emitter = degit(
        `your-github-username/your-component-repo/components/${component}.tsx`,
        { force: true }
      );
      
      await emitter.clone(`./src/components/your-components/${component}.tsx`);
      spinner.succeed(chalk.green(`${component} added!`));
    } catch (err) {
      spinner.fail(chalk.red(`Component ${component} not found!`));
    }
  }); -->
import degit from "degit";

export const appComponentSetup = async (targetDir, spinner) => {
  try {
    const emitter = degit("nesatkroper/own-components/components", {
      force: true,
    });
    await emitter.clone(targetDir);
  } catch (error) {
    spinner.fail("Failed to setup app components");
    throw error;
  }
};

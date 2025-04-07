import degit from "degit";

export const appComponentSetup = async () => {
  try {
    const emitter = degit("nesatkroper/own-components/components", {
      force: true,
    });

    await emitter.clone(targetDir);
  } catch (error) {
    console.error("Error setting up app component:", error);
  }
};

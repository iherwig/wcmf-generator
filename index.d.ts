/**
 * Options accepted by `generate()`.
 */
export interface GenerateOptions {
  /**
   * Generator directory relative to build dir
   */
  base: string;
  /**
   * Working directory of the generator relative to build dir (usually the model directory)
   * The generator will read the file workflow.properties from this directory to configure the workflow
   */
  workdir: string;
  /**
   * Target directory relative to build dir
   */
  target: string;
}

/**
 * Run the generator with the given options.
 * Returns a string (path or message) or a Promise resolving to that string.
 */
export declare function generate(options: GenerateOptions): string | Promise<string>;

declare const _default: { generate: typeof generate };
export default _default;
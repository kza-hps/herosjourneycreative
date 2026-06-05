declare module "mammoth" {
  interface ConversionResult {
    value: string;
    messages: Array<{ type: string; message: string }>;
  }
  interface Options {
    buffer?: Buffer;
    path?: string;
  }
  function convertToHtml(options: Options): Promise<ConversionResult>;
}

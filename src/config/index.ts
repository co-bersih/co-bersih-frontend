export namespace cfg {
  export const API: string = process.env.NEXT_PUBLIC_APP_API_URL!
  export const KILOBYTE = 1024;
  export const MEGABYTE = KILOBYTE * KILOBYTE
  export const MAX_IMG_SIZE_IN_MEGABYTE = 4;
  export const HOURS = 60 * 60 * 1000;
}

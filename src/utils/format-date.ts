import { DateTime } from "luxon";

type FormatDateOptions = {
  date: string | Date;
  fromFormat?: string;
  toFormat: string;
};

export function formatDate(options: FormatDateOptions) {
  if (typeof options.date === "string") {
    return DateTime.fromFormat(options.date, options.fromFormat!).toFormat(
      options.toFormat
    );
  }

  return DateTime.fromJSDate(options.date).toFormat(options.toFormat);
}

import * as z from "zod";

export const estateStep1Schema = z
  .object({
    title: z
      .string()
      .trim()
      .min(4, "عنوان باید حداقل ۴ کاراکتر باشد")
      .max(80, "عنوان نباید بیشتر از ۸۰ کاراکتر باشد"),

    transaction_type: z.string().trim().min(1, "نوع معامله الزامی است"),

    capacity: z.coerce
      .number()
      .refine((val) => !isNaN(val), "ظرفیت باید عدد باشد")
      .int("ظرفیت باید عدد صحیح باشد")
      .min(1, "حداقل ظرفیت ۱ نفر است")
      .max(1000, "ظرفیت نامعتبر است"),

    price: z.coerce
      .number()
      .refine((val) => !isNaN(val), "قیمت باید عدد باشد")

      .min(1, "قیمت معتبر نیست"),

    discounted_price: z
      .union([
        z.coerce
          .number()
          .refine((val) => !isNaN(val), "قیمت باید عدد باشد")
          .min(0, "نامعتبر است"),
        z.literal(""),
      ])
      .optional(),

    rate: z
      .union([
        z.coerce
          .number()
          .refine((val) => !isNaN(val), "امتباز باید عدد باشد")
          .min(1)
          .max(5),
        z.literal(""),
      ])
      .optional(),

    categories: z.array(z.string()).min(1, "حداقل یک نوع ملک انتخاب کنید"),

    caption: z
      .string()
      .trim()
      .min(20, "توضیحات باید حداقل ۲۰ کاراکتر باشد")
      .max(1000, "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
  })
  .superRefine((val, ctx) => {
    if (
      typeof val.discounted_price === "number" &&
      val.discounted_price > val.price
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discounted_price"],
        message: "قیمت تخفیف‌دار نمی‌تواند بیشتر از قیمت اصلی باشد",
      });
    }
  });

export type EstateStep1FormValues = z.infer<typeof estateStep1Schema>;

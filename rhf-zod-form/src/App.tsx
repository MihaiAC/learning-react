import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Must be at least 2 characters" }),
  favoritePet: z.enum(["dog", "cat", "other"]),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/\d/, "Must include at least one number"),
  email: z.email(),
  telephone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]{5,}$/u,
      "Enter a valid phone number"
    ),
  url: z.url(),
  digit: z.int().min(1, "Must be at least 1").max(9, "Must be at most 9"),
  negativeNumber: z.number().negative(),
  date: z.iso.date().refine((v) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;
    return v <= todayStr;
  }, "Date cannot be in the future"),
  color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Please pick a color"),
  textArea: z.string().min(10, "Please write at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  // Print data to console on successful submit.
  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <div className="flex flex-col space-y-6 items-center h-screen bg-slate-700 text-white my-16">
      <h1 className="text-2xl font-bold">React Hook Form + Zod Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className="bg-white p-1 rounded-md text-black"
          />
          <p
            id="firstName-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.firstName ? "visible" : "invisible"
            }`}
          >
            {errors.firstName?.message || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="favoritePet">Favorite Pet</label>
          <select
            id="favoritePet"
            {...register("favoritePet")}
            aria-invalid={errors.favoritePet ? "true" : "false"}
            aria-describedby={
              errors.favoritePet ? "favoritePet-error" : undefined
            }
            className="bg-white text-black p-1 rounded-md"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
          <p
            id="favoritePet-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.favoritePet ? "visible" : "invisible"
            }`}
          >
            {(errors.favoritePet?.message as string) || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="bg-white text-black p-1 rounded-md"
          ></input>
          <p
            id="password-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.password ? "visible" : "invisible"
            }`}
          >
            {errors.password?.message || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="bg-white text-black p-1 rounded-md"
          ></input>
          <p
            id="email-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.email ? "visible" : "invisible"
            }`}
          >
            {errors.email?.message || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="telephone">Phone number</label>
          <input
            id="telephone"
            type="tel"
            {...register("telephone")}
            aria-invalid={errors.telephone ? "true" : "false"}
            aria-describedby={errors.telephone ? "telephone-error" : undefined}
            className="bg-white text-black p-1 rounded-md"
          ></input>
          <p
            id="telephone-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.telephone ? "visible" : "invisible"
            }`}
          >
            {errors.telephone?.message || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="url">Website link</label>
          <input
            id="url"
            type="url"
            {...register("url")}
            aria-invalid={errors.url ? "true" : "false"}
            aria-describedby={errors.url ? "url-error" : undefined}
            className="bg-white text-black p-1 rounded-md"
          ></input>
          <p
            id="url-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.url ? "visible" : "invisible"
            }`}
          >
            {errors.url?.message || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="digit">Pick a number between 1 and 9</label>
          <input
            id="digit"
            type="number"
            {...register("digit", { valueAsNumber: true })}
            aria-invalid={errors.digit ? "true" : "false"}
            aria-describedby={errors.digit ? "digit-error" : undefined}
            className="bg-white text-black p-1 rounded-md"
          ></input>
          <p
            id="digit-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.digit ? "visible" : "invisible"
            }`}
          >
            {(errors.digit?.message as string) || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="negativeNumber">Negative number, just because</label>
          <input
            id="negativeNumber"
            type="number"
            {...register("negativeNumber", { valueAsNumber: true })}
            aria-invalid={errors.negativeNumber ? "true" : "false"}
            aria-describedby={
              errors.negativeNumber ? "negativeNumber-error" : undefined
            }
            className="bg-white text-black p-1 rounded-md"
          ></input>
          <p
            id="negativeNumber-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.negativeNumber ? "visible" : "invisible"
            }`}
          >
            {(errors.negativeNumber?.message as string) || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="date">Today</label>
          <input
            id="date"
            type="date"
            {...register("date")}
            aria-invalid={errors.date ? "true" : "false"}
            aria-describedby={errors.date ? "date-error" : undefined}
            className="bg-white text-black p-1 rounded-md"
          ></input>
          <p
            id="date-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.date ? "visible" : "invisible"
            }`}
          >
            {(errors.date?.message as string) || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="color">Color</label>
          <input
            id="color"
            type="color"
            {...register("color")}
            aria-invalid={errors.color ? "true" : "false"}
            aria-describedby={errors.color ? "color-error" : undefined}
            className="bg-white text-black p-1 rounded-md"
          ></input>
          <p
            id="color-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.color ? "visible" : "invisible"
            }`}
          >
            {errors.color?.message || " "}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="textArea">Type something in here</label>
          <textarea
            id="textArea"
            {...register("textArea")}
            aria-invalid={errors.textArea ? "true" : "false"}
            aria-describedby={errors.textArea ? "textArea-error" : undefined}
            className="bg-white text-black p-1 rounded-md"
          ></textarea>
          <p
            id="textArea-error"
            aria-live="polite"
            className={`text-red-300 text-sm mt-1 h-5 ${
              errors.textArea ? "visible" : "invisible"
            }`}
          >
            {errors.textArea?.message || " "}
          </p>
        </div>

        <input
          type="submit"
          className="bg-lime-300 text-black rounded-md mx-auto p-2 border-2 border-black hover:border-lime-300"
        />
      </form>
    </div>
  );
}

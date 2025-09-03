import { useForm, type SubmitHandler } from "react-hook-form";

type PetEnum = "dog" | "cat" | "other";

interface IFormInput {
  firstName: string;
  favoritePet: PetEnum;
  password: string;
  email: string;
  telephone: string;
  url: string;
  digit: number;
  negativeNumber: number;
  date: string;
  color: string;
  textArea: string;
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // Print data to console on successful submit.
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
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
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
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
            {...register("favoritePet", {
              validate: (v) =>
                v !== "other" ? true : "Please choose Dog or Cat",
            })}
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
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
              pattern: {
                value: /^(?=.*\d).+$/,
                message: "Must include at least one number",
              },
            })}
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
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
            {...register("telephone", {
              required: "Phone number is required",
              pattern: {
                value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]{5,}$/,
                message: "Enter a valid phone number",
              },
            })}
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
            {...register("url", {
              required: "URL is required",
              pattern: {
                value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i,
                message: "Enter a valid URL",
              },
            })}
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
            {...register("digit", {
              valueAsNumber: true,
              required: "A number is required",
              min: { value: 1, message: "Must be at least 1" },
              max: { value: 9, message: "Must be at most 9" },
              validate: (v) =>
                Number.isInteger(v) ? true : "Must be an integer",
            })}
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
            {...register("negativeNumber", {
              valueAsNumber: true,
              required: "A negative number is required",
              max: { value: -1, message: "Must be negative" },
            })}
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
            {...register("date", {
              required: "Date is required",
              validate: (v) => {
                const today = new Date();
                const d = new Date(v);
                // clear time for comparison
                today.setHours(0, 0, 0, 0);
                d.setHours(0, 0, 0, 0);
                return d <= today || "Date cannot be in the future";
              },
            })}
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
            {...register("color", { required: "Color is required" })}
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
            {...register("textArea", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Please write at least 10 characters",
              },
            })}
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

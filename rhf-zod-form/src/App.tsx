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
  const { register, handleSubmit } = useForm<IFormInput>();

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
            {...register("firstName")}
            className="bg-white p-1 rounded-md text-black"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="favoritePet">Favorite Pet</label>
          <select
            {...register("favoritePet")}
            className="bg-white text-black p-1 rounded-md"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* TODO: Hash this when submitting (can be naive). */}
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            className="bg-white text-black p-1 rounded-md"
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            className="bg-white text-black p-1 rounded-md"
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="telephone">Phone number</label>
          <input
            type="tel"
            {...register("telephone")}
            className="bg-white text-black p-1 rounded-md"
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="url">Website link</label>
          <input
            type="url"
            {...register("url")}
            className="bg-white text-black p-1 rounded-md"
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="digit">Pick a number between 1 and 9</label>
          <input
            type="number"
            {...register("digit")}
            className="bg-white text-black p-1 rounded-md"
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="negativeNumber">Negative number, just because</label>
          <input
            type="number"
            {...register("negativeNumber")}
            className="bg-white text-black p-1 rounded-md"
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="date">Today</label>
          <input
            type="date"
            {...register("date")}
            className="bg-white text-black p-1 rounded-md"
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="color">Color</label>
          <input
            type="color"
            {...register("color")}
            className="bg-white text-black p-1 rounded-md"
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="textArea">Type something in here</label>
          <textarea
            {...register("textArea")}
            className="bg-white text-black p-1 rounded-md"
          ></textarea>
        </div>

        <input
          type="submit"
          className="bg-lime-300 text-black rounded-md mx-auto p-2 border-2 border-black hover:border-lime-300"
        />
      </form>
    </div>
  );
}

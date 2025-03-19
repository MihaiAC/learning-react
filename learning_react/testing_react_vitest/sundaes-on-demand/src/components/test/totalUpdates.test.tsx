import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../pages/order/Options";
import { SAMPLE_SCOOPS } from "./testingConstants";
import { pricePerItem } from "../../constants";
import { OptionType } from "../types/types";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={OptionType.Scoops} />);

  // Make sure total starts out at $0.00.
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  let runningTotal = 0;
  for (const [idx, { name }] of SAMPLE_SCOOPS.entries()) {
    const quantity = idx + 1;

    const input = await screen.findByRole("spinbutton", {
      name: new RegExp(`^${name}$`, "i"),
    });

    await user.clear(input);
    await user.type(input, quantity.toString());

    runningTotal += pricePerItem[OptionType.Scoops] * quantity;

    expect(scoopsSubtotal).toHaveTextContent(runningTotal.toFixed(2));
  }
});

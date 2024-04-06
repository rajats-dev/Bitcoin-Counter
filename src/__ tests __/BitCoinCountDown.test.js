import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import BitcoinCountdown from "../pages/BitcoinCountdown";
import { calculateFutureDate } from "../utils/calculateFutureDate";
import CountDownComponent from "../components/CountDownComponent";

describe("Testing the BitcoinComponent", () => {
  test("Testing h1 heading of app", () => {
    render(<BitcoinCountdown />);
    const text = screen.getByText(/Live Bitcoin Halving Countdown/i);
    expect(text).toBeInTheDocument();
  });

  test("Function should return the future date correctly", () => {
    const minutesToAdd = 2160;

    // Define the expected future date and formatted date considering IST offset
    const currentDate = new Date();
    const millisecondsToAdd = minutesToAdd * 60 * 1000;
    const futureDate = new Date(currentDate.getTime() + millisecondsToAdd);
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const expectedDate = new Date(futureDate.getTime() + ISTOffset);
    const expectedFormattedDate = expectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const result = calculateFutureDate(minutesToAdd);

    expect(result.predictDateTime.getTime()).toBeCloseTo(
      expectedDate.getTime(),
      -2
    );
    expect(result.formattedDate).toBe(expectedFormattedDate);
  });

  test("CountDownComponent Props testing", () => {
    const countdown = {
      days: 4,
      hours: 10,
      minutes: 30,
      seconds: 18,
    };

    const { getByText } = render(<CountDownComponent countdown={countdown} />);

    expect(getByText("4 :")).toBeInTheDocument();
    expect(getByText("10 :")).toBeInTheDocument();
    expect(getByText("30 :")).toBeInTheDocument();
    expect(getByText("18")).toBeInTheDocument();
    expect(getByText("DAYS")).toBeInTheDocument();
    expect(getByText("HOURS")).toBeInTheDocument();
    expect(getByText("MINS")).toBeInTheDocument();
    expect(getByText("SECS")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import OptionQuestion from "./OptionQuestion";
import type { OptionQuizQuestion } from "./quiz.types";

const question: OptionQuizQuestion = {
  id: "question-1",
  type: "multiple-choice",
  prompt: "Which SQL join returns all rows from the left table?",
  options: [
    {
      id: "option-a",
      text: "INNER JOIN",
    },
    {
      id: "option-b",
      text: "LEFT JOIN",
    },
  ],
  correctOptionId: "option-b",
  explanation: "LEFT JOIN returns all rows from the left table.",
};

describe("OptionQuestion", () => {
  it("renders the question and its options", () => {
    render(
      <OptionQuestion
        question={question}
        selectedOptionId={null}
        disabled={false}
        onSelectOption={() => undefined}
      />,
    );

    expect(
      screen.getByText(/which sql join returns all rows from the left table/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("radio", {
        name: /inner join/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("radio", {
        name: /left join/i,
      }),
    ).toBeInTheDocument();
  });

  it("reports the selected option ID", async () => {
    const user = userEvent.setup();
    const handleSelectOption = vi.fn();

    render(
      <OptionQuestion
        question={question}
        selectedOptionId={null}
        disabled={false}
        onSelectOption={handleSelectOption}
      />,
    );

    await user.click(screen.getByText("LEFT JOIN"));

    expect(handleSelectOption).toHaveBeenCalledWith("option-b");
  });

  it("marks the provided option as selected", () => {
    render(
      <OptionQuestion
        question={question}
        selectedOptionId="option-b"
        disabled={false}
        onSelectOption={() => undefined}
      />,
    );

    expect(
      screen.getByRole("radio", {
        name: /left join/i,
      }),
    ).toBeChecked();
  });

  it("disables its options after submission", () => {
    render(
      <OptionQuestion
        question={question}
        selectedOptionId="option-b"
        disabled
        onSelectOption={() => undefined}
      />,
    );

    expect(
      screen.getByRole("radio", {
        name: /inner join/i,
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole("radio", {
        name: /left join/i,
      }),
    ).toBeDisabled();
  });
});

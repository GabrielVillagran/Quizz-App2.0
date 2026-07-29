import { useState } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ShortAnswerQuestion from "./ShortAnswerQuestion";
import type { ShortAnswerQuizQuestion } from "./quiz.types";

const question: ShortAnswerQuizQuestion = {
  id: "question-3",
  type: "short-answer",
  prompt: "Which SQL clause groups rows with the same values?",
  acceptedAnswers: ["GROUP BY"],
  explanation: "GROUP BY organizes rows into groups based on shared values.",
};

describe("ShortAnswerQuestion", () => {
  it("renders the question and answer input", () => {
    render(
      <ShortAnswerQuestion
        question={question}
        value=""
        disabled={false}
        onChange={() => undefined}
      />,
    );

    expect(
      screen.getByText(/which sql clause groups rows with the same values/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /your answer/i,
      }),
    ).toBeInTheDocument();
  });

  it("displays the value controlled by its parent", () => {
    render(
      <ShortAnswerQuestion
        question={question}
        value="GROUP BY"
        disabled={false}
        onChange={() => undefined}
      />,
    );

    expect(
      screen.getByRole("textbox", {
        name: /your answer/i,
      }),
    ).toHaveValue("GROUP BY");
  });

  it("reports text changes to its parent", async () => {
    const user = userEvent.setup();

    function TestHarness() {
      const [value, setValue] = useState("");

      return (
        <ShortAnswerQuestion
          question={question}
          value={value}
          disabled={false}
          onChange={setValue}
        />
      );
    }

    render(<TestHarness />);

    const answerInput = screen.getByRole("textbox", {
      name: /your answer/i,
    });

    await user.type(answerInput, "GROUP BY");

    expect(answerInput).toHaveValue("GROUP BY");
  });

  it("disables the answer input after submission", () => {
    render(
      <ShortAnswerQuestion
        question={question}
        value="GROUP BY"
        disabled
        onChange={() => undefined}
      />,
    );

    expect(
      screen.getByRole("textbox", {
        name: /your answer/i,
      }),
    ).toBeDisabled();
  });
});

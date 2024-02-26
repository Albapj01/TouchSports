import React from "react";
import { getByRole, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Avatar from "../../../src/components/avatar/avatar";

describe("Avatar tests", () => {
  it("should render the avatar component", () => {
    const imageUrl = "";
    const name = "";
    const container = render(<Avatar imageUrl={imageUrl} name={name} />);

    expect(container).toBeInTheDocument;
  });
});

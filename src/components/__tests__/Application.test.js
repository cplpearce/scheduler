import React from "react";
import axios from "axios";

import {
  debug,
  prettyDOM,
  render,
  cleanup,
  waitForElement,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByDisplayValue,
} from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // create async test function
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // render the application in a compiled virtual container
    const { container, debug } = render(<Application />);
    // scan the container until it detects "Archie Cohen" -> basically document.onload
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // appointments = a greedy match of all children of the id-appointment el in the container
    const appointments = getAllByTestId(container, "appointment");
    // Select only the first appointment, as it will be blank due to the hardcoded data
    const appointment = appointments[0];
    // Log the appointment with prettyDOM for readability
    // console.log(prettyDOM(appointment));
    // FireEvent is a selenium like click action targeting the alt text of an img in this case
    fireEvent.click(getByAltText(appointment, "Add"));
    // Change is the same, but a string has been passed to the input matching placeholder text /enter student name/i(gnore case)
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Clinton Pearce" },
    });
    // Again, click the interviewerList img with alt text Sylvia Palmer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // Click the Button save (Save is it's innerHtml)
    fireEvent.click(getByText(appointment, "Save"));
    // Jest is expecting the 'Saving mode' to appear
    expect(
      getByText(appointment, /Saving Appointment.../i)
    ).toBeInTheDocument();
    // Just in case you're skeptical you can add not and verify it's not-not there :)
    // expect(getByText(appointment, "Saving")).not.toBeInTheDocument();
    // And waits for the appointments to render our new appointment
    await waitForElement(() => getByText(appointment, "Clinton Pearce"));
    // Debug commented out for clarity
    // debug();
    // Lastly scan all the 'day' test id's and select one with inner text 'Monday'
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    // We expect the day status to === 'no spots remaining'
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  /*
    "loads data, cancels an interview and increases the spots remaining for Monday by 1"
    "loads data, edits an interview and keeps the spots remaining for Monday the same"
    "shows the save error when failing to save an appointment"
    "shows the delete error when failing to delete an existing appointment"
  */

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // C O M P I L E   J S X   A N D    D E B U G   H T M L
    const { container, debug } = render(<Application />);
    // W A I T   F O R   A R C H I E
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // S E L E C T   H I S   A P P O I N T M E N T   B Y   T E S T - I D
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    // C L I C K
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // E X P E C T   R E G E X
    expect(
      getByText(appointment, "Are you sure? This will make Tori Malcolm sad.")
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    expect(
      getByText(appointment, /Deleting Appointment.../i)
    ).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render/compile a virtual container, and debug code
    const { container, debug } = render(<Application />);
    // wait for Archie to load up
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // Get all appointments by their test-id
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    // Click on the edit button, on the appointment matched to Archie
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // Find the input by its placeholder
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Clinton" },
    });
    // Change the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // Save this bad boi
    fireEvent.click(getByText(appointment, "Save"));
    // The Save mode should appear
    expect(getByText(appointment, "Saving Appointment...")).toBeInTheDocument();
    // Make sure *I'm* in the appointment
    await waitForElement(() => getByText(appointment, "Clinton"));
    // And check the monday counter
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    // Expect only one spot
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // debug();
  });

  it("shows the save error when failing to save an appointment", async () => {
    // C A L L   O U R   M O C K   A X I O S   P U T
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    // W A I T   F O R   A R C H I E S   A P P O I N T M E N T
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // G E T   A L L   M A T C H I N G   T E S T I D S   A N D   T A R G E T   A R C H I E
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    // C L I C K   T H E   E D I T   B U T T O N
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // E X P E X T   A R C H I E   T O   R E M A I N   I N   T H E   I N P U T
    expect(getByDisplayValue(appointment, "Archie Cohen"));
    // U P D A T E   T H E   S T U D E N T   N A M E
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Clinton" },
    });
    //  C L I C K   S A V E
    fireEvent.click(getByText(appointment, "Save"));
    // Debug
    // prettyDOM(appointment);
    expect(getByText(appointment, "Saving Appointment...")).toBeInTheDocument();
    // These are sort of redundant, as if we wait for it, we can therefore 'get' it
    await waitForElement(() =>
      getByText(
        appointment,
        "There was a massive error, the server might be on fire."
      )
    );
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // C A L L   O U R   M O C K   A X I O S   D E L E T E
    axios.delete.mockRejectedValueOnce();
    // C O M P I L E   J S X   I N T O   V I R T U A L   H T M L
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(
      getByText(appointment, "Deleting Appointment...")
    ).toBeInTheDocument();

    await waitForElement(() =>
      getByText(
        appointment,
        "There was an error deleting your appointment, someone unplugged the router."
      )
    );
  });
});

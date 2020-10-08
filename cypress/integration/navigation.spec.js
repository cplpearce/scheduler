// B A S I C   U I   N A V
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
// I N T E R A C T   W I T H   T H E   F O R M
describe("Front end user interaction", () => {
  it("Should clear the database", () => {
    // Reset the db
    cy.visit("http://localhost:8001/api/debug/reset");
  });
  it("should be able to book an interview", () => {
    // Clear the database
    // Load the page
    cy.visit("/");
    // Find a vacant appointment slot...  and click it
    cy.get(
      ":nth-child(2) > .appointment__add > .appointment__add-button"
    ).click();
    // Find the student name input...  And enter 'Clinton Pearce' at 1 char/125ms
    cy.get("[data-testid=student-name-input]").type("Clinton Pearce", {
      delay: 125,
    });
    // Find and click on the second mentor (Tori)
    cy.get(":nth-child(2) > .interviewers__item-image").click();
    // Submit the appointment
    cy.get(".button--confirm").click();
    // Wait up a sec
    cy.wait(1000);
    // Make sure we have the booked appointment
    cy.get(":nth-child(2) > .appointment__card").contains("Clinton Pearce");
  });
  it("should edit an interview", () => {
    // Load the page
    cy.visit("/");
    // Find the last appointment created... and make sure it's for Clinton Pearce
    cy.get(":nth-child(2) > .appointment__card").contains("Clinton Pearce");
    // Find, show and click the edit button
    cy.get(
      ":nth-child(2) > .appointment__card > .appointment__card-right > .appointment__actions > img"
    )
      .eq(0)
      .invoke("attr", "style", "display: inline")
      .click({ force: true });
    // Find the student name input...  And enter 'Clinton Pearce' at 1 char/125ms
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("robert'); drop table students --", {
        delay: 125,
      });
    // Find and click on the first mentor
    cy.get(":nth-child(1) > .interviewers__item-image").click();
    // Click the save button
    cy.get(".button--confirm").click();
    // Confirm there's a (robert') drop table students --) appointment
    cy.get(
      ":nth-child(2) > .appointment__card > .appointment__card-left > h2.text--regular"
    ).contains("robert'); drop table students --");
  });

  it("should cancel an interview", () => {
    // Load the page
    cy.visit("/");
    // Find the last appointment created... and make sure it's for Clinton Pearce
    cy.get(":nth-child(2) > .appointment__card").contains(
      "robert'); drop table students --"
    );
    // Find, show, and click the Delete button
    cy.get(
      ":nth-child(2) > .appointment__card > .appointment__card-right > .appointment__actions > img"
    )
      .eq(1)
      .invoke("attr", "style", "display: inline")
      .click({ force: true });
    // Click the delete button
    cy.get(
      ".appointment__card > .appointment__actions > :nth-child(2)"
    ).click();
    // Confirm there's no 'robert'); drop table students --' appointment
    cy.get(
      ":nth-child(2) > .appointment__card > .appointment__card-left > h2.text--regular"
    ).should("not.exist");
  });
});

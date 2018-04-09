import { XrmMockGenerator } from "../../src/xrm-mock-generator/index";
import { LookupValueMock, XrmStaticMock } from "../../src/xrm-mock/index";
import { PageMock } from "../../src/xrm-mock/page/page.mock";
import { StringAttributeMock } from "../../src/xrm-mock/page/stringattribute/stringattribute.mock";

describe("XrmMockGenerator.Attribute", () => {
  let page: PageMock;
  beforeEach(() => {
    page = XrmMockGenerator.initialise().Page;
  });

  it("should create a string attribute", () => {
    XrmMockGenerator.Attribute.createString("firstname", "Joe");
    expect(Xrm.Page.getAttribute("firstname").getValue()).toBe("Joe");
  });

  it("should create a string attribute and default the control", () => {
    XrmMockGenerator.Attribute.createString("firstname", "Joe");
    let count = 0;
    Xrm.Page.getAttribute("firstname").controls.forEach((c) => {
      count++;
      expect(c.getName()).toBe("firstname");
    });
    expect(count).toBe(1);
  });

  it("should create a string control with Label", () => {
    XrmMockGenerator.Control.createString(StringAttributeMock.create("firstname"), "firstname", true, false,
                                          "First Name");
    expect(Xrm.Page.getControl("firstname").getLabel()).toBe("First Name");
  });

  it("should create a boolean attribute", () => {
    XrmMockGenerator.Attribute.createBool("new_havingfun", true);
    expect(Xrm.Page.getAttribute("new_havingfun").getValue()).toEqual(true);
  });

  it("should create a date attribute without a time component", () => {
    const christmas = new Date(1960, 12, 25);
    XrmMockGenerator.Attribute.createDate("christmas", christmas);
    expect(Xrm.Page.getAttribute("christmas").getValue()).toBe(christmas);
  });

  it("should create a lookup", () => {
    XrmMockGenerator.Attribute.createLookup("primarycustomerid", new LookupValueMock("5555", "contact"));
    expect(Xrm.Page.getAttribute("primarycustomerid").getValue()[0].id).toBe("5555");
  });

  it("should create a number", () => {
    XrmMockGenerator.Attribute.createNumber("units", 3);
    expect(Xrm.Page.getAttribute("units").getValue()).toBe(3);
  });

  it("should run wiki bare basic code", () => {
    // This is the Sample Code that is displayed on the wiki:
    // https://github.com/camelCaseDave/xrm-mock/wiki/Adding-Attributes
    const stringAttribute = XrmMockGenerator.Attribute.createString("firstname", "Joe");
    const boolAttribute   = XrmMockGenerator.Attribute.createBool("havingFun", true);
    const dateAttribute   = XrmMockGenerator.Attribute.createDate("birthdate", new Date(1980, 12, 25));
    const numberAttribute = XrmMockGenerator.Attribute.createNumber("units", 2);
    const lookupAttribute = XrmMockGenerator.Attribute.createLookup("primarycustomerid", {
      entityType: "contact",
      id: "{00000000-0000-0000-0000-000000000001}",
      name: "Joe Bloggs",
    });
    const optionSetAttribute = XrmMockGenerator.Attribute.createOptionSet("countries", 0, [
        { text: "Austria", value: 0 },
        { text: "France", value: 1 },
        { text: "Spain", value: 2 },
    ]);

    expect(page.getAttribute("firstname").getValue()).toBe("Joe");
    expect(page.getAttribute("havingFun").getValue()).toBe(true);
    expect(page.getAttribute("birthdate").getValue()).toEqual(new Date(1980, 12, 25));
    expect(page.getAttribute("units").getValue()).toBe(2);
    expect(page.getAttribute<Xrm.Page.LookupAttribute>("primarycustomerid").getValue()[0].id)
      .toBe("{00000000-0000-0000-0000-000000000001}");
    expect(page.getAttribute("countries").getValue()).toBe(0);
  });

  it("should default name for control from attribute", () => {
    // This example creates an attribute with the given properties, as well as two controls for it
    const stringAttribute = XrmMockGenerator.Attribute.createNumber({
      name: "number",
    },
    // This can be a single instance of control components, or an array of control components as it is here
    [{
      label: "Number 1",
    }, {
      label: "Number 2",
    }]);
    const controls = page.getAttribute("number").controls;
    expect(controls.getLength()).toBe(2);
    expect(controls.get("number")).toBeTruthy();
    expect(controls.get("number1")).toBeTruthy();
  });

  it("should run wiki component code", () => {
    // This is the Component Code that is displayed on the wiki:
    // https://github.com/camelCaseDave/xrm-mock/wiki/Adding-Attributes

    // This example creates an attribute with the given properties, as well as two controls for it
    const stringAttribute = XrmMockGenerator.Attribute.createString({
      format: "email",           // Applies to all attributes, but potential values are attribute specific
      isDirty: true,             // Applies to all standard attributes
      maxLength: 50,             // This is specific for String Only
      name: "emailaddress1",     // Applies to all attributes
      requiredLevel: "required", // Applies to all standard attributes
      submitMode: "always",      // Applies to all standard attributes
      value: "test@test.com",    // Applies to all standard attributes, but type is attribute specific
    },
    // This can be a single instance of control components, or an array of control components as it is here
    [{
      disabled: true,
      label: "Email",
      name: "emailaddress1",
      visible: false,
    }, {
      label: "Notification Email",
      name: "header_emailaddress1",
    }]);

    expect(page.getAttribute("emailaddress1").getValue()).toBe("test@test.com");
    expect(page.getControl("emailaddress1").getVisible()).toBe(false);
    expect(page.getControl<Xrm.Page.StringControl>("header_emailaddress1").getLabel()).toBe("Notification Email");
  });
});

import { XrmStaticMock } from "../src/xrm-mock/xrmstatic.mock";

describe("XrmStatic Mock", () => {
    beforeEach(() => {
        this.xrmStaticMock = new XrmStaticMock({});
    });
    it("should exist", () => {
        expect(this.xrmStaticMock).toBeDefined();
    });
});

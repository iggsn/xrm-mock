"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var attribute_mock_1 = require("../attribute/attribute.mock");
var LookupAttributeMock = /** @class */ (function (_super) {
    __extends(LookupAttributeMock, _super);
    function LookupAttributeMock(components) {
        var _this = _super.call(this, LookupAttributeMock.defaultComponents(components)) || this;
        _this.isPartyList = components.isPartyList;
        return _this;
    }
    LookupAttributeMock.defaultComponents = function (components) {
        if (!("isPartyList" in components)) {
            components.isPartyList = false;
        }
        components.attributeType = "lookup";
        return components;
    };
    LookupAttributeMock.prototype.getIsPartyList = function () {
        return this.isPartyList;
    };
    return LookupAttributeMock;
}(attribute_mock_1.AttributeMock));
exports.LookupAttributeMock = LookupAttributeMock;
//# sourceMappingURL=lookupattribute.mock.js.map
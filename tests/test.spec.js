"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@playwright/test");
var dotenv_1 = require("dotenv");
var fs_1 = require("fs");
dotenv_1.default.config();
(0, test_1.test)("collectData", function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        var headers, _i, _b, head, h, row_data, i, counter, _c, _d, row, columns, data, cntr, _e, columns_1, col, col_data, new_col, header, data_content, row_header, outputArray, outputFile;
        var _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, page.goto("https://hcc-tams.com.ph/tams/filing/overtime/")];
                case 1:
                    _h.sent();
                    return [4 /*yield*/, (0, test_1.expect)(page).toHaveTitle(/TAMSv2/)];
                case 2:
                    _h.sent();
                    return [4 /*yield*/, (0, test_1.expect)(page.locator("table")).toBeVisible({ timeout: 60000 })];
                case 3:
                    _h.sent();
                    headers = [];
                    _i = 0;
                    return [4 /*yield*/, page.locator("table thead tr th").all()];
                case 4:
                    _b = _h.sent();
                    _h.label = 5;
                case 5:
                    if (!(_i < _b.length)) return [3 /*break*/, 8];
                    head = _b[_i];
                    return [4 /*yield*/, head.innerText()];
                case 6:
                    h = _h.sent();
                    headers.push(h);
                    _h.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8:
                    headers.pop();
                    row_data = [];
                    i = 1;
                    _h.label = 9;
                case 9:
                    if (!(i <= 3)) return [3 /*break*/, 24];
                    counter = 0;
                    return [4 /*yield*/, (0, test_1.expect)(page.locator("table")).toBeVisible()];
                case 10:
                    _h.sent();
                    _c = 0;
                    return [4 /*yield*/, page.locator("table tbody tr").all()];
                case 11:
                    _d = _h.sent();
                    _h.label = 12;
                case 12:
                    if (!(_c < _d.length)) return [3 /*break*/, 21];
                    row = _d[_c];
                    return [4 /*yield*/, (0, test_1.expect)(row).toBeVisible()];
                case 13:
                    _h.sent();
                    return [4 /*yield*/, row.locator("td").all()];
                case 14:
                    columns = _h.sent();
                    data = [];
                    cntr = 0;
                    _e = 0, columns_1 = columns;
                    _h.label = 15;
                case 15:
                    if (!(_e < columns_1.length)) return [3 /*break*/, 19];
                    col = columns_1[_e];
                    return [4 /*yield*/, (0, test_1.expect)(col).toBeVisible()];
                case 16:
                    _h.sent();
                    return [4 /*yield*/, col.innerText()];
                case 17:
                    col_data = _h.sent();
                    if (col_data) {
                        new_col = col_data.trim();
                        header = headers[cntr];
                        cntr++;
                        data_content = (_f = {}, _f[header] = new_col, _f);
                        data.push(data_content);
                    }
                    _h.label = 18;
                case 18:
                    _e++;
                    return [3 /*break*/, 15];
                case 19:
                    data.pop();
                    counter++;
                    row_header = "Page ".concat(i, " | Row ").concat(counter);
                    row_data.push((_g = {}, _g[row_header] = data, _g));
                    _h.label = 20;
                case 20:
                    _c++;
                    return [3 /*break*/, 12];
                case 21: return [4 /*yield*/, page.locator("li.paginate_button.next a").click()];
                case 22:
                    _h.sent();
                    _h.label = 23;
                case 23:
                    i++;
                    return [3 /*break*/, 9];
                case 24:
                    outputArray = JSON.stringify(row_data, null, 2);
                    outputFile = "./test-results/output.json";
                    fs_1.default.writeFileSync(outputFile, outputArray);
                    return [4 /*yield*/, page.waitForTimeout(3000)];
                case 25:
                    _h.sent();
                    return [2 /*return*/];
            }
        });
    });
});
// Global teardown
test_1.test.afterEach(function (_a) {
    var page = _a.page;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // Close the browser after each test
                return [4 /*yield*/, page.context().close()];
                case 1:
                    // Close the browser after each test
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
// Global setup
test_1.test.beforeEach(function (_a) {
    var browser = _a.browser;
    return __awaiter(void 0, void 0, void 0, function () {
        var context, page;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, browser.newContext()];
                case 1:
                    context = _b.sent();
                    return [4 /*yield*/, context.newPage()];
                case 2:
                    page = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});

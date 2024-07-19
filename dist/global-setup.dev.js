"use strict";

var _require = require("@playwright/test"),
    chromium = _require.chromium,
    expect = _require.expect;

var fs = require("fs");

var dotenv = require("dotenv");

dotenv.config();

function globalSetup() {
  var browser, context, page, folderPath, filePath, fullPath;
  return regeneratorRuntime.async(function globalSetup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(chromium.launch());

        case 2:
          browser = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(browser.newContext());

        case 5:
          context = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(context.newPage());

        case 8:
          page = _context.sent;
          _context.prev = 9;
          console.log("Navigating to login page...");
          _context.next = 13;
          return regeneratorRuntime.awrap(page["goto"]('https://www.hcc-tams.com.ph/tams/Auth', {
            timeout: 60000
          }));

        case 13:
          console.log("Filling in credentials...");
          _context.next = 16;
          return regeneratorRuntime.awrap(page.type('input[name="username"]', '15913'));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(page.type('input[name="password"]', '546609529'));

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(page.click('button[type="submit"]'));

        case 20:
          console.log("Waiting for profile page to load...");
          _context.next = 23;
          return regeneratorRuntime.awrap(expect(page).toHaveTitle(/profile/i));

        case 23:
          console.log("Saving authentication state...");
          folderPath = "./.auth";
          filePath = "/admin.json";
          fullPath = folderPath + filePath;
          fs.mkdirSync(folderPath, {
            recursive: true
          });

          if (!fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, "");
          }

          _context.next = 31;
          return regeneratorRuntime.awrap(page.context().storageState({
            path: fullPath
          }));

        case 31:
          console.log("Authentication state saved successfully.");
          _context.next = 38;
          break;

        case 34:
          _context.prev = 34;
          _context.t0 = _context["catch"](9);
          console.error('Error during global setup:', _context.t0);
          throw _context.t0;

        case 38:
          _context.prev = 38;
          _context.next = 41;
          return regeneratorRuntime.awrap(browser.close());

        case 41:
          return _context.finish(38);

        case 42:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[9, 34, 38, 42]]);
}

module.exports = globalSetup;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var excel = require("exceljs");
var fs = require("fs");
var path = require("path");
const axios = require("axios");
const moment_1 = __importDefault(require("moment"));
const response_helpers_1 = __importDefault(require("../helpers/response.helpers"));
class downloadData {
    downloadUsersData(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileName = "Users - " + new Date().toISOString().split("T")[0];
                console.log(fileName);
                var workbook = new excel.Workbook();
                var worksheet = workbook.addWorksheet("Users");
                worksheet.columns = [
                    { header: "S.NO", key: "sno", width: 6 },
                    { header: "First Name", key: "first_name", width: 30 },
                    { header: "Last Name", key: "last_name", width: 30 },
                    { header: "Email", key: "email", width: 50 },
                    { header: "DOB", key: "date_of_birth", width: 30 },
                    { header: "Created Date", key: "created_at", width: 20 }
                ];
                for (let each of data) {
                    console.log(each);
                    each.sno = data.indexOf(each) + 1;
                    (each.date_of_birth = (0, moment_1.default)(each.date_of_birth).format("MM-DD-YYYY"));
                    (each.created_at = (0, moment_1.default)(each.created_at).format("MM-DD-YYYY"));
                    worksheet.addRow(each);
                }
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                var tempFilePath = __dirname + "/" + fileName + ".xlsx";
                workbook.xlsx.writeFile(tempFilePath).then(function () {
                    return res.download(path.join(__dirname + "/" + fileName + ".xlsx"), fileName + ".xlsx", function (data, err) {
                        fs.unlinkSync(tempFilePath);
                    });
                });
            }
            catch (err) {
                console.log("OOOOOOO this is the error: " + err);
                res
                    .status(500)
                    .json(yield response_helpers_1.default.validationErrorResponse(new Error("Error in Downloading File.")));
            }
        });
    }
    uploadData() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // const { file_path, strategy_type_name } = data;
                        const file_path = "/Volumes/Work/SampleProject/Users - 2022-07-24xlsx";
                        console.log(file_path);
                        const workbook = new excel.Workbook();
                        // const res = await axios.get(`${file_path}`, {
                        // 	responseType: "arraybuffer",
                        // });
                        const users = [];
                        // console.log(res)
                        // let strategyTypeName = strategy_type_name;
                        // let format: any = config.sheet_mapping[strategyTypeName];
                        // if (!format) {
                        // 	let err: any = new Error(i18n.__("no_strategy_format_found"));
                        // 	err.statusCode = 400;
                        // 	throw err;
                        // }
                        let format = [
                            "S No",
                            "First Name",
                            "Last Name",
                            "Email",
                            "Mobile No.",
                            "Address",
                            "City",
                            "State",
                            "Country",
                            "Postal Code",
                            "Updated At"
                        ];
                        yield workbook.xlsx.readFile("/Volumes/Work/SampleProject/Users - 2022-07-24xlsx").then((workbook) => __awaiter(this, void 0, void 0, function* () {
                            yield workbook.eachSheet((worksheet, id) => __awaiter(this, void 0, void 0, function* () {
                                yield worksheet.eachRow(function (user, rowNumber) {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        if (rowNumber != 1) {
                                            const _user = {};
                                            let values = user.values;
                                            console.log(values);
                                            values.shift(); // remove first element , because its empty
                                            format.forEach((value, index) => {
                                                let _value = values[index];
                                                if (_value == undefined)
                                                    _value = null;
                                                _user[value] = _value;
                                            });
                                            users.push(_user);
                                        }
                                    });
                                });
                            }));
                        }));
                        return resolve(users);
                    }
                    catch (error) {
                        return reject(error);
                    }
                });
            });
        });
    }
}
exports.default = new downloadData();

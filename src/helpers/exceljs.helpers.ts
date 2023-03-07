var excel = require("exceljs");
var fs = require("fs");
var path = require("path");
const axios = require("axios");
import moment from "moment";
import response from "../helpers/response.helpers";

class downloadData {
    async downloadUsersData(data:any, res:any){
        try{
            let fileName = "Users - " + new Date().toISOString().split("T")[0];
            console.log(fileName)
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet("Users");

            worksheet.columns = [
                { header: "S.NO", key: "sno", width: 6 },
                { header: "First Name", key: "first_name", width: 30 },
                { header: "Last Name", key: "last_name", width: 30 },
                { header: "Email", key: "email", width: 50 },
                { header: "DOB", key: "date_of_birth", width: 30 },
                { header: "Created Date", key: "created_at", width: 20 }
            ]

            for(let each of data){
                console.log(each)
                each.sno = data.indexOf(each)+1;
                (each.date_of_birth = moment(each.date_of_birth).format("MM-DD-YYYY"));
                (each.created_at = moment(each.created_at).format(
					"MM-DD-YYYY"
				));
                worksheet.addRow(each)
            }

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            var tempFilePath = __dirname + "/" + fileName + ".xlsx";
            workbook.xlsx.writeFile(tempFilePath).then(function () {
                return res.download(
                    path.join(__dirname + "/" + fileName + ".xlsx"),
                    fileName + ".xlsx",
                    function (data: any, err: any) {
                        fs.unlinkSync(tempFilePath);
                    }
                );
            });

        }catch(err){
            console.log("OOOOOOO this is the error: " + err);
			res
				.status(500)
				.json(
					await response.validationErrorResponse(
						new Error("Error in Downloading File.")
					)
				);
        }
    }

    async uploadData(){
        return new Promise(async function(resolve, reject){
            try{
                // const { file_path, strategy_type_name } = data;
                const file_path = "/Volumes/Work/SampleProject/Users - 2022-07-24xlsx"
                console.log(file_path)
				const workbook = new excel.Workbook();

				// const res = await axios.get(`${file_path}`, {
				// 	responseType: "arraybuffer",
				// });
				const users: any = [];
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
                ]
				await workbook.xlsx.readFile("/Volumes/Work/SampleProject/Users - 2022-07-24xlsx").then(async (workbook: any) => {
					await workbook.eachSheet(async (worksheet: any, id: any) => {
						await worksheet.eachRow(async function (user: any, rowNumber: any) {
							if (rowNumber != 1) {
								const _user: any = {};
								let values = user.values;
                                console.log(values)
								values.shift(); // remove first element , because its empty
								format.forEach((value: any, index: any) => {
									let _value = values[index];
									if (_value == undefined) _value = null;
									_user[value] = _value;
								});
								users.push(_user);
							}
						});
					});
				});
				return resolve(users);
            }catch(error){
                return reject(error)
            }
        })
    }
}

export default new downloadData();
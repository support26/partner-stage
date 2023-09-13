import Api, { baseUrl } from "./config";

class FormRepository {
  async uploadCasesDataSheets(file) {
    let token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await Api.post(
        `${baseUrl}forms/uploadCaseDataSheet`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // get getAllCases
  async showAllCases() {
    try {
      let token = localStorage.getItem("token");
      const response = await Api.get(`${baseUrl}forms/getAllCases/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new FormRepository();

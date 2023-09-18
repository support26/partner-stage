import CasesRepository from "../api/CasesRepository";
export default function useForms() {
  return {
    uploadCaseDataSheet: async (data) => {
      let responseData = await CasesRepository.uploadCasesDataSheets(data);
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    getAllCasesData: async () => {
      let responseData = await CasesRepository.showAllCases();
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },
  };
}

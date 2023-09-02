import FormRepository from "../api/FormRepository";
export default function useForms() {
  return {
    AddRoles: async (data) => {
      let responseData = await FormRepository.addRole(data);
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    ShowAllRoles: async (project_id) => {
      console.log("project_id*****", project_id);
      let responseData = await FormRepository.showAllRolesByProjectId(
        project_id
      );
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    EnableDisableUserRoles: async (data) => {
      let responseData = await FormRepository.enableDisableUserRole(data);
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    DeleteUserRole: async (role_id) => {
      var responseData = await FormRepository.deleteUserRole(role_id);
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    UpdateUserTrainingStatusById: async (data, ID) => {
      let responseData = await FormRepository.updateUserTrainingStatusById(
        data,
        ID
      );
      if ((responseData.status = 200)) {
        // console.log(responseData.data);
      }
      return responseData;
    },
    ApproveUserById: async (data, ID) => {
      let responseData = await FormRepository.approveUserById(data, ID);
      if ((responseData.status = 200)) {
        // console.log(responseData.data);
      }
      return responseData;
    },
    AssignRoleToUser: async (data) => {
      let responseData = await FormRepository.assignRoleToUser(data);
      if ((responseData.status = 200)) {
        // console.log(responseData.data);
      }
      return responseData;
    },
    GetAllActiveUserRoles: async () => {
      let responseData = await FormRepository.getAllActiveUserRoles();
      if ((responseData.status = 200)) {
        // console.log(responseData.data);
      }
      return responseData;
    },
  };
}

// const port = 3030

export default class ApiConfig {
   // static API_BASE_URL = 'http://localhost:' + port;
    static API_BASE_URL =  import.meta.env.VITE_SERVER_ORIGIN;
    static API_REGISTER_URL = this.API_BASE_URL + '/auth/register';
    static API_LOGIN_URL = this.API_BASE_URL + '/auth/login';
    static API_LOGOUT_URL = this.API_BASE_URL + '/auth/logout';
    static API_CREATE_PROJECT_URL = this.API_BASE_URL + '/create-project';
    static API_PROJECT_LIST_URL = this.API_BASE_URL + '/project-list';
    static API_UPDATE_PROJECT_STATUS_URL = this.API_BASE_URL + '/update-status';
    static API_DASHBOARD_URL = this.API_BASE_URL + '/dashboard';
    static API_CHART_URL = this.API_BASE_URL + '/chart';
}

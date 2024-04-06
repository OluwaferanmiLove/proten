//Login params
export interface LoginParams {
  usr: string;
  pwd: string;
}

//Register rsponse
export interface LoginResponse {
  message: string;
  home_page: string;
  full_name: string;
}

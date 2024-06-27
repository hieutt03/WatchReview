export enum RouterEndpoint {
    Home = "/",
    Login = "/login",
    Signup = "/sign-up",
    Brand = "brands",
    Watch = "watches",
    Account = "accounts",
    Admin = "admin",
    CreateBrand = "create-brand",
    CreateWatch = "create-watch",
    UpdateWatch = "update-watch",
    UpdateBrand = "update-brand",
    UpdateProfile = "update-profile",
    DeleteBrand = "delete-brand",
    DeleteWatch = "delete-watch",
    GetBrand = "brands/:brandId",
    GetWatch = "watches/:watchId",
    GetAccount = "accounts/:accountId"
}
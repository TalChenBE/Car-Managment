# Car Managment-frontend:

This is a simple website. To view it [click here](https://car-managment-tm.vercel.app/).<br>
The car management service allows car owners to manage their vehicles' maintenance, repairs, and other related activities.

## Instalaion:

To run the project first install all the node modules:

```bash
npm i
```

OR

```bash
yarn
```

To run this ripo you need the backend  side for now it running in the domain: [Car-Management-Service-Back-end.](https://car-management-back-end.vercel.app/api/)

If you want you can visit the backend side: [MoshPe/Car-Management-Back-end](https://github.com/MoshPe/Car-Management-Back-end), if you take this repo and run it locally then please in the `.env` file change the `REACT_APP_BASE_UR` to the URL that you run it.

Note: we use ReCAPTCHA on our website if you want to run it you need to create one key for your domain.

<br/>
<br/>

After that you are all set and can run the project:

```bash
npm run start
```

OR

```bash
yarn start
```

## Deployment

This git repo is connected to a vercel account that is associated with TalChenBE/Car-Managment github repo. Vercel domain: https://car-managment-tm.vercel.app

#NOTE! !!!The backend requires authentication using JWT so in order to use the service, login is required.!!!

## Project Description

In the src folder, there are 3 main folders:

1. components: this folder contains all the react components we create in this project, the main component that you can find there:

- ContactUs
- Dashboard
- ForgetPassword
- Login
- Navbar
- PageNotFound
- ReastPassword
- Sidenav
- Signup
- Table

2. hooks: this folder contains the custom hooks we created.
3. utils: the utils of our project


# Enjoy! 😃

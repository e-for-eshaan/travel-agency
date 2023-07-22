# Travel App

A config management dashboard

# Setup

![image](https://github.com/e-for-eshaan/travel-agency/assets/76566992/c797ce9d-3877-43dd-9b4b-1830be2eb737)

The app contains 2 folders, `myproject` for the Django-base backend that exposes REST-APIs and the React-based `frontend`, which exposes the frontend part of the entire web-app.

To run the Django app, change to the myproject directory and spin the django server up:

```
cd myproject
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Now let's spin the front end up, make sure to install the npm packages

```
cd front-end
npm install
npm start
```

we're good to go @http://localhost:3000/

![image](https://github.com/e-for-eshaan/travel-agency/assets/76566992/f0750d5d-803e-44da-a7fe-4d8a35d733d1)

# Creating Configs

  <img src="https://github.com/e-for-eshaan/travel-agency/assets/76566992/a1943f05-3aa8-406a-bcbc-4c983f025c97" width=500 />
  
  <br/>
  
 - Select the create config option. 
 - Since there were a lot of values, I decided to handle the form randomly!
 - Use the `Random` button to generate a random config, and then hit submit.
 - This creates a config and fetches the entire data, again.
  <br/>
  <br/>

![createConfig](https://github.com/e-for-eshaan/travel-agency/assets/76566992/e177e74d-3dd3-4f12-b9d7-cad14259ca2a)

# Live Toggle

- The app allows us to change the Live flag of a config.
- Note that, only 1 and atleast 1 config is live at any time.
- On calling the live function, the older live value is removed and the newer config set it's live flag to true.

![image](https://github.com/e-for-eshaan/travel-agency/assets/76566992/39ede2e0-e76f-4bae-9b63-20cf8e88cdfc)

# Calculating Live Config Price

- Price calculation takes place using 3 parameters, `distance`, `time`, and `waiting time`.
- It uses the values from the Live config only.
- It supplies the values as an object.

![LivepriceCalculator](https://github.com/e-for-eshaan/travel-agency/assets/76566992/8469425e-1a59-4f5c-8660-a5e1d89bc3bd)

# Easter Egg - Data Visualizer

- Click any table of config, and the line graph for the Day based pricing pops up.
- Provides a simple representation for debugging purposes

![image](https://github.com/e-for-eshaan/travel-agency/assets/76566992/b00e75e9-6fbb-4042-9114-390df9721768)

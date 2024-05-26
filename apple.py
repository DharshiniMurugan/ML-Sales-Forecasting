import xgboost as xgb
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import csv

from flask import Flask, render_template, request, json, jsonify
from flask_cors import CORS

app= Flask(__name__)
cors = CORS(app)
cors = CORS(app, resources={r"/predict": {"origins": "http://localhost:4200"}})
data = None
@app.route('/predict', methods=['POST'])

def predict():
    global prediction_json
    global data

    file = request.files['file']
    name = int(request.form['name'])#number of weeks
    choose = request.form['choose']#weeks, hours

    file_path = "./images/" + file.filename
    file.save(file_path)

    df=pd.read_csv(file_path)
    df = df.dropna()
    df['dates'] = df['date']
    #
    df['date'] =pd.to_datetime(df['date'])
    #
    df=df.set_index('date')
    train, test = train_test_split(df, test_size=0.2)

    def create_feature(df):
        df['week']=df.index.isocalendar().week
        df['week']=df['week'].astype('int64')
        #df['hour']=df.index.hour
        #df['dayofweek']=df.index.dayofweek
        df['month']=df.index.month
        df['year']=df.index.year
        df['days'] = df.index.dayofyear
        #
        return df
    df=create_feature(df)

    train = create_feature(train)
    test = create_feature(test)

    Features=[]
    Features.append(choose)
    target='sales'

    X_train = train[Features]
    y_train =train[target]


    X_test = test[Features]
    y_test =test[target]
    reg = xgb.XGBRegressor()
    reg.fit(X_train, y_train, eval_set=[(X_train, y_train),(X_test, y_test)])

    if choose == "days":
        last_day = df['dates'].max()
        new_data = pd.DataFrame({'date': pd.date_range(last_day, periods=name, freq='D')[1:]})
        new_data['week'] = new_data['date'].dt.dayofweek
        new_data['month'] = new_data['date'].dt.month
        new_data['year'] = new_data['date'].dt.year
        new_data['days'] = new_data['date'].dt.dayofyear

    if(choose == "month"):
        last_month = df['month'].max()
        new_data = pd.DataFrame({'month': pd.date_range(last_month, periods=name+1, freq='MS')[1:]})
        new_data['month'] = new_data['month'].apply(lambda x: x.month)
    df['dates'] = pd.to_datetime(df['dates'])    

    if(choose=="week"):
        last_week = df['dates'].max().isocalendar()[1]
        week_numbers = [(last_week + i - 1) % 52 + 1 for i in range(1, name + 1)]
        new_data = pd.DataFrame({'week': week_numbers, 'year': df.index.max().year})
    if choose == "year":
        last_year = df['year'].max()
        future_years = pd.date_range(start=f"{last_year}-01-01", freq='YS', periods=name+1)[1:]
        new_data = pd.DataFrame({'year': future_years.year})

    ##
    common_cols=set(new_data.columns).intersection(set(df.columns))
    if common_cols:
        df = pd.concat([df, new_data[list(common_cols)]], axis=0)
    ##
    new_data[choose] = new_data[choose].astype(int)
    new_data['sales'] = reg.predict(new_data[Features])
    
    old_data = pd.DataFrame({choose: df[choose], 'sales': df['sales']})
    print(new_data)
    print(df)
    
    
    prediction_dict = {'labels': list(new_data[choose]),'sales': list(new_data['sales'])}
    prediction_json = json.dumps(prediction_dict)

    
    data = json.loads(prediction_json)
    df = pd.DataFrame(data)
    file_path = './images/predictions.csv'
    df.to_csv(file_path, index=False)


    print(prediction_json)
    return prediction_json

@app.route('/predict', methods=['GET'])
def get_prediction():
    
    return prediction_json



if __name__ == '__main__':
    app.run(port = 3000, debug=True)
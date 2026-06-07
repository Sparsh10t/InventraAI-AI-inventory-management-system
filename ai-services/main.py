from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class ForecastRequest(BaseModel):
    sales: list


@app.get("/")
def home():
    return {
        "message": "AI Forecast Service Running"
    }


@app.post("/forecast")
def forecast(data: ForecastRequest):

    sales_data = data.sales

    if len(sales_data) == 0:
        return {
            "prediction": 0
        }

    average_sales = sum(sales_data) / len(sales_data)

    predicted_demand = round(
        average_sales * 1.2
    )

    return {
        "prediction": predicted_demand
    }
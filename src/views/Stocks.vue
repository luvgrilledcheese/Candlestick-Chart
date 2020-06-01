<template>
    <div class="container">
        <form class="form-inline">
            <div class="form-group mb-4">
                <label for="Title">Symbol: </label>
                <input id="Symbol" class="form-control"
                       placeholder="Ex: IBM" type="text"
                       style="min-width:240px;"
                       v-model="symbol"/>
                <button type="button" class="btn btn-secondary" v-on:click="GetTimeSeriesIntraDay">Enter</button>
            </div>
            
        </form>
        <div>Information : {{information}}</div>
        <div>Symbol: {{searchedSymbol}}</div>
        <div>Last Refreshed: {{lastRefreshed}}</div>
        <div>Interval: {{interval}}</div>
        <div>Time Zone: {{timeZone}}</div>

        <div style="padding-top: 20px;"></div>

        <div class="row">
            <div v-for="(t, index) in TimeSeries" v-bind:key="t[0]">
                <div class="card round ed">
                    <div class="card-body text-center" style="max-heigth:210px;">
                        <div>Date: {{index}}</div>
                        <div>Open: {{t["1. open"]}}</div>
                        <div>High: {{t["2. high"]}}</div>
                        <div>Low: {{t["3. low"]}}</div>
                        <div>Close: {{t["4. close"]}}</div>
                        <div>Volume:{{t["5. volume"]}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "Stocks",
    data: function() {
        return {
            searchedSymbol: null,
            information: null,
            lastRefreshed: null,
            interval: null,
            timeZone: null,
            TimeSeries: null,
            ha: 0
        }
    },
    methods: {
        GetTimeSeriesIntraDay: function() {
            fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.symbol}&interval=5min&apikey=HVA4CYIWOP15UBY`)
                .then((response) => {
                    if (!response.ok) {
                        console.log("Response isnt ok");
                        console.log(response);
                    }
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    this.information = data["Meta Data"]["1. Information"];
                    this.searchedSymbol = data["Meta Data"]["2. Symbol"];
                    this.lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
                    this.interval = data["Meta Data"]["4. Interval"];
                    this.timeZone = data["Meta Data"]["6. Time Zone"];
                    this.TimeSeries = data["Time Series (5min)"];
                });
        },
    },
    
}
</script>

<style scoped>
    a {
        text-decoration: none !important;
        color: black;
    }

    .form-inline .form-group {
        margin-right: 20px;
    }

    .form-inline .form-group label {
        margin-right: 10px;
    }
</style>
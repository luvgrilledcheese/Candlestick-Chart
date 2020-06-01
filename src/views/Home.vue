<template>
    <div class="container">
        <h1>HOME</h1>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            bruh: null,
            searchedSymbol: null,
            information: null,
            lastRefreshed: null,
            interval: null,
            timeZone: null,
            TimeSeries: null,
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
                    this.bruh = data;
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
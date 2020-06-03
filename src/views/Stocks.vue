<template>
  <div class="container">
    <form class="form-inline">
      <div class="form-group mb-4">
        <label for="Title">Symbol:</label>
        <input
          id="Symbol"
          class="form-control"
          placeholder="Ex: IBM"
          type="text"
          style="min-width:240px;"
          v-model="symbol"
        />
        <button type="button" class="btn btn-secondary" v-on:click="GetTimeSeriesIntraDay">Enter</button>
      </div>
    </form>
    <div>Information : {{information}}</div>
    <div>Symbol: {{searchedSymbol}}</div>
    <div>Last Refreshed: {{lastRefreshed}}</div>
    <div>Interval: {{interval}}</div>
    <div>Time Zone: {{timeZone}}</div>

    <div style="padding-top: 20px;"></div>
    <div id="chart">
      <apexchart type="candlestick" height="350" :options="chartOptions" :series="series" :key="componentKey"></apexchart>
    </div>
    <div style="padding-top: 20px;"></div>
    
  </div>
</template>

<script>
export default {
  name: "Stocks",
  data: function() {
    return {
      componentKey: 0,
      symbol: null,
      searchedSymbol: null,
      information: null,
      lastRefreshed: null,
      interval: null,
      timeZone: null,
      TimeSeries: null,
      series: [
        {
          data: []
        }
      ],
      chartOptions: {
        chart: {
          type: "candlestick",
          height: 350
        },
        title: {
          text: "CandleStick Chart",
          align: "left"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    };
  },    
  methods: {
    GetTimeSeriesIntraDay: function() {
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.symbol}&interval=5min&apikey=HVA4CYIWOP15UBY`
      )
        .then(response => {
          if (!response.ok) {
            console.log("Response isnt ok");
            console.log(response);
          }
          return response.json();
        })
        .then(data => {
          
          //Get basic informations
          this.information = data["Meta Data"]["1. Information"];
          this.searchedSymbol = data["Meta Data"]["2. Symbol"];
          this.lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
          this.interval = data["Meta Data"]["4. Interval"];
          this.timeZone = data["Meta Data"]["6. Time Zone"];
          this.TimeSeries = data["Time Series (5min)"];
          
          //Makes sure the candlestick chart reset
          this.series[0].data = [];
          
          // For every series in timeseries, do this:
          Object.keys(this.TimeSeries).forEach(key => {
            var date = new Date(key)
            var dateMilli = date.getTime() - 10800000 + 30000;
            var serie = [dateMilli, parseFloat(this.TimeSeries[key]["1. open"]), parseFloat(this.TimeSeries[key]["2. high"]), parseFloat(this.TimeSeries[key]["3. low"]), parseFloat(this.TimeSeries[key]["4. close"])];
            this.series[0].data.push(serie);
          });

          // Re-renderning the candlestick chart
          this.componentKey += 1;
        });
    }
  }
};
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
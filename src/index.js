import Chart from "chart.js"; 

const DATAS = require('../data/wine.json');

const wine = DATAS.wine.map(d => ({
    country: d.country,
    price: d.price,
    points: d.points
})).filter(item => item.price);

const IS_CHEAP = p => p.price <= 30;
const IS_MED = p => p.price > 30 && p.price <=80;
const IS_HIGH = p => p.price > 80;
const ALL = p => p.price > 0;


const SUM = (wines) => wines.map(d => d.points).reduce((res, p) => res + p, 0);
const MOY = (wines) => SUM(wines)/wines.length;
const PRICE_SUM = (wines) => wines.map(d => d.price).reduce((res, p) => res + p, 0);
const PRICE_MOY = (wines) => PRICE_SUM(wines)/wines.length;

const SELECT_COUNTRY_FILTRE = (country, filtre) => 
    wine.filter(d => d.country === country).filter(filtre);


const ARG_CHEAP = Math.round(MOY(SELECT_COUNTRY_FILTRE("Argentina", IS_CHEAP)));
const ARG_MED = Math.round(MOY(SELECT_COUNTRY_FILTRE("Argentina", IS_MED)));
const ARG_HIGH = Math.round(MOY(SELECT_COUNTRY_FILTRE("Argentina", IS_HIGH)));
const ARG_PRICE = Math.round(PRICE_MOY(SELECT_COUNTRY_FILTRE("Argentina", ALL)));

const USA_CHEAP = Math.round(MOY(SELECT_COUNTRY_FILTRE("US", IS_CHEAP)));
const USA_MED = Math.round(MOY(SELECT_COUNTRY_FILTRE("US", IS_MED)));
const USA_HIGH = Math.round(MOY(SELECT_COUNTRY_FILTRE("US", IS_HIGH)));
const USA_PRICE = Math.round(PRICE_MOY(SELECT_COUNTRY_FILTRE("US", ALL)));

const SA_CHEAP = Math.round(MOY(SELECT_COUNTRY_FILTRE("South Africa", IS_CHEAP)));
const SA_MED = Math.round(MOY(SELECT_COUNTRY_FILTRE("South Africa", IS_MED)));
const SA_HIGH = Math.round(MOY(SELECT_COUNTRY_FILTRE("South Africa", IS_HIGH)));
const SA_PRICE = Math.round(PRICE_MOY(SELECT_COUNTRY_FILTRE("South Africa", ALL)));

const CH_CHEAP = Math.round(MOY(SELECT_COUNTRY_FILTRE("Chile", IS_CHEAP)));
const CH_MED = Math.round(MOY(SELECT_COUNTRY_FILTRE("Chile", IS_MED)));
const CH_HIGH = Math.round(MOY(SELECT_COUNTRY_FILTRE("Chile", IS_HIGH)));
const CH_PRICE = Math.round(PRICE_MOY(SELECT_COUNTRY_FILTRE("Chile", ALL)));


var ctx = document.getElementById('myChart').getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight/2;
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Agentina', 'USA', 'South Africa', 'Chile'],
        datasets: [
        {
            type: 'bubble',
            label: 'Price average ($)',
            stack: 'Stack 0',
            borderColor: 'rgba(214, 214, 214, 0.8)',
            backgroundColor: 'rgba(214, 214, 214, 0.6)', 
            hoverBackgroundColor: 'rgba((214, 214, 214)',
            borderWidth: 2,
            fill: false,
            radius: 10,
            data: [ARG_PRICE, USA_PRICE, SA_PRICE, CH_PRICE] 
        },
        {
            label: '0-30$',
            backgroundColor: 'rgba(148, 0, 42, 0.6)', 
            hoverBackgroundColor: 'rgba(148, 0, 42, 0.8)',
            stack: 'Stack 0',
            data: [ARG_CHEAP, USA_CHEAP, SA_CHEAP, CH_CHEAP],
            borderColor: 'rgba(148, 0, 42, 1)',
            borderWidth: 1
            
        },
        {
            label: '31-80$',
            backgroundColor: 'rgba(84, 0, 24, 0.8)',
            hoverBackgroundColor: 'rgba(84, 0, 24, 1)',
            stack: 'Stack 1',
            data: [ARG_MED, USA_MED, SA_MED, CH_MED],
            borderColor: 'rgba(84, 0, 24, 1)',
            borderWidth: 1
        }, 
        {
            label: '> 80$',
            backgroundColor: 'rgba(51, 0, 15, 0.8)',
            hoverBackgroundColor: 'rgba(255, 206, 86, 1)',
            stack: 'Stack 2',
            data: [ARG_HIGH, USA_HIGH, SA_HIGH, CH_HIGH],
            borderColor: 'rgba(51, 0, 15, 1)',
            borderWidth: 1
        },

      ]  
    },
    options: {
        legend : {
            display: true,
            position: 'bottom',
        },
        scales: {
          xAxes: [{
            stacked: true
        }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Ratings'
                  },
                stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        },
    }
});

